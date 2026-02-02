import pg from 'pg';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USE_SQLITE = process.env.DB_TYPE === 'sqlite' || !process.env.DATABASE_URL;

let pool = null;
let sqlite = null;

if (USE_SQLITE) {
    console.log('📦 Usando banco de dados LOCAL (SQLite)');
    const dbPath = path.join(__dirname, '..', 'database.db');
    sqlite = new Database(dbPath);

    // Configurar para emitir eventos similares ao pg
    sqlite.pragma('foreign_keys = ON');
} else {
    console.log('🌐 Usando banco de dados REMOTO (PostgreSQL)');
    const { Pool } = pg;
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 60000,
        max: 20
    });
    pool.on('error', (err) => {
        console.error('Erro PostgreSQL:', err);
        process.exit(-1);
    });
}

/**
 * Helper para converter query parameters de $1, $2 para ?
 * e lidar com JSON/UUID no SQLite
 */
function processQuery(text, params = []) {
    if (!USE_SQLITE) return { text, params };

    // Converter $1, $2... para ?
    const sqliteText = text.replace(/\$\d+/g, '?');

    // Converter UUIDs, JSONs e Booleanos (no SQLite tudo é texto ou número)
    const sqliteParams = params.map(p => {
        if (p === true) return 1;
        if (p === false) return 0;
        if (p !== null && typeof p === 'object') return JSON.stringify(p);
        return p;
    });

    return { text: sqliteText, params: sqliteParams };
}

export const query = async (text, params = []) => {
    if (USE_SQLITE) {
        const { text: sql, params: p } = processQuery(text, params);
        try {
            const stmt = sqlite.prepare(sql);
            if (sql.trim().toUpperCase().startsWith('SELECT')) {
                const rows = stmt.all(...p);
                return { rows };
            } else {
                const result = stmt.run(...p);
                return { rows: [], rowCount: result.changes, lastInsertRowid: result.lastInsertRowid };
            }
        } catch (error) {
            console.error('SQLite Error:', error, 'SQL:', sql);
            throw error;
        }
    }
    return pool.query(text, params);
};

export const getClient = async () => {
    if (USE_SQLITE) {
        // Mock de cliente para transações em SQLite
        return {
            query: (text, params) => query(text, params),
            release: () => { }
        };
    }
    return pool.connect();
};

export default USE_SQLITE ? sqlite : pool;
