import { useLanguage } from '../../context/LanguageContext';
import TimeToImplement from './TimeToImplement';

export default function Step8Integridade({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.integridade || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('integridade', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step7.title')}</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step7.rng')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="rng_certificado" value="sim" checked={formData.rng_certificado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="rng_certificado" value="parcial" checked={formData.rng_certificado === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="rng_certificado" value="em_implementacao" checked={formData.rng_certificado === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="rng_certificado" value="nao" checked={formData.rng_certificado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="rng_certificado" value="na" checked={formData.rng_certificado === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">N/A</span>
                        </label>
                    </div>
                </div>

                <TimeToImplement
                    section="integridade"
                    field="rng_certificado"
                    value={formData.rng_certificado_tempo}
                    onChange={updateData}
                    disabled={disabled}
                    visible={formData.rng_certificado && formData.rng_certificado !== 'sim' && formData.rng_certificado !== 'na'}
                />

                {formData.rng_certificado === 'sim' && (
                    <div className="form-row" style={{ marginTop: '1rem', animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div className="form-group">
                            <label className="form-label">{t('step7.certifier')}</label>
                            <input type="text" name="rng_certificadora" className="form-input" placeholder="E.g.: eCOGRA, GLI, BMM" value={formData.rng_certificadora || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">{t('step7.date')}</label>
                            <input type="date" name="rng_data" className="form-input" value={formData.rng_data || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                    </div>
                )}
            </div>

            <div className="step-section">
                <h3 className="step-section-title">{t('step7.otherCerts')}</h3>
                <div className="form-group">
                    <label className="form-label">{t('step7.otherCerts')}</label>
                    <textarea name="certificacoes" className="form-textarea" placeholder="E.g.: ISO 27001, SOC 2 Type II, PCI DSS..." value={formData.certificacoes || ''} onChange={handleChange} disabled={disabled} />
                </div>
            </div>

            <div className="step-section">
                <h3 className="step-section-title">{t('step3.compliance')}</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step7.portability')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="portabilidade" value="sim" checked={formData.portabilidade === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="portabilidade" value="parcial" checked={formData.portabilidade === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="portabilidade" value="em_implementacao" checked={formData.portabilidade === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="portabilidade" value="nao" checked={formData.portabilidade === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="integridade"
                        field="portabilidade"
                        value={formData.portabilidade_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.portabilidade && formData.portabilidade !== 'sim'}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label required">{t('step1.policyAcceptance')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="exclusao_completa" value="sim" checked={formData.exclusao_completa === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="exclusao_completa" value="parcial" checked={formData.exclusao_completa === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="exclusao_completa" value="em_implementacao" checked={formData.exclusao_completa === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="exclusao_completa" value="nao" checked={formData.exclusao_completa === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="integridade"
                        field="exclusao_completa"
                        value={formData.exclusao_completa_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.exclusao_completa && formData.exclusao_completa !== 'sim'}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">{t('step7.notes')}</label>
                    <textarea name="observacoes" className="form-textarea" placeholder={t('step7.notesPlaceholder')} value={formData.observacoes || ''} onChange={handleChange} disabled={disabled} />
                </div>
            </div>
        </div>
    );
}

