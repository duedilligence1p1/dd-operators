import { useLanguage } from '../../context/LanguageContext';
import TimeToImplement from './TimeToImplement';

export default function Step4Incidentes({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.incidentes || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('incidentes', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Resposta a Incidentes</h3>
                <div className="form-group">
                    <label className="form-label required">Plano de resposta a incidentes documentado?</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="plano_documentado" value="sim" checked={formData.plano_documentado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Sim</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="plano_documentado" value="parcial" checked={formData.plano_documentado === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Parcial</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="plano_documentado" value="em_implementacao" checked={formData.plano_documentado === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Em Progresso</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="plano_documentado" value="nao" checked={formData.plano_documentado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="plano_documentado" value="na" checked={formData.plano_documentado === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">N/A</span>
                        </label>
                    </div>
                </div>
                <TimeToImplement
                    section="incidentes"
                    field="plano_documentado"
                    value={formData.plano_documentado_tempo}
                    onChange={updateData}
                    disabled={disabled}
                    visible={formData.plano_documentado && formData.plano_documentado !== 'sim' && formData.plano_documentado !== 'na'}
                />
            </div>

            <div className="step-section">
                <h3 className="step-section-title">Continuidade de Negócios</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label required">RTO - Tempo Objetivo de Recuperação</label>
                        <select name="rto" className="form-select" value={formData.rto || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">Selecione...</option>
                            <option value="1h">Até 1h</option>
                            <option value="4h">Até 4h</option>
                            <option value="8h">Até 8h</option>
                            <option value="24h">Até 24h</option>
                        </select>
                        <span className="form-hint">Tempo máximo de inatividade</span>
                    </div>
                    <div className="form-group">
                        <label className="form-label required">RPO - Ponto Objetivo de Recuperação</label>
                        <select name="rpo" className="form-select" value={formData.rpo || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">Selecione...</option>
                            <option value="0">Tempo real</option>
                            <option value="1h">Até 1h</option>
                            <option value="4h">Até 4h</option>
                            <option value="24h">Até 24h</option>
                        </select>
                        <span className="form-hint">Perda máxima de dados</span>
                    </div>
                </div>
            </div>

            <div className="step-section">
                <h3 className="step-section-title">Seguro Cyber</h3>
                <div className="form-group">
                    <label className="form-label">Possui equipe de resposta a incidentes (CSIRT)?</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="csirt_existe" value="sim" checked={formData.csirt_existe === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Sim</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="csirt_existe" value="parcial" checked={formData.csirt_existe === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Parcial</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="csirt_existe" value="em_implementacao" checked={formData.csirt_existe === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Em Progresso</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="csirt_existe" value="nao" checked={formData.csirt_existe === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="csirt_existe" value="na" checked={formData.csirt_existe === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">N/A</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="incidentes"
                        field="csirt_existe"
                        value={formData.csirt_existe_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.csirt_existe && formData.csirt_existe !== 'sim' && formData.csirt_existe !== 'na'}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Possui seguro contra riscos cibernéticos?</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="seguro_cyber" value="sim" checked={formData.seguro_cyber === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Sim</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="seguro_cyber" value="parcial" checked={formData.seguro_cyber === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Parcial</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="seguro_cyber" value="em_implementacao" checked={formData.seguro_cyber === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Em Progresso</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="seguro_cyber" value="nao" checked={formData.seguro_cyber === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="seguro_cyber" value="na" checked={formData.seguro_cyber === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">N/A</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="incidentes"
                        field="seguro_cyber"
                        value={formData.seguro_cyber_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.seguro_cyber && formData.seguro_cyber !== 'sim' && formData.seguro_cyber !== 'na'}
                    />
                </div>
            </div>
        </div>
    );
}

