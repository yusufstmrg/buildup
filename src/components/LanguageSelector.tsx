import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';
import { Language } from '../lib/i18n';

const LANGUAGE_LIST: { code: Language; name: string; localName: string; flag: string }[] = [
  { code: 'id', name: 'Bahasa Indonesia', localName: 'Indonesia (Utama)', flag: '🇮🇩' },
  { code: 'en', name: 'English', localName: 'English (Global)', flag: '🇬🇧' },
  { code: 'zh', name: 'Chinese', localName: '中文 (繁简)', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', localName: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', localName: 'العربية', flag: '🇸🇦' }
];

interface Props {
  className?: string;
  variant?: 'compact' | 'full';
}

export function LanguageSelector({ className = '', variant = 'compact' }: Props) {
  const { language, setLanguage } = useBuildUp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGE_LIST.find((l) => l.code === language) || LANGUAGE_LIST[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 hover:border-brand-gold/50 rounded-lg transition-all shadow-sm"
        title="Pilih Bahasa / Change Language"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="uppercase font-bold tracking-wider text-[11px] text-brand-gold">
          {currentLang.code}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 bg-slate-900 border border-slate-700/90 rounded-xl shadow-2xl py-1.5 z-50 animate-fade-in backdrop-blur-xl">
          <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Bahasa / Language
          </div>
          {LANGUAGE_LIST.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  isSelected
                    ? 'bg-brand-gold/15 text-brand-gold font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <div className="text-left">
                    <p className="font-semibold">{lang.localName}</p>
                    <p className="text-[10px] text-slate-400">{lang.name}</p>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-gold" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
