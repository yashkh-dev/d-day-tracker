"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { BookOpen, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react"
import { ModeToggle } from "./ui/mode-toggle"
import { LanguageToggle } from "./ui/language-toggle"
import { useLanguage } from "@/context/LanguageContext"
import { useAuth } from "@/context/AuthContext"
import { LoginModal } from "./LoginModal"
import { useState, useRef, useEffect } from "react"

export function Navbar() {
    const { t } = useLanguage();
    const { user, login, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden sm:flex hover:bg-accent gap-2"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-4 h-4 text-primary" />
                                    )}
                                </div>
                                <span className="font-medium">{user.name.split(' ')[0]}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </Button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card border border-border ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-200">
                                    <div className="py-1">
                                        <div className="px-4 py-2 border-b border-border/50">
                                            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="group flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                            Dashboard
                                        </Link>
                                        <button
                                            className="group flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer"
                                            onClick={async () => {
                                                await logout();
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            <LogOut className="mr-3 h-4 w-4 text-red-600" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button onClick={() => setShowLoginModal(true)} variant="ghost" size="sm" className="hidden sm:flex hover:bg-accent text-muted-foreground hover:text-foreground">{t('navbar.login')}</Button>
                    )}

                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20">{t('navbar.updates')}</Button>
                </div>
            </div>

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={async () => {
                    await login();
                    setShowLoginModal(false);
                }}
            />
        </header>
    )
}
