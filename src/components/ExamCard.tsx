import Link from 'next/link';
import { Calendar, CheckCircle, Clock, AlertCircle, Building, ArrowRight } from 'lucide-react';
import { Exam } from '@/lib/types';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { generateGoogleCalendarLink } from '@/lib/calendar';
import { useLanguage } from '@/context/LanguageContext';

export function ExamCard({ exam }: { exam: Exam }) {
    const { t } = useLanguage();
    // Re-calculating status for the badge logic if needed, or using exam.status
    const isConfirmed = exam.status === 'confirmed' || exam.status === 'released';

    return (
        <div className="group relative bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary capitalize">
                    {exam.category}
                </span>
                {isConfirmed ? (
                    <span className="inline-flex items-center text-green-600 dark:text-green-400 text-xs font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3 mr-1" /> {formatDate(exam.examDate)}
                    </span>
                ) : (
                    <span className="inline-flex items-center text-muted-foreground text-xs font-medium px-2 py-1 bg-muted rounded-full">
                        <Clock className="w-3 h-3 mr-1" /> Expected: {formatDate(exam.examDate)}
                    </span>
                )}
            </div>

            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {exam.title}
            </h3>

            <div className="flex items-center text-muted-foreground text-sm mb-6 mt-auto pt-2">
                <Building className="w-4 h-4 mr-2 text-primary/60" />
                <span className="line-clamp-1">{exam.organization}</span>
            </div>

            <div className="flex gap-3 mt-4 pt-4 border-t border-border/30">
                <Link href={`/exam/${exam.id}`} className="flex-1">
                    <Button variant="default" className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all duration-300 group-hover:shadow-primary/20">
                        {t('exam.viewDetails')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
                <div className="flex-shrink-0">
                    <a
                        href={generateGoogleCalendarLink(exam)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                    >
                        <Button variant="secondary" size="icon" className="rounded-xl hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors bg-secondary text-secondary-foreground" title={t('exam.addToCalendar')}>
                            <Calendar className="w-5 h-5" />
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
