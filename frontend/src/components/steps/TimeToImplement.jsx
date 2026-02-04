import { useLanguage } from '../../context/LanguageContext';

export default function TimeToImplement({ section, field, value, onChange, disabled, visible }) {
    const { t } = useLanguage();

    if (!visible) return null;

    return (
        <div className="form-group" style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(59, 130, 246, 0.05)',
            borderLeft: '4px solid var(--primary-500)',
            borderRadius: '0 0.5rem 0.5rem 0',
            animation: 'fadeIn 0.3s ease-in-out'
        }}>
            <label className="form-label required" style={{ fontSize: '0.875rem', color: 'var(--primary-400)' }}>
                {t('questionnaire.timeToImplement')}
            </label>
            <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <input
                        type="text"
                        name={`${field}_tempo`}
                        className="form-input"
                        placeholder={t('questionnaire.timeToImplementPlaceholder')}
                        value={value || ''}
                        onChange={(e) => onChange(section, { [`${field}_tempo`]: e.target.value })}
                        disabled={disabled}
                        required
                    />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <input
                        type="date"
                        name={`${field}_data`}
                        className="form-input"
                        value={value?.split('|')[1] || ''}
                        onChange={(e) => {
                            const textValue = value?.split('|')[0] || '';
                            onChange(section, { [`${field}_tempo`]: `${textValue}|${e.target.value}` });
                        }}
                        disabled={disabled}
                        required
                    />
                </div>
            </div>
        </div>
    );
}
