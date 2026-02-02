import { query } from '../config/database.js';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

async function fixMissingRespostas() {
    console.log('🔧 Corrigindo Respostas Faltantes...\n');

    try {
        // Buscar operadores sem respostas
        const orphans = await query(`
            SELECT o.id, o.email  
            FROM operadores o
            LEFT JOIN respostas_due_diligence r ON o.id = r.operador_id
            WHERE r.id IS NULL
        `);

        console.log(`📊 Operadores sem respostas: ${orphans.rows.length}`);

        for (const operador of orphans.rows) {
            const respostaId = randomUUID();
            await query(`
                INSERT INTO respostas_due_diligence (
                    id, operador_id, 
                    secao_1_governanca, secao_2_seguranca, secao_3_ciclo_vida, secao_4_incidentes, secao_5_apostas,
                    secao_6_desenvolvimento, secao_7_rh, secao_8_monitoramento, secao_9_integridade, secao_10_terminacao,
                    arquivos_urls, status_submissao
                ) VALUES (
                    $1, $2,
                    '{}', '{}', '{}', '{}', '{}',
                    '{}', '{}', '{}', '{}', '{}',
                    '[]', 'rascunho'
                )
            `, [respostaId, operador.id]);
            console.log(`✅ Criada resposta para: ${operador.email}`);
        }

        console.log('\n✅ Correção concluída!');
    } catch (error) {
        console.error('❌ Erro:', error);
    }

    process.exit(0);
}

fixMissingRespostas();
