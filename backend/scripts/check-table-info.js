import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'database.db');
const db = new Database(dbPath);

console.log('📋 Estrutura da tabela respostas_due_diligence:\n');

const info = db.prepare('PRAGMA table_info(respostas_due_diligence)').all();
info.forEach(c => {
    console.log(`- ${c.name}:`);
    console.log(`  Type: ${c.type}`);
    console.log(`  NOT NULL: ${c.notnull === 1 ? 'YES' : 'NO'}`);
    console.log(`  Default: ${c.dflt_value || 'NONE'}`);
    console.log('');
});

db.close();
