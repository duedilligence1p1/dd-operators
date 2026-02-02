import express from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';

const router = express.Router();

// ⚠️ ENDPOINT DE EMERGÊNCIA - Usar apenas para recuperação de conta admin
// TODO: Remover ou proteger este endpoint em produção
router.post('/reset-admin', async (req, res) => {
    try {
        const { newPassword } = req.body;
        const adminEmail = process.env.ADMIN_EMAIL || 'duediligence1p1@yahoo.com';
        const adminPassword = newPassword || process.env.ADMIN_PASSWORD || 'DD1p1!@#';

        console.log('🔐 [EMERGENCY] Resetando admin:', adminEmail, newPassword ? '(senha customizada)' : '(senha padrão)');

        // Verificar se o admin existe
        const result = await query('SELECT id, email, is_admin FROM operadores WHERE email = $1', [adminEmail]);

        const passwordHash = await bcrypt.hash(adminPassword, 10);

        if (result.rows.length === 0) {
            console.log('❌ Admin não encontrado. Criando novo...');
            const insertResult = await query(
                `INSERT INTO operadores (email, password_hash, nome_empresa, status, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                [adminEmail, passwordHash, 'Administração Due Diligence', 'ativo', true]
            );
            await query('INSERT INTO respostas_due_diligence (operador_id) VALUES ($1)', [insertResult.rows[0].id]);

            return res.json({ success: true, message: 'Admin criado', email: adminEmail });
        } else {
            console.log('✅ Admin encontrado. Atualizando senha...');
            await query(
                'UPDATE operadores SET password_hash = $1, is_admin = true, status = $2 WHERE email = $3',
                [passwordHash, 'ativo', adminEmail]
            );
            return res.json({ success: true, message: 'Senha atualizada', email: adminEmail });
        }
    } catch (error) {
        console.error('❌ Erro:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/check-admin', async (req, res) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'duediligence1p1@yahoo.com';
        const result = await query('SELECT email, is_admin, status FROM operadores WHERE email = $1', [adminEmail]);
        res.json({ exists: result.rows.length > 0, admin: result.rows[0] || null });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
