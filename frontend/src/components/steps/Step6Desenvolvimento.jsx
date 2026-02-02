import { useLanguage } from '../../context/LanguageContext';
import TimeToImplement from './TimeToImplement';

export default function Step6Desenvolvimento({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.desenvolvimento || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('desenvolvimento', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step5.title')}</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step5.sdlc')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="sdlc_implementado" value="sim" checked={formData.sdlc_implementado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="sdlc_implementado" value="parcial" checked={formData.sdlc_implementado === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="sdlc_implementado" value="em_implementacao" checked={formData.sdlc_implementado === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="sdlc_implementado" value="nao" checked={formData.sdlc_implementado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="desenvolvimento"
                        field="sdlc_implementado"
                        value={formData.sdlc_implementado_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.sdlc_implementado && formData.sdlc_implementado !== 'sim'}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">{t('step5.methodologies')}</label>
                    <textarea name="sdlc_metodologias" className="form-textarea" placeholder="E.g.: OWASP SAMM, OWASP ASVS, Microsoft SDL..." value={formData.sdlc_metodologias || ''} onChange={handleChange} disabled={disabled} />
                </div>
                <div className="form-group">
                    <label className="form-label">{t('step5.sast')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="sast_dast" value="sim" checked={formData.sast_dast === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="sast_dast" value="parcial" checked={formData.sast_dast === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="sast_dast" value="em_implementacao" checked={formData.sast_dast === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="sast_dast" value="nao" checked={formData.sast_dast === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="desenvolvimento"
                        field="sast_dast"
                        value={formData.sast_dast_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.sast_dast && formData.sast_dast !== 'sim'}
                    />
                </div>
            </div>

            <div className="step-section">
                <h3 className="step-section-title">{t('steps.ai')}</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step5.ai')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="ia_utiliza" value="sim" checked={formData.ia_utiliza === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="ia_utiliza" value="nao" checked={formData.ia_utiliza === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                </div>
                {formData.ia_utiliza === 'sim' && (
                    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div className="form-group">
                            <label className="form-label">{t('step5.aiPurposes')}</label>
                            <textarea name="ia_finalidades" className="form-textarea" placeholder="E.g.: Fraud detection, risk analysis, chatbot..." value={formData.ia_finalidades || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                        <div className="form-group">
                            <label className="form-label required">{t('step5.aiDataProtection')}</label>
                            <div className="radio-group-horizontal">
                                <label className="form-check">
                                    <input type="radio" name="ia_treino_dados" value="sim" checked={formData.ia_treino_dados === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('common.yes')}</span>
                                </label>
                                <label className="form-check">
                                    <input type="radio" name="ia_treino_dados" value="parcial" checked={formData.ia_treino_dados === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('step3.partial')}</span>
                                </label>
                                <label className="form-check">
                                    <input type="radio" name="ia_treino_dados" value="em_implementacao" checked={formData.ia_treino_dados === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('step3.inProgress')}</span>
                                </label>
                                <label className="form-check">
                                    <input type="radio" name="ia_treino_dados" value="nao" checked={formData.ia_treino_dados === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('common.no')}</span>
                                </label>
                            </div>
                            <TimeToImplement
                                section="desenvolvimento"
                                field="ia_treino_dados"
                                value={formData.ia_treino_dados_tempo}
                                onChange={updateData}
                                disabled={disabled}
                                visible={formData.ia_treino_dados && formData.ia_treino_dados !== 'sim'}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">{t('step5.aiConsent')}</label>
                            <div className="radio-group-horizontal">
                                <label className="form-check">
                                    <input type="radio" name="ia_consentimento" value="sim" checked={formData.ia_consentimento === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('common.yes')}</span>
                                </label>
                                <label className="form-check">
                                    <input type="radio" name="ia_consentimento" value="parcial" checked={formData.ia_consentimento === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('step3.partial')}</span>
                                </label>
                                <label className="form-check">
                                    <input type="radio" name="ia_consentimento" value="em_implementacao" checked={formData.ia_consentimento === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('step3.inProgress')}</span>
                                </label>
                                <label className="form-check">
                                    <input type="radio" name="ia_consentimento" value="nao" checked={formData.ia_consentimento === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('common.no')}</span>
                                </label>
                            </div>
                            <TimeToImplement
                                section="desenvolvimento"
                                field="ia_consentimento"
                                value={formData.ia_consentimento_tempo}
                                onChange={updateData}
                                disabled={disabled}
                                visible={formData.ia_consentimento && formData.ia_consentimento !== 'sim'}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

