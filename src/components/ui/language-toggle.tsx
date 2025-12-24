"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"
import { Languages } from "lucide-react"

export function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage()

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-bold relative w-12"
        >
            {language === 'en' ? 'HI' : 'EN'}
            <span className="sr-only">Toggle language</span>
        </Button>
    )
}
