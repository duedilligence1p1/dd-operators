import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function initNeonDB() {
    console.log('🔄 Conectando ao banco Neon...\n');

    try {
        const client = await pool.connect();
        console.log('✅ Conectado com sucesso!\n');

        // Verificar se administrador já existe
        const checkAdmin = await client.query(
            'SELECT id, email FROM operadores WHERE email = $1',
            ['duediligence1p1@yahoo.com']
        );

        if (checkAdmin.rows.length > 0) {
            console.log('ℹ️  Administrador já existe:', checkAdmin.rows[0].email);
            console.log('   ID:', checkAdmin.rows[0].id);
        } else {
            console.log('📝 Criando usuário administrador...');

            const hashedPassword = await bcrypt.hash('DD1p1!@#', 10);
            const result = await client.query(`
                INSERT INTO operadores (email, password_hash, nome_empresa, is_admin, status)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, email, nome_empresa, is_admin
            `, ['duediligence1p1@yahoo.com', hashedPassword, 'Administração Due Diligence', true, 'ativo']);

            const admin = result.rows[0];
            console.log('✅ Administrador criado:');
            console.log('   ID:', admin.id);
            console.log('   Email:', admin.email);
            console.log('   Empresa:', admin.nome_empresa);
            console.log('   Admin:', admin.is_admin);

            // Criar registro de respostas vazio
            await client.query(
                'INSERT INTO respostas_due_diligence (operador_id) VALUES ($1)',
                [admin.id]
            );
            console.log('✅ Registro de respostas criado');
        }

        // Listar todos os operadores
        const allOperators = await client.query('SELECT id, email, is_admin, status FROM operadores ORDER BY created_at');
        console.log(`\n👥 Total de operadores: ${allOperators.rows.length}`);
        allOperators.rows.forEach(op => {
            console.log(`   - ${op.email} (Admin: ${op.is_admin}, Status: ${op.status})`);
        });

        client.release();
        await pool.end();

        console.log('\n✅ Inicialização concluída!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Erro:', error.message);
        process.exit(1);
    }
}

initNeonDB();
