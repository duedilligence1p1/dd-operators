import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.js';
import respostasRoutes from './routes/respostas.js';
import uploadRoutes from './routes/upload.js';
import adminRoutes from './routes/admin.js';
import emergencyRoutes from './routes/emergency.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Permitir se não houver origem (ex: ferramentas de teste) ou se estiver na lista permitida
        if (!origin || allowedOrigins.some(allowed => origin.startsWith(allowed.replace(/\/$/, '')))) {
            callback(null, true);
        } else if (origin.includes('vercel.app')) {
            // Permitir qualquer subdomínio da Vercel para facilitar o deploy do usuário
            callback(null, true);
        } else {
            console.log('⚠️ [CORS] Origem desconhecida permitida para compatibilidade:', origin);
            callback(null, true); // Permitir por enquanto para resolver o bloqueio do usuário
        }
    },
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/respostas', respostasRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/emergency', emergencyRoutes);

app.get('/api/test-bcrypt', async (req, res) => {
    try {
        const testPass = 'admin123';
        const hash = await bcrypt.hash(testPass, 10);
        const match = await bcrypt.compare(testPass, hash);
        res.json({ status: 'ok', match, hash_preview: hash.substring(0, 10) });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/api/health', async (req, res) => {
    try {
        const dbUrl = process.env.DATABASE_URL || '';
        const dbUrlCheck = dbUrl ? `${dbUrl.substring(0, 15)}...${dbUrl.substring(dbUrl.length - 15)}` : 'not set';
        const isPostgres = !!process.env.DATABASE_URL && process.env.DB_TYPE !== 'sqlite';

        let operatorsList = [];
        let opCount = -1;
        try {
            const { query } = await import('./config/database.js');
            const result = await query('SELECT email, is_admin FROM operadores ORDER BY created_at LIMIT 10');
            opCount = result.rows.length;
            operatorsList = result.rows.map(op => ({
                email: op.email.substring(0, 3) + '***' + op.email.substring(op.email.indexOf('@')),
                admin: op.is_admin
            }));
        } catch (e) {
            console.error('Erro ao listar:', e.message);
        }

        res.json({
            status: 'ok',
            version: 'v1.0.2-' + new Date().toISOString(),
            database: isPostgres ? 'postgresql' : 'sqlite',
            operators_count: opCount,
            operators: operatorsList,
            db_url_check: dbUrlCheck,
            frontend_url: process.env.FRONTEND_URL || 'not set',
            env: process.env.NODE_ENV || 'production'
        });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Due Diligence API rodando em http://localhost:${PORT}`);
});
