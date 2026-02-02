import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';
import crypto from 'crypto';

async function resetAdminPassword() {
    try {
        console.log('🔐 Resetando senha do admin (Ambiente: local SQLite)...\n');

        const adminEmail = process.env.ADMIN_EMAIL || 'duediligence1p1@yahoo.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'DD1p1!@#';

        // Verificar se o admin existe
        const result = await query('SELECT id, email, is_admin FROM operadores WHERE email = $1', [adminEmail]);

        if (result.rows.length === 0) {
            console.log(`❌ Usuário ${adminEmail} não encontrado no banco de dados.`);
            console.log('📝 Criando novo usuário admin...\n');

            const passwordHash = await bcrypt.hash(adminPassword, 10);
            const id = crypto.randomUUID();

            await query(
                `INSERT INTO operadores (id, email, password_hash, nome_empresa, status, is_admin) VALUES ($1, $2, $3, $4, $5, $6)`,
                [id, adminEmail, passwordHash, 'Administração Due Diligence', 'ativo', true]
            );

            // Criar registro de respostas vazio para o admin
            const resId = crypto.randomUUID();
            await query(
                `INSERT INTO respostas_due_diligence (id, operador_id) VALUES ($1, $2)`,
                [resId, id]
            );

            console.log('✅ Usuário admin criado com sucesso!');
        } else {
            console.log(`✅ Usuário encontrado: ${result.rows[0].email}`);
            console.log(`   Admin: ${result.rows[0].is_admin}`);
            console.log('\n🔄 Atualizando senha...\n');

            const passwordHash = await bcrypt.hash(adminPassword, 10);
            await query(
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
        console.error('❌ Erro:', error.message);
    } finally {
        // O connection pool/sqlite se fecha ao encerrar o processo
        process.exit(0);
    }
}

resetAdminPassword();
