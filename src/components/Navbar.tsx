"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { BookOpen } from "lucide-react"
import { ModeToggle } from "./ui/mode-toggle"
import { LanguageToggle } from "./ui/language-toggle"
import { useLanguage } from "@/context/LanguageContext"

export function Navbar() {
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-foreground">D-Day Tracker</span>
                </Link>

                <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-200">{t('navbar.home')}</Link>
                    <Link href="/exams" className="px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-200">{t('navbar.exams')}</Link>
                    <Link href="/calendar" className="px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-200">{t('navbar.calendar')}</Link>
                    <Link href="/about" className="px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-200">{t('navbar.about')}</Link>
                </nav>

                <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <ModeToggle />
                    <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-accent text-muted-foreground hover:text-foreground">{t('navbar.login')}</Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20">{t('navbar.updates')}</Button>
                </div>
            </div>
        </header>
    )
}
