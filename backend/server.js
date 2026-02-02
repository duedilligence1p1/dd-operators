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
    origin: allowedOrigins, // Simplificado para usar a lista de origens permitidas diretamente
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/respostas', respostasRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/emergency', emergencyRoutes);

app.get('/api/health', (req, res) => {
    const dbUrl = process.env.DATABASE_URL || '';
    const dbUrlCheck = dbUrl ? `${dbUrl.substring(0, 15)}...${dbUrl.substring(dbUrl.length - 15)}` : 'not set';
    const isPostgres = !!process.env.DATABASE_URL && process.env.DB_TYPE !== 'sqlite';

    res.json({
        status: 'ok',
        database: isPostgres ? 'postgresql' : 'sqlite',
        db_url_check: dbUrlCheck,
        frontend_url: process.env.FRONTEND_URL || 'not set',
        env: process.env.NODE_ENV || 'development'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Due Diligence API rodando em http://localhost:${PORT}`);
});
