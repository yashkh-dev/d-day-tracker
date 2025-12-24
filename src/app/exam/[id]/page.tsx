import { getExams } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getExamNews } from '@/lib/news';
import { ExamDetailsContent } from '@/components/ExamDetailsContent';

export async function generateStaticParams() {
    const exams = await getExams();
    return exams.map((exam) => ({
        id: exam.id,
    }));
}

export default async function ExamDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const exams = await getExams();
    const exam = exams.find(e => e.id === id);

    // Fetch news based on exam title
    const news = exam ? await getExamNews(exam.title) : [];

    if (!exam) {
        notFound();
    }

    return (
        <ExamDetailsContent exam={exam} news={news} />
    );
}
