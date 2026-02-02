import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const urls = [
    "postgresql://neondb_owner:npg_ucO5FntwEiJ0@ep-empty-math-ahkbfxnq.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require", // Com O
    "postgresql://neondb_owner:npg_uc05FntwEiJ0@ep-empty-math-ahkbfxnq.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"  // Com 0
];

async function testConnections() {
    for (const url of urls) {
        console.log(`\n🧪 Testando: ${url.substring(0, 30)}...`);
        const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
        try {
            const client = await pool.connect();
            const res = await client.query('SELECT COUNT(*) as total FROM operadores');
            console.log(`✅ SUCESSO! Total de usuários: ${res.rows[0].total}`);
            client.release();
        } catch (e) {
            console.log(`❌ FALHOU: ${e.message}`);
        }
        await pool.end();
    }
}

testConnections();
