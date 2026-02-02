import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function resetAdminPassword() {
    console.log('🔧 Resetando senha do administrador...\n');

    try {
        const client = await pool.connect();
        console.log('✅ Conectado ao Neon\n');

        const email = 'duediligence1p1@yahoo.com';
        const newPassword = 'DD1p1!@#';

        // Buscar administrador
        const user = await client.query(
            'SELECT id, email, is_admin FROM operadores WHERE email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            console.log('❌ Administrador não encontrado!');
            console.log('\n📋 Listando todos os usuários:');
            const all = await client.query('SELECT email, is_admin FROM operadores');
            all.rows.forEach(u => console.log(`  - ${u.email} (Admin: ${u.is_admin})`));
        } else {
            console.log('👤 Administrador encontrado:', user.rows[0].email);
            console.log('   ID:', user.rows[0].id);
            console.log('   Admin:', user.rows[0].is_admin);

            // Hash da nova senha
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Atualizar senha
            await client.query(
                'UPDATE operadores SET password_hash = $1 WHERE id = $2',
                [hashedPassword, user.rows[0].id]
            );

            console.log('\n✅ Senha atualizada com sucesso!');
            console.log('   Email:', email);
            console.log('   Senha:', newPassword);
        }

        client.release();
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Erro:', error.message);
        process.exit(1);
    }
}

resetAdminPassword();
