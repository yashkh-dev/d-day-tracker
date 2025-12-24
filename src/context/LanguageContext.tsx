"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { dictionary, Locale } from '@/lib/dictionary';

interface LanguageContextType {
    language: Locale;
    toggleLanguage: () => void;
    t: (key: keyof typeof dictionary['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Locale>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Locale;
        if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
            setLanguage(savedLang);
        }
        setMounted(true);
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'hi' : 'en';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
    };

    const t = (key: keyof typeof dictionary['en']) => {
        return dictionary[language][key] || key;
    };

    // We render local state only after mount to avoid hydration mismatch
    // But we want content to be visible.
    // The content will be in English by default on server.
    // On client, if language is hi, it will switch.

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        return {
            language: 'en' as Locale,
            toggleLanguage: () => { },
            t: (key: keyof typeof dictionary['en']) => dictionary['en'][key] || key
        };
    }
    return context;
}
