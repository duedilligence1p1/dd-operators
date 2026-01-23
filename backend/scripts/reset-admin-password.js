import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { Pool } = pg;
const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000
});

async function resetAdminPassword() {
    const client = await pool.connect();
    try {
        console.log('🔐 Resetando senha do admin...\n');
        
        const adminEmail = process.env.ADMIN_EMAIL || 'duediligence1p1@yahoo.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'DD1p1!@#';
        
        // Verificar se o admin existe
        const result = await client.query('SELECT id, email, is_admin FROM operadores WHERE email = $1', [adminEmail]);
        
        if (result.rows.length === 0) {
            console.log(`❌ Usuário ${adminEmail} não encontrado no banco de dados.`);
            console.log('📝 Criando novo usuário admin...\n');
            
            const passwordHash = await bcrypt.hash(adminPassword, 10);
            await client.query(
                `INSERT INTO operadores (email, password_hash, nome_empresa, status, is_admin) VALUES ($1, $2, $3, $4, $5)`,
                [adminEmail, passwordHash, 'Administração Due Diligence', 'ativo', true]
            );
            console.log('✅ Usuário admin criado com sucesso!');
        } else {
            console.log(`✅ Usuário encontrado: ${result.rows[0].email}`);
            console.log(`   Admin: ${result.rows[0].is_admin}`);
            console.log('\n🔄 Atualizando senha...\n');
            
            const passwordHash = await bcrypt.hash(adminPassword, 10);
            await client.query(
                'UPDATE operadores SET password_hash = $1, is_admin = true, status = $2 WHERE email = $3',
                [passwordHash, 'ativo', adminEmail]
            );
            console.log('✅ Senha atualizada com sucesso!');
        }
        
        console.log('\n📋 Credenciais para login:');
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Senha: ${adminPassword}`);
        console.log('\n✅ Processo concluído!');
        
    } catch (error) {
        console.error('❌ Erro ao resetar senha do admin:', error.message);
        if (error.code === 'ETIMEDOUT') {
            console.error('\n⚠️  PROBLEMA DE CONEXÃO:');
            console.error('   - Verifique se o banco de dados Neon está ativo');
            console.error('   - Verifique sua conexão com a internet');
            console.error('   - Verifique se o DATABASE_URL está correto no arquivo .env');
        }
    } finally {
        client.release();
        await pool.end();
    }
}

resetAdminPassword();
