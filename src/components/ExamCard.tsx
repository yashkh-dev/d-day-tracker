import Link from 'next/link';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Exam } from '@/lib/types';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const StatusIcon = ({ status }: { status: Exam['status'] }) => {
    switch (status) {
        case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-500" />;
        case 'tentative': return <Clock className="w-4 h-4 text-yellow-500" />;
        case 'predicted': return <AlertCircle className="w-4 h-4 text-blue-500" />;
        case 'released': return <CheckCircle className="w-4 h-4 text-purple-500" />;
        default: return null;
    }
};

const StatusBadge = ({ status }: { status: Exam['status'] }) => {
    const styles: Record<Exam['status'], string> = {
        confirmed: 'bg-green-100 text-green-700 border-green-200',
        tentative: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        predicted: 'bg-blue-100 text-blue-700 border-blue-200',
        released: 'bg-purple-100 text-purple-700 border-purple-200',
    };

    return (
        <span className={cn("text-xs px-2 py-1 rounded-full border flex items-center gap-1 font-medium capitalize", styles[status])}>
            <StatusIcon status={status} />
            {status}
        </span>
    );
};

export function ExamCard({ exam }: { exam: Exam }) {
    return (
        <div className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-500/50">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">
                        {exam.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {exam.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{exam.organization}</p>
                </div>
                <StatusBadge status={exam.status} />
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Exam Date: <span className="font-medium text-gray-900">{formatDate(exam.examDate)}</span></span>
                </div>

                {exam.applicationStartDate && (
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                        Apply: {formatDate(exam.applicationStartDate)} - {formatDate(exam.applicationEndDate)}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between mt-auto">
                <Link href={`/exam/${exam.id}`} className="w-full">
                    <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}
