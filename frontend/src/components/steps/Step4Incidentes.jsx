import { useLanguage } from '../../context/LanguageContext';
import TimeToImplement from './TimeToImplement';

export default function Step4Incidentes({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.incidentes || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('incidentes', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step4.title')}</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step4.plan')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="plano_documentado" value="sim" checked={formData.plano_documentado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="plano_documentado" value="parcial" checked={formData.plano_documentado === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="plano_documentado" value="em_implementacao" checked={formData.plano_documentado === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="plano_documentado" value="nao" checked={formData.plano_documentado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                </div>
                <TimeToImplement
                    section="incidentes"
                    field="plano_documentado"
                    value={formData.plano_documentado_tempo}
                    onChange={updateData}
                    disabled={disabled}
                    visible={formData.plano_documentado && formData.plano_documentado !== 'sim'}
                />
            </div>

            <div className="step-section">
                <h3 className="step-section-title">{t('steps.businessContinuity')}</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label required">{t('step4.rto')}</label>
                        <select name="rto" className="form-select" value={formData.rto || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">{t('common.select')}...</option>
                            <option value="1h">{t('step4.upTo1h')}</option>
                            <option value="4h">{t('step4.upTo4h')}</option>
                            <option value="8h">{t('step4.upTo8h')}</option>
                            <option value="24h">{t('step4.upTo24h')}</option>
                        </select>
                        <span className="form-hint">{t('step4.maxDowntime')}</span>
                    </div>
                    <div className="form-group">
                        <label className="form-label required">{t('step4.rpo')}</label>
                        <select name="rpo" className="form-select" value={formData.rpo || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">{t('common.select')}...</option>
                            <option value="0">{t('step4.realTime')}</option>
                            <option value="1h">{t('step4.upTo1h')}</option>
                            <option value="4h">{t('step4.upTo4h')}</option>
                            <option value="24h">{t('step4.upTo24h')}</option>
                        </select>
                        <span className="form-hint">{t('step4.maxDataLoss')}</span>
                    </div>
                </div>
            </div>

            <div className="step-section">
                <h3 className="step-section-title">{t('steps.teamInsurance')}</h3>
                <div className="form-group">
                    <label className="form-label">{t('step4.csirt')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="csirt_existe" value="sim" checked={formData.csirt_existe === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="csirt_existe" value="parcial" checked={formData.csirt_existe === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="csirt_existe" value="em_implementacao" checked={formData.csirt_existe === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="csirt_existe" value="nao" checked={formData.csirt_existe === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="incidentes"
                        field="csirt_existe"
                        value={formData.csirt_existe_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.csirt_existe && formData.csirt_existe !== 'sim'}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">{t('step4.insurance')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="seguro_cyber" value="sim" checked={formData.seguro_cyber === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="seguro_cyber" value="parcial" checked={formData.seguro_cyber === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="seguro_cyber" value="em_implementacao" checked={formData.seguro_cyber === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="seguro_cyber" value="nao" checked={formData.seguro_cyber === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="incidentes"
                        field="seguro_cyber"
                        value={formData.seguro_cyber_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.seguro_cyber && formData.seguro_cyber !== 'sim'}
                    />
                </div>
            </div>
        </div>
    );
}

