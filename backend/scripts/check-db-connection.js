import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { Pool } = pg;

async function checkConnection() {
    console.log('🔍 Testando conexão com o banco de dados...\n');
    console.log('📋 Configurações:');
    console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '✓ Definido' : '✗ Não definido'}`);

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 10000
    });

    try {
        const client = await pool.connect();
        console.log('\n✅ Conexão estabelecida com sucesso!\n');

        // Testar query simples
        const result = await client.query('SELECT NOW()');
        console.log('⏰ Hora do servidor:', result.rows[0].now);

        // Verificar usuários existentes
        const users = await client.query('SELECT email, is_admin, status FROM operadores');
        console.log(`\n👥 Usuários no banco: ${users.rows.length}`);
        users.rows.forEach(user => {
            console.log(`   - ${user.email} (Admin: ${user.is_admin}, Status: ${user.status})`);
        });

        client.release();
        await pool.end();

    } catch (error) {
        console.error('\n❌ Erro ao conectar:', error.message);
        console.error('\n🔧 Possíveis causas:');
        console.error('   1. Banco de dados Neon está pausado/inativo');
        console.error('   2. DATABASE_URL incorreto no arquivo .env');
        console.error('   3. Problemas de firewall/rede');
        console.error('   4. Credenciais do banco expiradas');
        console.error('\n💡 Sugestões:');
        console.error('   - Acesse https://console.neon.tech e verifique o status do banco');
        console.error('   - Verifique se a DATABASE_URL no .env está correta');
        await pool.end();
        process.exit(1);
    }
}

checkConnection();
