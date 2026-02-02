import { query } from '../config/database.js';
import dotenv from 'dotenv';
dotenv.config();

async function verifyAdmin() {
    console.log('🔍 Verificando administrador...\n');

    try {
        const email = 'duediligence1p1@yahoo.com';
        const result = await query('SELECT id, email, nome_empresa, status, is_admin FROM operadores WHERE email = $1', [email.toLowerCase()]);

        if (result.rows.length === 0) {
            console.log('❌ Administrador NÃO encontrado!');
            console.log('\n📋 Listando todos os usuários:');
            const all = await query('SELECT email, is_admin, status FROM operadores');
            all.rows.forEach(u => {
                console.log(`  - ${u.email} (Admin: ${u.is_admin}, Status: ${u.status})`);
            });
        } else {
            const user = result.rows[0];
            console.log('✅ Administrador encontrado!');
            console.log('\n📊 Detalhes:');
            console.log(`  ID: ${user.id}`);
            console.log(`  Email: ${user.email}`);
            console.log(`  Empresa: ${user.nome_empresa || 'N/A'}`);
            console.log(`  Status: ${user.status}`);
            console.log(`  Admin: ${user.is_admin}`);
        }
    } catch (error) {
        console.error('❌ Erro:', error);
    }

    process.exit(0);
}

verifyAdmin();
