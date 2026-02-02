import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';

export default function AdminDashboard() {
    const { t } = useLanguage();
    const [operadores, setOperadores] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedOperador, setSelectedOperador] = useState(null);
    const [detalhes, setDetalhes] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createForm, setCreateForm] = useState({ email: '', password: '', nome_empresa: '' });
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState('');

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const [ops, st] = await Promise.all([adminAPI.getOperadores(), adminAPI.getEstatisticas()]);
            setOperadores(ops);
            setStats(st);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const viewDetalhes = async (id) => {
        setSelectedOperador(id);
        try { const data = await adminAPI.getOperador(id); setDetalhes(data); }
        catch (error) { console.error(error); }
    };

    const toggleStatus = async (id, current) => {
        await adminAPI.updateStatus(id, current === 'ativo' ? 'inativo' : 'ativo');
        loadData();
    };

    const handleDeleteOperador = async (id, nome) => {
        if (!window.confirm(`Tem certeza que deseja excluir o operador "${nome}"? Esta ação não pode ser desfeita.`)) return;
        try {
            await adminAPI.deleteOperador(id);
            loadData();
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir operador');
        }
    };

    const handleCreateOperador = async (e) => {
        e.preventDefault();
        setCreating(true);
        setCreateError('');
        try {
            await adminAPI.createOperador(createForm.email, createForm.password, createForm.nome_empresa);
            setShowCreateModal(false);
            setCreateForm({ email: '', password: '', nome_empresa: '' });
            loadData();
        } catch (error) {
            setCreateError(error.message);
        } finally {
            setCreating(false);
        }
    };

    // Função para converter respostas em formato legível
    const formatRespostas = (respostas) => {
        if (!respostas) return {};
        const secoes = {
            'Governança': respostas.secao_1_governanca,
            'Segurança': respostas.secao_2_seguranca,
            'Ciclo de Vida': respostas.secao_3_ciclo_vida,
            'Incidentes': respostas.secao_4_incidentes,
            'Desenvolvimento': respostas.secao_6_desenvolvimento,
            'RH': respostas.secao_7_rh,
            'Integridade': respostas.secao_9_integridade
        };
        return secoes;
    };

    // Função para exportar CSV de um operador
    const exportCSV = (operador, respostas) => {
        const rows = [['Seção', 'Pergunta', 'Resposta']];
        const secoes = formatRespostas(respostas);

        Object.entries(secoes).forEach(([secaoNome, dados]) => {
            if (dados && typeof dados === 'object') {
                Object.entries(dados).forEach(([pergunta, resposta]) => {
                    // Ignorar chaves de tempo na iteração principal
                    if (pergunta.endsWith('_tempo')) return;

                    const perguntaFormatada = pergunta.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    const tempoKey = `${pergunta}_tempo`;
                    const tempoStr = dados[tempoKey] ? ` | Tempo: ${dados[tempoKey]}` : '';

                    rows.push([secaoNome, perguntaFormatada, (resposta || '') + tempoStr]);
                });
            }
        });

        const csvContent = rows.map(row =>
            row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        ).join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `due_diligence_${operador.nome_empresa.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Função para exportar todos os operadores finalizados
    const exportAllCSV = () => {
        const finalizados = operadores.filter(op => op.status_submissao === 'finalizado');
        if (finalizados.length === 0) {
            alert('Nenhum operador finalizou o questionário ainda.');
            return;
        }

        const rows = [['Empresa', 'Email', 'Status', 'Data Envio', 'Progresso']];
        finalizados.forEach(op => {
            rows.push([
                op.nome_empresa,
                op.email,
                op.status_submissao,
                op.data_envio ? new Date(op.data_envio).toLocaleString('pt-BR') : '',
                op.progresso
            ]);
        });

        const csvContent = rows.map(row =>
            row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        ).join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `operadores_finalizados_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (loading) return <div className="app-container"><Header /><div className="loading-overlay" style={{ position: 'relative', background: 'transparent' }}><div className="loading-spinner"></div></div></div>;

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1>{t('admin.title')}</h1>
                        <p style={{ color: 'var(--neutral-400)' }}>{t('admin.subtitle')}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button className="btn btn-success" onClick={() => setShowCreateModal(true)}>
                            ➕ {t('admin.newOperator')}
                        </button>
                        <button className="btn btn-primary" onClick={exportAllCSV}>
                            📊 {t('admin.exportCSV')}
                        </button>
                    </div>
                </div>

                <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <div className="stat-card"><div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>👥</div><div><div className="stat-value">{stats?.total_operadores || 0}</div><div className="stat-label">{t('admin.operators')}</div></div></div>
                    <div className="stat-card"><div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>✓</div><div><div className="stat-value">{stats?.finalizados || 0}</div><div className="stat-label">{t('admin.finalized')}</div></div></div>
                    <div className="stat-card"><div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>⏳</div><div><div className="stat-value">{stats?.em_andamento || 0}</div><div className="stat-label">{t('admin.inProgress')}</div></div></div>
                </div>

                <div className="card">
                    <div className="card-header"><h2 className="card-title">{t('admin.operators')}</h2><span className="badge badge-neutral">{operadores.length}</span></div>
                    <div className="table-container">
                        <table className="table">
                            <thead><tr><th>{t('admin.company')}</th><th>{t('admin.email')}</th><th>{t('admin.status')}</th><th>{t('admin.progress')}</th><th>{t('admin.actions')}</th></tr></thead>
                            <tbody>
                                {operadores.map(op => (
                                    <tr key={op.id}>
                                        <td><strong>{op.nome_empresa}</strong></td>
                                        <td style={{ color: 'var(--neutral-400)' }}>{op.email}</td>
                                        <td><span className={`badge ${op.status === 'ativo' ? 'badge-success' : 'badge-danger'}`}>{op.status}</span></td>
                                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><div className="progress-bar"><div className="progress-fill" style={{ width: `${(op.secoes_preenchidas / 8) * 100}%` }} /></div><span>{op.progresso}</span>{op.status_submissao === 'finalizado' && <span className="badge badge-success">✓</span>}</div></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="btn btn-sm btn-outline" onClick={() => viewDetalhes(op.id)}>👁️ Ver</button>
                                                <button className="btn btn-sm btn-ghost" onClick={() => toggleStatus(op.id, op.status)} title={op.status === 'ativo' ? 'Desativar' : 'Ativar'}>
                                                    {op.status === 'ativo' ? '🔒' : '🔓'}
                                                </button>
                                                <button className="btn btn-sm btn-ghost" onClick={() => handleDeleteOperador(op.id, op.nome_empresa)} style={{ color: 'var(--danger-500)' }} title="Excluir Operador">
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {operadores.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--neutral-500)' }}>Nenhum operador</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {selectedOperador && (
                <div className="modal-overlay" onClick={() => { setSelectedOperador(null); setDetalhes(null); }}>
                    <div className="modal" style={{ maxWidth: 900, maxHeight: '90vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Detalhes: {detalhes?.operador?.nome_empresa || '...'}</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                {detalhes?.respostas && (
                                    <button className="btn btn-sm btn-primary" onClick={() => exportCSV(detalhes.operador, detalhes.respostas)}>
                                        📥 Exportar CSV
                                    </button>
                                )}
                                <button className="modal-close" onClick={() => { setSelectedOperador(null); setDetalhes(null); }}>×</button>
                            </div>
                        </div>
                        <div className="modal-body">
                            {detalhes ? (
                                <div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '0.75rem' }}>
                                        <p><strong>Email:</strong> {detalhes.operador?.email}</p>
                                        <p><strong>Status:</strong> <span className={`badge ${detalhes.respostas?.status_submissao === 'finalizado' ? 'badge-success' : 'badge-warning'}`}>{detalhes.respostas?.status_submissao || 'Não iniciado'}</span></p>
                                        {detalhes.respostas?.data_envio && <p><strong>Enviado:</strong> {new Date(detalhes.respostas.data_envio).toLocaleString('pt-BR')}</p>}
                                    </div>

                                    {/* Mostrar respostas por seção */}
                                    {detalhes.respostas && (
                                        <div>
                                            <h4 style={{ marginBottom: '1rem', color: 'var(--primary-400)' }}>📋 Respostas do Questionário</h4>
                                            {Object.entries(formatRespostas(detalhes.respostas)).map(([secaoNome, dados]) => (
                                                dados && Object.keys(dados).length > 0 && (
                                                    <div key={secaoNome} style={{ marginBottom: '1.5rem' }}>
                                                        <h5 style={{ color: 'var(--neutral-200)', borderBottom: '1px solid var(--neutral-700)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                                                            {secaoNome}
                                                        </h5>
                                                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                                                            {Object.entries(dados).map(([pergunta, resposta]) => {
                                                                // Ignorar chaves de tempo na iteração principal
                                                                if (pergunta.endsWith('_tempo')) return null;

                                                                const tempoKey = `${pergunta}_tempo`;
                                                                const tempoValue = dados[tempoKey];

                                                                return (
                                                                    <div key={pergunta} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '0.5rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.5rem' }}>
                                                                        <span style={{ color: 'var(--neutral-400)', fontSize: '0.875rem' }}>
                                                                            {pergunta.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                                        </span>
                                                                        <span style={{ color: 'var(--neutral-100)', fontWeight: 500 }}>
                                                                            {resposta || <span style={{ color: 'var(--neutral-500)' }}>—</span>}
                                                                            {tempoValue && (
                                                                                <span style={{ marginLeft: '1rem', color: 'var(--primary-400)', fontSize: '0.875rem', borderLeft: '1px solid var(--neutral-700)', paddingLeft: '1rem' }}>
                                                                                    ⏰ {tempoValue}
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}

                                    {detalhes.arquivos?.length > 0 && (
                                        <div style={{ marginTop: '1.5rem' }}>
                                            <h4 style={{ marginBottom: '1rem', color: 'var(--primary-400)' }}>📁 Arquivos Enviados ({detalhes.arquivos.length})</h4>
                                            {detalhes.arquivos.map(a => (
                                                <div key={a.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--neutral-800)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>📄 {a.nome_original}</span>
                                                    <span className="badge badge-neutral">{a.categoria}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : <div className="loading-spinner" style={{ margin: '2rem auto' }}></div>}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Criar Operador */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={() => { setShowCreateModal(false); setCreateError(''); }}>
                    <div className="modal" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">➕ Novo Operador</h3>
                            <button className="modal-close" onClick={() => { setShowCreateModal(false); setCreateError(''); }}>×</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCreateOperador}>
                                {createError && <div className="alert alert-danger"><span>⚠️</span><span>{createError}</span></div>}

                                <div className="form-group">
                                    <label className="form-label required">Nome da Empresa</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Empresa S.A."
                                        value={createForm.nome_empresa}
                                        onChange={(e) => setCreateForm({ ...createForm, nome_empresa: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label required">Email</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="operador@empresa.com"
                                        value={createForm.email}
                                        onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label required">Senha</label>
                                    <input
                                        type="password"
                                        className="form-input"
                                        placeholder="Mínimo 6 caracteres"
                                        value={createForm.password}
                                        onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                                        required
                                        minLength={6}
                                    />
                                    <span className="form-hint">A senha será enviada ao operador</span>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                                    <button type="button" className="btn btn-ghost" onClick={() => { setShowCreateModal(false); setCreateError(''); }}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-success" disabled={creating}>
                                        {creating ? 'Criando...' : '✓ Criar Operador'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
