import { useLanguage } from '../../context/LanguageContext';
import TimeToImplement from './TimeToImplement';

export default function Step7RH({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.rh || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('rh', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step6.title')}</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step6.backgroundCheck')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="background_check" value="sim" checked={formData.background_check === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="background_check" value="parcial" checked={formData.background_check === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="background_check" value="em_implementacao" checked={formData.background_check === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="background_check" value="nao" checked={formData.background_check === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="rh"
                        field="background_check"
                        value={formData.background_check_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.background_check && formData.background_check !== 'sim'}
                    />
                </div>
                {formData.background_check === 'sim' && (
                    <div className="form-group" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        <label className="form-label">{t('step6.verificationTypes')}</label>
                        <textarea name="bg_tipos" className="form-textarea" placeholder="E.g.: Criminal background, employment history..." value={formData.bg_tipos || ''} onChange={handleChange} disabled={disabled} />
                    </div>
                )}
            </div>

            <div className="step-section">
                <h3 className="step-section-title">Security Operations Center (SOC)</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step6.hasSoc')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="soc_existe" value="sim" checked={formData.soc_existe === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="soc_existe" value="parcial" checked={formData.soc_existe === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="soc_existe" value="em_implementacao" checked={formData.soc_existe === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="soc_existe" value="nao" checked={formData.soc_existe === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="rh"
                        field="soc_existe"
                        value={formData.soc_existe_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.soc_existe && formData.soc_existe !== 'sim'}
                    />
                </div>
                {formData.soc_existe === 'sim' && (
                    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div className="form-group">
                            <label className="form-label required">{t('step6.operates247')}</label>
                            <div className="radio-group-horizontal">
                                <label className="form-check">
                                    <input type="radio" name="soc_24x7" value="sim" checked={formData.soc_24x7 === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('common.yes')}, 24/7</span>
                                </label>
                                <label className="form-check">
                                    <input type="radio" name="soc_24x7" value="parcial" checked={formData.soc_24x7 === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('step3.partial')}</span>
                                </label>
                                <label className="form-check">
                                    <input type="radio" name="soc_24x7" value="em_implementacao" checked={formData.soc_24x7 === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('step3.inProgress')}</span>
                                </label>
                                <label className="form-check">
                                    <input type="radio" name="soc_24x7" value="nao" checked={formData.soc_24x7 === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                                    <span className="form-check-label">{t('common.no')}</span>
                                </label>
                            </div>
                            <TimeToImplement
                                section="rh"
                                field="soc_24x7"
                                value={formData.soc_24x7_tempo}
                                onChange={updateData}
                                disabled={disabled}
                                visible={formData.soc_24x7 && formData.soc_24x7 !== 'sim'}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">{t('step6.socModel')}</label>
                            <select name="soc_modelo" className="form-select" value={formData.soc_modelo || ''} onChange={handleChange} disabled={disabled}>
                                <option value="">{t('common.select')}...</option>
                                <option value="interno">{t('step6.internal')}</option>
                                <option value="terceirizado">{t('step6.outsourced')}</option>
                                <option value="hibrido">{t('step6.hybrid')}</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="step-section">
                <h3 className="step-section-title">{t('step6.securityTraining')}</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step6.securityTraining')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="treinamento_seguranca" value="sim" checked={formData.treinamento_seguranca === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="treinamento_seguranca" value="parcial" checked={formData.treinamento_seguranca === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="treinamento_seguranca" value="em_implementacao" checked={formData.treinamento_seguranca === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="treinamento_seguranca" value="nao" checked={formData.treinamento_seguranca === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="rh"
                        field="treinamento_seguranca"
                        value={formData.treinamento_seguranca_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.treinamento_seguranca && formData.treinamento_seguranca !== 'sim'}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">{t('step6.nda')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="nda_assinado" value="sim" checked={formData.nda_assinado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="nda_assinado" value="parcial" checked={formData.nda_assinado === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="nda_assinado" value="em_implementacao" checked={formData.nda_assinado === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="nda_assinado" value="nao" checked={formData.nda_assinado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="rh"
                        field="nda_assinado"
                        value={formData.nda_assinado_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.nda_assinado && formData.nda_assinado !== 'sim'}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">{t('step6.audit')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="auditoria_externa" value="sim" checked={formData.auditoria_externa === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="auditoria_externa" value="parcial" checked={formData.auditoria_externa === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="auditoria_externa" value="em_implementacao" checked={formData.auditoria_externa === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="auditoria_externa" value="nao" checked={formData.auditoria_externa === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="rh"
                        field="auditoria_externa"
                        value={formData.auditoria_externa_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.auditoria_externa && formData.auditoria_externa !== 'sim'}
                    />
                </div>

            </div>
        </div>
    );
}

