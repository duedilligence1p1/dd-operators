import { useLanguage } from '../../context/LanguageContext';
import TimeToImplement from './TimeToImplement';

export default function Step1Governanca({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.governanca || {};
    const handleChange = (e) => { const { name, value, type, checked } = e.target; updateData('governanca', { [name]: type === 'checkbox' ? checked : value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Governança & Regulatório</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label required">País sede da empresa</label>
                        <input type="text" name="pais_sede" className="form-input" placeholder="Ex: Brasil / USA" value={formData.pais_sede || ''} onChange={handleChange} disabled={disabled} />
                    </div>
                    <div className="form-group">
                        <label className="form-label required">Licenças regulatórias</label>
                        <input type="text" name="jurisdicoes_operacao" className="form-input" placeholder="Ex: CVM, BACEN, Loteria estadual..." value={formData.jurisdicoes_operacao || ''} onChange={handleChange} disabled={disabled} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Detalhamento das licenças</label>
                    <textarea name="licencas_regulatorias" className="form-textarea" placeholder="Descreva as licenças e autorizações atuais..." value={formData.licencas_regulatorias || ''} onChange={handleChange} disabled={disabled} />
                </div>
            </div>

            <div className="step-section">
                <h3 className="step-section-title">KYC & DPO</h3>
                <div className="form-group">
                    <label className="form-label required">A empresa possui DPO designado?</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="possui_dpo" value="sim" checked={formData.possui_dpo === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="possui_dpo" value="parcial" checked={formData.possui_dpo === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="possui_dpo" value="em_implementacao" checked={formData.possui_dpo === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="possui_dpo" value="nao" checked={formData.possui_dpo === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                    </div>
                </div>

                {formData.possui_dpo === 'sim' && (
                    <div className="form-row" style={{ marginTop: '1rem', animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div className="form-group">
                            <label className="form-label required">Nome do DPO</label>
                            <input type="text" name="dpo_nome" className="form-input" placeholder="John Doe" value={formData.dpo_nome || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                        <div className="form-group">
                            <label className="form-label required">Email do DPO</label>
                            <input type="email" name="dpo_email" className="form-input" placeholder="dpo@company.com" value={formData.dpo_email || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                    </div>
                )}

                <TimeToImplement
                    section="governanca"
                    field="possui_dpo"
                    value={formData.possui_dpo_tempo}
                    onChange={updateData}
                    disabled={disabled}
                    visible={formData.possui_dpo && formData.possui_dpo !== 'sim'}
                />
            </div>

            <div className="step-section">
                <h3 className="step-section-title">Políticas e Procedimentos</h3>
                <div className="form-group">
                    <label className="form-label required">Possui políticas de privacidade documentadas?</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="politica_privacidade" value="sim" checked={formData.politica_privacidade === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Sim</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="politica_privacidade" value="parcial" checked={formData.politica_privacidade === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="politica_privacidade" value="em_implementacao" checked={formData.politica_privacidade === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="politica_privacidade" value="nao" checked={formData.politica_privacidade === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="governanca"
                        field="politica_privacidade"
                        value={formData.politica_privacidade_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.politica_privacidade && formData.politica_privacidade !== 'sim'}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">{t('step1.policyAcceptance')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="politica_seguranca" value="sim" checked={formData.politica_seguranca === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="politica_seguranca" value="parcial" checked={formData.politica_seguranca === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="politica_seguranca" value="em_implementacao" checked={formData.politica_seguranca === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.inProgress')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="politica_seguranca" value="nao" checked={formData.politica_seguranca === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                    <TimeToImplement
                        section="governanca"
                        field="politica_seguranca"
                        value={formData.politica_seguranca_tempo}
                        onChange={updateData}
                        disabled={disabled}
                        visible={formData.politica_seguranca && formData.politica_seguranca !== 'sim'}
                    />
                </div>
            </div>

        </div>
    );
}

