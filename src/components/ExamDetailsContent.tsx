"use client"

import { Exam, NewsItem } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, Building, ExternalLink, FileText, CheckCircle, Newspaper, AlertCircle, Clock } from 'lucide-react';
import { generateGoogleCalendarLink } from '@/lib/calendar';
import { useLanguage } from '@/context/LanguageContext';

interface ExamDetailsContentProps {
    exam: Exam;
    news: NewsItem[]; // Assuming NewsItem, check types
}

import { useAuth } from '@/context/AuthContext';
import { Bookmark, BookmarkCheck, PlayCircle, BookOpen } from 'lucide-react';

// ... imports ...

export function ExamDetailsContent({ exam, news }: ExamDetailsContentProps) {
    const { t } = useLanguage();
    const { user, isExamSaved, toggleSaveExam, login } = useAuth();
    const isConfirmed = exam.status === 'confirmed' || exam.status === 'released';
    const isSaved = isExamSaved(exam.id);

    const handleSave = () => {
        if (!user) {
            login(); // Simple auto-login for demo, normally redirect
            return;
        }
        toggleSaveExam(exam.id);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/exams">
                <Button variant="ghost" className="mb-6 pl-0 text-gray-600 hover:text-blue-600 group dark:text-gray-400 dark:hover:text-blue-400">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> {t('details.back')}
                </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-full hover:bg-primary/10 ${isSaved ? 'text-primary' : 'text-muted-foreground'}`}
                                onClick={handleSave}
                                title={isSaved ? "Unsave Exam" : "Save Exam"}
                            >
                                {isSaved ? <BookmarkCheck className="w-6 h-6 fill-primary" /> : <Bookmark className="w-6 h-6" />}
                            </Button>
                        </div>

                        <div className="flex items-center gap-3 mb-4 pr-12">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold capitalize">{exam.category}</span>
                            {isConfirmed && <span className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full"><CheckCircle className="w-4 h-4 mr-1" /> {t('details.dateConfirmed')}</span>}
                            <div className="ml-auto hidden sm:block">
                                <a
                                    href={generateGoogleCalendarLink(exam)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button size="sm" variant="outline" className="gap-2 text-primary border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                                        <Calendar className="w-4 h-4" /> {t('exam.addToCalendar')}
                                    </Button>
                                </a>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">{exam.title}</h1>
                        <div className="flex items-center text-muted-foreground mb-6">
                            <Building className="w-5 h-5 mr-2" />
                            <span className="text-lg">{exam.organization}</span>
                        </div>

                        <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground">
                            <h3 className="text-xl font-bold text-foreground mb-2">{t('details.about')}</h3>
                            <p>{exam.description}</p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {exam.officialNotificationUrl && (
                                <Link href={exam.officialNotificationUrl} target="_blank">
                                    <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                                        {t('details.officialNotification')} <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </Link>
                            )}
                            {exam.syllabusUrl && (
                                <Link href={exam.syllabusUrl} target="_blank">
                                    <Button variant="outline" className="gap-2">
                                        {t('details.viewSyllabus')} <FileText className="w-4 h-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Timeline / Important Dates */}
                    <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
                        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                            <Calendar className="w-6 h-6 mr-3 text-primary" />
                            {t('details.importantDates')}
                        </h2>

                        <div className="space-y-6 relative ml-2">
                            <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-border ml-[7px]"></div>

                            {/* Exam Date */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm ring-1 ring-border"></div>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('exam.date')}</p>
                                <p className="text-lg font-bold text-foreground">{formatDate(exam.examDate)}</p>
                            </div>

                            {/* Applications */}
                            {exam.applicationStartDate && (
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-green-500 border-4 border-background shadow-sm ring-1 ring-border"></div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('details.applicationWindow')}</p>
                                    <p className="text-base font-semibold text-foreground">
                                        {formatDate(exam.applicationStartDate)} — {formatDate(exam.applicationEndDate)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Study Videos (YouTube Embeds) */}
                    <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
                        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                            <PlayCircle className="w-6 h-6 mr-3 text-red-600" />
                            Free Study Resources
                        </h2>
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted relative">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(exam.title + ' preparation strategy')}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4 text-center">
                            Curated strategy and preparation videos for {exam.title}
                        </p>
                    </div>

                    {/* News Section */}
                    <div className="bg-transparent">
                        <h2 className="text-2xl font-bold text-foreground flex items-center mb-6">
                            <Newspaper className="w-6 h-6 mr-3 text-primary" />
                            {t('news.latestUpdates')}
                        </h2>

                        {news.length > 0 ? (
                            <div className="grid gap-4">
                                {news.map((item, index) => (
                                    <div key={index} className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="text-lg font-bold text-foreground mb-2">
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline transition-colors">
                                                {item.title}
                                            </a>
                                        </h3>
                                        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{item.description}</p>
                                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                                            <span className="font-semibold px-2 py-1 bg-muted rounded">{item.source}</span>
                                            <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-muted/30 p-8 rounded-xl text-center text-muted-foreground">
                                {t('news.noUpdates')}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                        <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" /> {t('details.studyResources')}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">{t('details.studyResourcesDesc').replace('your exam', exam.title)}</p>

                        <a
                            href={`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(exam.title + ' preparation books')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="secondary" className="w-full bg-background text-primary hover:bg-primary/10 border border-primary/20">
                                {t('details.findBooks')} <ExternalLink className="w-3 h-3 ml-2" />
                            </Button>
                        </a>
                    </div>

                    {/* Tags */}
                    <div className="bg-card rounded-xl p-6 border border-border/50">
                        <h3 className="font-bold text-foreground mb-4">{t('details.relatedTags')}</h3>
                        <div className="flex flex-wrap gap-2">
                            {exam.tags?.map(tag => (
                                <span key={tag} className="text-xs font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full">{tag}</span>
                            ))}
                            <span className="text-xs font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full">{exam.category}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
