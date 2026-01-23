import express from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';

const router = express.Router();

// ⚠️ ENDPOINT DE EMERGÊNCIA - Usar apenas para recuperação de conta admin
// TODO: Remover ou proteger este endpoint em produção
router.post('/reset-admin', async (req, res) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'duediligence1p1@yahoo.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'DD1p1!@#';

        console.log('🔐 Tentando resetar senha do admin:', adminEmail);

        // Verificar se o admin existe
        const result = await query('SELECT id, email, is_admin FROM operadores WHERE email = $1', [adminEmail]);

        if (result.rows.length === 0) {
            console.log('❌ Admin não encontrado. Criando novo usuário admin...');

            const passwordHash = await bcrypt.hash(adminPassword, 10);
            await query(
                `INSERT INTO operadores (email, password_hash, nome_empresa, status, is_admin) VALUES ($1, $2, $3, $4, $5)`,
                [adminEmail, passwordHash, 'Administração Due Diligence', 'ativo', true]
            );

            // Criar registro de respostas para o novo admin
            const newAdmin = await query('SELECT id FROM operadores WHERE email = $1', [adminEmail]);
            await query('INSERT INTO respostas_due_diligence (operador_id) VALUES ($1)', [newAdmin.rows[0].id]);

            console.log('✅ Admin criado com sucesso!');
            return res.json({
                success: true,
                message: 'Usuário admin criado com sucesso',
                email: adminEmail
            });
        } else {
            console.log('✅ Admin encontrado. Atualizando senha...');

            const passwordHash = await bcrypt.hash(adminPassword, 10);
            await query(
                'UPDATE operadores SET password_hash = $1, is_admin = true, status = $2 WHERE email = $3',
                [passwordHash, 'ativo', adminEmail]
            );

            console.log('✅ Senha atualizada com sucesso!');
            return res.json({
                success: true,
                message: 'Senha do admin atualizada com sucesso',
                email: adminEmail
            });
        }

    } catch (error) {
        console.error('❌ Erro ao resetar admin:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao resetar senha do admin',
            details: error.message
        });
    }
});

// Endpoint de diagnóstico
router.get('/check-admin', async (req, res) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'duediligence1p1@yahoo.com';
        const result = await query('SELECT id, email, is_admin, status FROM operadores WHERE email = $1', [adminEmail]);

        if (result.rows.length === 0) {
            return res.json({
                exists: false,
                email: adminEmail,
                message: 'Usuário admin não encontrado no banco de dados'
            });
        }

        const admin = result.rows[0];
        return res.json({
            exists: true,
            email: admin.email,
            is_admin: admin.is_admin,
            status: admin.status,
            message: 'Usuário admin encontrado'
        });

    } catch (error) {
        console.error('❌ Erro ao verificar admin:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao verificar admin',
            details: error.message
        });
    }
});

export default router;
