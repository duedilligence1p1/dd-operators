import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function debugLogin() {
    console.log('🔍 Debug de Login no Neon\n');

    try {
        const client = await pool.connect();
        console.log('✅ Conectado ao Neon\n');

        const email = 'duediligence1p1@yahoo.com';
        const password = 'DD1p1!@#';

        // Buscar usuário
        const result = await client.query(
            'SELECT id, email, password_hash, is_admin, status FROM operadores WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            console.log('❌ Usuário não encontrado!');
        } else {
            const user = result.rows[0];
            console.log('👤 Usuário encontrado:');
            console.log('   ID:', user.id);
            console.log('   Email:', user.email);
            console.log('   Admin:', user.is_admin);
            console.log('   Status:', user.status);
            console.log('   Password Hash (primeiros 20 chars):', user.password_hash.substring(0, 20) + '...');

            // Testar senha
            const validPassword = await bcrypt.compare(password, user.password_hash);
            console.log('\n🔑 Teste de senha:');
            console.log('   Senha testada:', password);
            console.log('   Resultado:', validPassword ? '✅ VÁLIDA' : '❌ INVÁLIDA');

            if (!validPassword) {
                console.log('\n⚠️  A senha não bate! Vou gerar novo hash...');
                const newHash = await bcrypt.hash(password, 10);
                console.log('   Novo hash (primeiros 20 chars):', newHash.substring(0, 20) + '...');

                await client.query(
                    'UPDATE operadores SET password_hash = $1 WHERE id = $2',
                    [newHash, user.id]
                );
                console.log('   ✅ Password hash atualizado!');

                // Verificar novamente
                const verify = await bcrypt.compare(password, newHash);
                console.log('   ✅ Verificação:', verify ? 'SUCESSO' : 'FALHOU');
            }
        }

        client.release();
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Erro:', error);
        process.exit(1);
    }
}

debugLogin();
