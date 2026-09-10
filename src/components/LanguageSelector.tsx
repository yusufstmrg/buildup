import React, { useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';
import { Language, SUPPORTED_LANGUAGES } from '../lib/i18n';

export function LanguageSelector() {
  const { language, setLanguage } = useBuildUp();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-surface border border-brand-border text-brand-textMuted hover:text-brand-textMain hover:border-brand-gold/50 transition-colors"
        title="Change Language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-bold uppercase">{language}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-brand-navy border border-brand-border rounded-xl shadow-xl overflow-hidden z-50">
          <div className="py-1">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left text-xs font-medium hover:bg-brand-surface transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <span className={language === lang.code ? 'text-brand-gold font-bold' : 'text-brand-textMain'}>
                    {lang.name}
                  </span>
                </div>
                {language === lang.code && <Check className="w-4 h-4 text-brand-gold" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
