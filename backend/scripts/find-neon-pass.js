import pg from 'pg';

const combinations = [
    "npg_ucO5FntwEiJ0", // Original (.env)
    "npg_uc05FntwEiJ0", // uc0 + J0
    "npg_ucO5FntwEiJ8", // ucO + J8
    "npg_uc05FntwEiJ8"  // uc0 + J8 (Sugestão do print)
];

const baseUrl = "postgresql://neondb_owner:PASSWORD@ep-empty-math-ahkbfxnq.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function findCorrectPassword() {
    for (const pass of combinations) {
        const url = baseUrl.replace("PASSWORD", pass);
        console.log(`\n🧪 Testando password: ${pass}`);
        const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
        try {
            const client = await pool.connect();
            const res = await client.query('SELECT COUNT(*) as total FROM operadores');
            console.log(`✅ SUCESSO! Total de usuários: ${res.rows[0].total}`);
            client.release();
            await pool.end();
            console.log(`\n🏆 A SENHA CORRETA É: ${pass}`);
            return;
        } catch (e) {
            console.log(`❌ FALHOU: ${e.message}`);
        }
        await pool.end();
    }
}

findCorrectPassword();
