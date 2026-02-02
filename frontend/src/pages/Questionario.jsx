import { useState, useEffect } from 'react';
import { respostasAPI } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Stepper from '../components/Stepper';
import Step1Governanca from '../components/steps/Step1Governanca';
import Step2Seguranca from '../components/steps/Step2Seguranca';
import Step3CicloVida from '../components/steps/Step3CicloVida';
import Step4Incidentes from '../components/steps/Step4Incidentes';
import Step5Apostas from '../components/steps/Step5Apostas';
import Step6Desenvolvimento from '../components/steps/Step6Desenvolvimento';
import Step7RH from '../components/steps/Step7RH';
import Step8Integridade from '../components/steps/Step8Integridade';
import Step9Upload from '../components/steps/Step9Upload';

export default function Questionario() {
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [respostas, setRespostas] = useState(null);
    const [formData, setFormData] = useState({
        governanca: {}, seguranca: {}, ciclo_vida: {}, incidentes: {},
        apostas: {}, desenvolvimento: {}, rh: {}, integridade: {}
    });

    const STEPS = [
        { id: 1, numero: 1, key: 'governance', title: t('steps.governance'), component: Step1Governanca },
        { id: 2, numero: 2, key: 'security', title: t('steps.security'), component: Step2Seguranca },
        { id: 3, numero: 3, key: 'lifecycle', title: t('steps.lifecycle'), component: Step3CicloVida },
        { id: 4, numero: 4, key: 'incidents', title: t('steps.incidents'), component: Step4Incidentes },
        { id: 5, numero: 5, key: 'kyc', title: t('steps.kyc'), component: Step5Apostas },
        { id: 6, numero: 6, key: 'development', title: t('steps.development'), component: Step6Desenvolvimento },
        { id: 7, numero: 7, key: 'hr', title: t('steps.hr'), component: Step7RH },
        { id: 8, numero: 9, key: 'integrity', title: t('steps.integrity'), component: Step8Integridade },
        { id: 9, numero: 0, key: 'upload', title: t('steps.upload'), component: Step9Upload },
    ];

    useEffect(() => { loadRespostas(); }, []);

    const loadRespostas = async () => {
        try {
            const data = await respostasAPI.get();
            setRespostas(data);
            setFormData({
                governanca: data.secao_1_governanca || {},
                seguranca: data.secao_2_seguranca || {},
                ciclo_vida: data.secao_3_ciclo_vida || {},
                incidentes: data.secao_4_incidentes || {},
                apostas: data.secao_5_apostas || {},
                desenvolvimento: data.secao_6_desenvolvimento || {},
                rh: data.secao_7_rh || {},
                integridade: data.secao_9_integridade || {}
            });
        } catch (error) { showMessage('danger', t('questionnaire.errorLoad')); }
        finally { setLoading(false); }
    };

    const showMessage = (type, text) => { setMessage({ type, text }); setTimeout(() => setMessage({ type: '', text: '' }), 5000); };
    const updateFormData = (section, data) => setFormData(prev => ({ ...prev, [section]: { ...prev[section], ...data } }));

    const saveCurrentStep = async () => {
        const step = STEPS[currentStep - 1];
        if (!step.numero || step.numero === 0) return;

        setSaving(true);
        try {
            const sectionKeys = { 1: 'governanca', 2: 'seguranca', 3: 'ciclo_vida', 4: 'incidentes', 5: 'apostas', 6: 'desenvolvimento', 7: 'rh', 9: 'integridade' };
            const sectionKey = sectionKeys[step.numero];
            if (sectionKey) await respostasAPI.saveSecao(step.numero, formData[sectionKey]);
            showMessage('success', t('questionnaire.successSaved'));
        } catch (error) { showMessage('danger', t('questionnaire.errorSave')); }
        finally { setSaving(false); }
    };

    const nextStep = async () => { await saveCurrentStep(); if (currentStep < STEPS.length) setCurrentStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

    const finalizarQuestionario = async () => {
        const confirmMsg = t('questionnaire.finalize') + '?';
        if (!window.confirm(confirmMsg)) return;
        setSaving(true);
        try { await respostasAPI.finalizar(); showMessage('success', t('questionnaire.successFinalized')); await loadRespostas(); }
        catch (error) { showMessage('danger', t('questionnaire.errorFinalize')); }
        finally { setSaving(false); }
    };

    const reabrirQuestionario = async () => {
        setSaving(true);
        try { await respostasAPI.reabrir(); showMessage('success', 'Questionário reaberto para edição'); await loadRespostas(); }
        catch (error) { showMessage('danger', t('common.error')); }
        finally { setSaving(false); }
    };

    const isFinalized = respostas?.status_submissao === 'finalizado';
    const CurrentStepComponent = STEPS[currentStep - 1].component;

    if (loading) return <div className="app-container"><Header /><div className="loading-overlay" style={{ position: 'relative', background: 'transparent' }}><div className="loading-spinner"></div></div></div>;

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                {message.text && <div className={`alert alert-${message.type}`}><span>{message.type === 'success' ? '✓' : '⚠️'}</span><span>{message.text}</span></div>}

                {isFinalized && (
                    <div className="alert alert-info shadow-lg" style={{ borderLeft: '5px solid var(--primary-500)', background: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '2rem' }}>🔒</div>
                            <div style={{ flex: 1 }}>
                                <strong style={{ fontSize: '1.1rem', color: 'var(--neutral-800)' }}>{t('questionnaire.successFinalized')}</strong>
                                <p style={{ margin: '0.25rem 0 0.5rem', color: 'var(--neutral-500)' }}>
                                    {t('questionnaire.sent')}: {new Date(respostas.data_envio).toLocaleString()}
                                </p>
                                <button className="btn btn-sm btn-outline" onClick={reabrirQuestionario} style={{ color: 'var(--primary-600)', borderColor: 'var(--primary-200)' }}>
                                    🔓 {t('questionnaire.reopen')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1>{t('questionnaire.title')}</h1>
                    <p style={{ color: 'var(--neutral-400)' }}>{t('questionnaire.subtitle')}</p>
                </div>

                <Stepper steps={STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />

                <div className={`card ${isFinalized ? 'card-disabled' : ''}`} style={{ position: 'relative' }}>
                    {isFinalized && <div className="card-lock-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 5, cursor: 'not-allowed' }} title="Clique em Reabrir para editar"></div>}

                    <div className="card-header">
                        <h2 className="card-title">{t('questionnaire.step')} {currentStep}: {STEPS[currentStep - 1].title}</h2>
                        <span className="badge badge-primary">{currentStep}/{STEPS.length}</span>
                    </div>

                    <div style={{ padding: '1rem 0', minHeight: 400 }}>
                        <CurrentStepComponent
                            data={formData}
                            updateData={updateFormData}
                            disabled={isFinalized}
                        />
                    </div>

                    <div className="questionario-actions">
                        <button className="btn btn-secondary" onClick={prevStep} disabled={currentStep === 1 || saving}>
                            ← {t('questionnaire.previous')}
                        </button>

                        {!isFinalized && (
                            <button className="btn btn-outline" onClick={saveCurrentStep} disabled={saving}>
                                {saving ? t('questionnaire.saving') : '💾 ' + t('common.save')}
                            </button>
                        )}

                        {currentStep < STEPS.length ? (
                            <button className="btn btn-primary" onClick={nextStep} disabled={saving}>
                                {t('questionnaire.next')} →
                            </button>
                        ) : (
                            !isFinalized && (
                                <button className="btn btn-success" onClick={finalizarQuestionario} disabled={saving}>
                                    ✓ {t('questionnaire.finalize')}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

