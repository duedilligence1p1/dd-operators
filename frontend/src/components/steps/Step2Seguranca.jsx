import { useLanguage } from '../../context/LanguageContext';
import TimeToImplement from './TimeToImplement';

export default function Step2Seguranca({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.seguranca || {};
    const handleChange = (e) => { const { name, value, type, checked } = e.target; updateData('seguranca', { [name]: type === 'checkbox' ? checked : value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Segurança da Informação</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label required">Criptografia de dados em repouso</label>
                        <select name="criptografia_repouso" className="form-select" value={formData.criptografia_repouso || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">Selecione...</option>
                            <option value="AES-256">AES-256</option>
                            <option value="AES-128">AES-128</option>
                            <option value="outro">Outro</option>
                            <option value="nenhum">Nenhum</option>
                        </select>
                        <TimeToImplement
                            section="seguranca"
                            field="criptografia_repouso"
                            value={formData.criptografia_repouso_tempo}
                            onChange={updateData}
                            disabled={disabled}
                            visible={formData.criptografia_repouso === 'nenhum'}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label required">Criptografia em trânsito (TLS/SSL)</label>
                        <select name="criptografia_transito" className="form-select" value={formData.criptografia_transito || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">Selecione...</option>
                            <option value="TLS-1.3">TLS 1.3</option>
                            <option value="TLS-1.2">TLS 1.2</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="step-section">
                <h3 className="step-section-title">Autenticação MFA</h3>
                <div className="form-group">
                    <label className="form-label required">Autenticação multifator (MFA) implementada</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="mfa_implementado" value="sim" checked={formData.mfa_implementado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Sim</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="mfa_implementado" value="parcial" checked={formData.mfa_implementado === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Parcial</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="mfa_implementado" value="em_implementacao" checked={formData.mfa_implementado === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Em Progresso</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="mfa_implementado" value="nao" checked={formData.mfa_implementado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="mfa_implementado" value="na" checked={formData.mfa_implementado === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">N/A</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="seguranca"
                        field="mfa_implementado"
                        value={formData.mfa_implementado_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.mfa_implementado && formData.mfa_implementado !== 'sim' && formData.mfa_implementado !== 'na'}
                    />
                </div>
            </div>

            <div className="step-section">
                <h3 className="step-section-title">Testes de Penetração (Pentest)</h3>
                <div className="form-group">
                    <label className="form-label required">Realiza testes de penetração periodicamente</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="pentest_regular" value="sim" checked={formData.pentest_regular === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Sim</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="pentest_regular" value="parcial" checked={formData.pentest_regular === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Parcial</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="pentest_regular" value="em_implementacao" checked={formData.pentest_regular === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Em Progresso</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="pentest_regular" value="nao" checked={formData.pentest_regular === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="pentest_regular" value="na" checked={formData.pentest_regular === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">N/A</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="seguranca"
                        field="pentest_regular"
                        value={formData.pentest_regular_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.pentest_regular && formData.pentest_regular !== 'sim' && formData.pentest_regular !== 'na'}
                    />
                </div>
                {formData.pentest_regular === 'sim' && (
                    <div className="form-row" style={{ marginTop: '1rem', animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div className="form-group">
                            <label className="form-label">Frequência dos testes</label>
                            <select name="pentest_frequencia" className="form-select" value={formData.pentest_frequencia || ''} onChange={handleChange} disabled={disabled}>
                                <option value="">Selecione...</option>
                                <option value="mensal">Mensal</option>
                                <option value="trimestral">Trimestral</option>
                                <option value="semestral">Semestral</option>
                                <option value="anual">Anual</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Último pentest realizado</label>
                            <input type="date" name="pentest_ultima_data" className="form-input" value={formData.pentest_ultima_data || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

