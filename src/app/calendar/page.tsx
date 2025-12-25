import { getExams } from "@/lib/db";
import { Exam } from "@/lib/types";
import { ExamCard } from "@/components/ExamCard";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

export const metadata = {
    title: 'Exam Calendar - D-Day Tracker',
    description: 'Timeline of upcoming government exams.',
};

export default async function CalendarPage() {
    const exams = await getExams();
    const now = new Date();

    // Group exams by Month Year
    const groupedExams = exams
        .filter(exam => new Date(exam.examDate) >= now) // Only upcoming or today
        .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())
        .reduce((acc, exam) => {
            const date = new Date(exam.examDate);
            const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(exam);
            return acc;
        }, {} as Record<string, Exam[]>);

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
                        <CalendarIcon className="w-8 h-8 text-primary" />
                        Exam Calendar
                    </h1>
                    <p className="text-muted-foreground text-lg">Timeline of upcoming confirmed and tentative exams.</p>
                </div>
            </div>

            {Object.keys(groupedExams).length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-medium text-foreground mb-2">No Upcoming Exams Found</h3>
                    <p className="text-muted-foreground">Check back later for updates or browse past exams.</p>
                </div>
            ) : (
                <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 space-y-12 pb-12">
                    {Object.entries(groupedExams).map(([monthYear, monthExams]) => (
                        <div key={monthYear} className="relative pl-8 md:pl-12">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background shadow-sm" />

                            <h2 className="text-2xl font-bold text-foreground mb-6 sticky top-20 bg-background/95 backdrop-blur py-2 z-10 inline-block pr-4 rounded-r-lg">
                                {monthYear}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {monthExams.map((exam) => (
                                    <ExamCard key={exam.id} exam={exam} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
