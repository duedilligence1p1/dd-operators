import { useLanguage } from '../../context/LanguageContext';
import TimeToImplement from './TimeToImplement';

export default function Step5Apostas({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.apostas || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('apostas', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">KYC e Reportes Regulatórios</h3>
                <div className="form-group">
                    <label className="form-label required">Realiza KYC?</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="kyc_implementado" value="sim" checked={formData.kyc_implementado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Sim</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="kyc_implementado" value="parcial" checked={formData.kyc_implementado === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Parcial</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="kyc_implementado" value="em_implementacao" checked={formData.kyc_implementado === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Em Progresso</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="kyc_implementado" value="nao" checked={formData.kyc_implementado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="kyc_implementado" value="na" checked={formData.kyc_implementado === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">N/A</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="apostas"
                        field="kyc_implementado"
                        value={formData.kyc_implementado_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.kyc_implementado && formData.kyc_implementado !== 'sim' && formData.kyc_implementado !== 'na'}
                    />
                </div>
                {formData.kyc_implementado === 'sim' && (
                    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div className="form-group">
                            <label className="form-label required">Fornecedor de biometria</label>
                            <input type="text" name="kyc_fornecedor" className="form-input" placeholder="Ex: Facematch, iProov" value={formData.kyc_fornecedor || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                        <div className="form-group">
                            <label className="form-label required">Como é garantida a veracidade?</label>
                            <textarea name="kyc_veracidade_biometria" className="form-textarea" placeholder="Descreva prova de vida, detecção de deepfakes..." value={formData.kyc_veracidade_biometria || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                    </div>
                )}
            </div>

            <div className="step-section">
                <h3 className="step-section-title">PLD / AML</h3>
                <div className="form-group">
                    <label className="form-label required">Possui programa PLD/AML?</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="aml_programa" value="sim" checked={formData.aml_programa === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Sim</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="aml_programa" value="parcial" checked={formData.aml_programa === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Parcial</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="aml_programa" value="em_implementacao" checked={formData.aml_programa === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Em Progresso</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="aml_programa" value="nao" checked={formData.aml_programa === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="aml_programa" value="na" checked={formData.aml_programa === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">N/A</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="apostas"
                        field="aml_programa"
                        value={formData.aml_programa_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.aml_programa && formData.aml_programa !== 'sim' && formData.aml_programa !== 'na'}
                    />
                </div>
            </div>

            <div className="step-section">
                <h3 className="step-section-title">Logs e Reportes</h3>
                <div className="form-group">
                    <label className="form-label required">Mantém logs para órgãos reguladores?</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="logs_transacoes" value="sim" checked={formData.logs_transacoes === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Sim</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="logs_transacoes" value="parcial" checked={formData.logs_transacoes === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Parcial</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="logs_transacoes" value="em_implementacao" checked={formData.logs_transacoes === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Em Progresso</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="logs_transacoes" value="nao" checked={formData.logs_transacoes === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="logs_transacoes" value="na" checked={formData.logs_transacoes === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">N/A</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="apostas"
                        field="logs_transacoes"
                        value={formData.logs_transacoes_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.logs_transacoes && formData.logs_transacoes !== 'sim' && formData.logs_transacoes !== 'na'}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Órgãos para os quais reporta</label>
                    <textarea name="orgaos_reporte" className="form-textarea" placeholder="Ex: SPA, Ministério da Fazenda, COAF..." value={formData.orgaos_reporte || ''} onChange={handleChange} disabled={disabled} />
                </div>
            </div>
        </div>
    );
}

