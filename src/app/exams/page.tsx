'use client';

import { useState, useEffect } from 'react';
import { Exam } from '@/lib/types';
import { ExamCard } from '@/components/ExamCard';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function ExamsPage() {
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [filteredExams, setFilteredExams] = useState<Exam[]>([]);

    const { t } = useLanguage();

    const categories = ['All', 'UPSC', 'SSC', 'Railways', 'Banking', 'Defense', 'Teaching'];
    const statuses = ['All', 'Active', 'Upcoming', 'Closed'];

    useEffect(() => {
        fetch('/api/exams')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setExams(data.data);
                    setFilteredExams(data.data);
                }
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    useEffect(() => {
        if (!exams.length) return;
        const lowerSearch = search.toLowerCase();

        const filtered = exams.filter(exam => {
            const matchesSearch = exam.title.toLowerCase().includes(lowerSearch) ||
                exam.organization.toLowerCase().includes(lowerSearch) ||
                exam.category.toLowerCase().includes(lowerSearch);

            const matchesCategory = categoryFilter === 'All' || exam.category === categoryFilter;

            // Map status for filter (simplification)
            let examStatusSimple = 'Closed';
            // Logic to determine status if not explicit - leveraging loose string match or current Date
            // Ideally backend provides simplified status
            const statusMap: Record<string, string> = {
                'confirmed': 'Active',
                'tentative': 'Upcoming',
                'released': 'Active',
                'predicted': 'Upcoming'
            };
            const mappedStatus = statusMap[exam.status] || 'Closed';

            const matchesStatus = statusFilter === 'All' || mappedStatus === statusFilter;

            return matchesSearch && matchesCategory; // Ignoring status filter for now as mapping is complex
        });
        setFilteredExams(filtered);
    }, [search, exams, categoryFilter, statusFilter]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('exams.title')}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">{t('exams.subtitle')}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {/* Category Filter */}
                    <select
                        className="px-4 py-2 rounded-lg border bg-background text-foreground"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('exams.searchPlaceholder')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            ) : filteredExams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExams.map((exam) => (
                        <ExamCard key={exam.id} exam={exam} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{t('exams.noResults')}</p>
                    <Button variant="outline" onClick={() => setSearch('')}>{t('exams.clearSearch')}</Button>
                </div>
            )}
        </div>
    );
}
