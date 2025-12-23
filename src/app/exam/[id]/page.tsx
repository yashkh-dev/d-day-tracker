import { getExams } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, Building, ExternalLink, FileText, CheckCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const exams = await getExams();
    return exams.map((exam) => ({
        id: exam.id,
    }));
}

export default async function ExamDetailsPage({ params }: { params: { id: string } }) {
    const exams = await getExams();
    const exam = exams.find(e => e.id === params.id);

    if (!exam) {
        notFound();
    }

    // Calculate status color again for detail view (or reuse component if separated)
    const isConfirmed = exam.status === 'confirmed' || exam.status === 'released';

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/exams">
                <Button variant="ghost" className="mb-6 pl-0 text-gray-600 hover:text-blue-600 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Exams
                </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">{exam.category}</span>
                            {isConfirmed && <span className="flex items-center text-green-600 text-sm font-medium"><CheckCircle className="w-4 h-4 mr-1" /> Date Confirmed</span>}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{exam.title}</h1>
                        <div className="flex items-center text-gray-600 mb-6">
                            <Building className="w-5 h-5 mr-2" />
                            <span className="text-lg">{exam.organization}</span>
                        </div>

                        <div className="prose prose-blue max-w-none text-gray-600">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">About the Exam</h3>
                            <p>{exam.description}</p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {exam.officialNotificationUrl && (
                                <Link href={exam.officialNotificationUrl} target="_blank">
                                    <Button className="gap-2">
                                        Official Notification <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </Link>
                            )}
                            {exam.syllabusUrl && (
                                <Link href={exam.syllabusUrl} target="_blank">
                                    <Button variant="outline" className="gap-2">
                                        View Syllabus <FileText className="w-4 h-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Timeline / Important Dates */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                            Important Dates
                        </h2>

                        <div className="space-y-6 relative ml-2">
                            <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-200 ml-[7px]"></div>

                            {/* Exam Date */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm ring-1 ring-gray-200"></div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Exam Date</p>
                                <p className="text-lg font-bold text-gray-900">{formatDate(exam.examDate)}</p>
                            </div>

                            {/* Applications */}
                            {exam.applicationStartDate && (
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm ring-1 ring-gray-200"></div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Application Window</p>
                                    <p className="text-base font-semibold text-gray-900">
                                        {formatDate(exam.applicationStartDate)} — {formatDate(exam.applicationEndDate)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2">Study Resources</h3>
                        <p className="text-sm text-blue-700 mb-4">Get ready for {exam.title} with curated study materials.</p>
                        <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">Find Books & Mock Tests</Button>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4">Related Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {exam.tags?.map(tag => (
                                <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{tag}</span>
                            ))}
                            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{exam.category}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
