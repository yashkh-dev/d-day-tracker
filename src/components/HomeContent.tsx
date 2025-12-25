"use client"

import { Exam } from "@/lib/types";
import { ExamCard } from "@/components/ExamCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/dictionary";

interface HomeContentProps {
    exams: Exam[];
}

export function HomeContent({ exams }: HomeContentProps) {
    const { t } = useLanguage();
    const now = new Date();

    // Trending Logic
    const trendingExams = exams
        .filter(e => e.isPopular && (new Date(e.examDate) >= now || (e.applicationEndDate && new Date(e.applicationEndDate) >= now)))
        .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())
        .slice(0, 3);

    // Categorization Logic
    const categories: (keyof typeof dictionary['en'])[] = [
        'category.UPSC', 'category.SSC', 'category.Banking', 'category.Defense',
        'category.Engineering', 'category.Medical', 'category.Management', 'category.Teaching'
    ];

    const getCategoryKey = (cat: string): keyof typeof dictionary['en'] | null => {
        if (cat === 'UPSC') return 'category.UPSC';
        if (cat === 'SSC') return 'category.SSC';
        if (cat === 'Banking') return 'category.Banking';
        if (cat === 'Defense') return 'category.Defense';
        if (cat === 'Engineering') return 'category.Engineering';
        if (cat === 'Medical') return 'category.Medical';
        if (cat === 'Management') return 'category.Management';
        if (cat === 'Teaching') return 'category.Teaching';
        if (cat === 'Law') return 'category.Law';
        return null;
    };

    const categorizedExams: Record<string, typeof exams> = ['UPSC', 'SSC', 'Banking', 'Defense', 'Engineering', 'Medical', 'Management', 'Teaching'].reduce((acc, category) => {
        acc[category] = exams
            .filter(e => e.category === category)
            .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())
            .slice(0, 4);
        return acc;
    }, {} as Record<string, typeof exams>);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
                {/* Abstract Gradient Background */}
                <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl -z-10" />
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Track Every Government Exam
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 text-foreground bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        {t('hero.title').split(':')[0]} <br className="hidden md:block" /> {t('hero.title').split(':')[1]}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t('hero.subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link href="/exams">
                            <Button size="lg" className="h-12 px-8 text-base rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                                {t('hero.browse')}
                            </Button>
                        </Link>
                        <Link href="/calendar">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full bg-background border-border hover:bg-accent text-foreground transition-all hover:scale-105">
                                {t('hero.calendar')}
                            </Button>
                        </Link>
                    </div>

                    <div className="max-w-md mx-auto relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <div className="relative bg-background p-1.5 rounded-full flex items-center border border-border hover:border-primary/50 transition-colors shadow-sm">
                            <Search className="text-muted-foreground ml-3 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={t('hero.search')}
                                className="bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground w-full px-3 py-2 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            {trendingExams.length > 0 && (
                <section className="py-20 container mx-auto px-4 border-b border-border/40">
                    <div className="flex items-center mb-10 gap-2">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">{t('trending.title')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {trendingExams.map(exam => (
                            <ExamCard key={exam.id} exam={exam} />
                        ))}
                    </div>
                </section>
            )}

            {/* Categorized Sections */}
            <section className="py-20 container mx-auto px-4 space-y-24">
                {['UPSC', 'SSC', 'Banking', 'Defense', 'Engineering', 'Medical', 'Teaching'].map(category => {
                    const categoryExams = categorizedExams[category];
                    if (!categoryExams || categoryExams.length === 0) return null;

                    const catKey = getCategoryKey(category);
                    const displayCategory = catKey ? t(catKey) : category;

                    return (
                        <div key={category}>
                            <div className="flex justify-between items-end mb-8 border-b border-border/40 pb-4">
                                <Link href={`/exams?category=${category}`} className="group">
                                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                                        <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                        {displayCategory} Exams
                                    </h2>
                                </Link>
                                <Link href={`/exams?category=${category}`} className="text-muted-foreground hover:text-primary font-medium text-sm flex items-center gap-1 transition-colors">
                                    {t('category.viewMore')} {displayCategory} <span className="text-lg">→</span>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {categoryExams.map(exam => (
                                    <ExamCard key={exam.id} exam={exam} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* CTA Section */}
            <section className="bg-muted/50 py-24 border-t border-border/40">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-12">{t('cta.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-primary">⚡</div>
                            <h3 className="font-bold text-xl mb-3 text-foreground">{t('cta.fast.title')}</h3>
                            <p className="text-muted-foreground leading-relaxed">{t('cta.fast.desc')}</p>
                        </div>
                        <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-primary">📅</div>
                            <h3 className="font-bold text-xl mb-3 text-foreground">{t('cta.calendar.title')}</h3>
                            <p className="text-muted-foreground leading-relaxed">{t('cta.calendar.desc')}</p>
                        </div>
                        <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-primary">🎯</div>
                            <h3 className="font-bold text-xl mb-3 text-foreground">{t('cta.dashboard.title')}</h3>
                            <p className="text-muted-foreground leading-relaxed">{t('cta.dashboard.desc')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
