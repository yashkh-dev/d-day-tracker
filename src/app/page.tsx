import { getExams } from "@/lib/db";
import { ExamCard } from "@/components/ExamCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const exams = await getExams();
  const now = new Date();

  // Trending Logic: Popular exams that are in the future or have ongoing applications
  // Sort by date proximity (soonest first)
  const trendingExams = exams
    .filter(e => e.isPopular && (new Date(e.examDate) >= now || (e.applicationEndDate && new Date(e.applicationEndDate) >= now)))
    .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())
    .slice(0, 3); // Top 3 trending

  // Categorization Logic
  const categories = ['UPSC', 'SSC', 'Banking', 'Defense'];
  const categorizedExams: Record<string, typeof exams> = categories.reduce((acc, category) => {
    acc[category] = exams
      .filter(e => e.category === category)
      .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()) // Sort by date
      .slice(0, 4); // Limit to 4 per category for visual balance
    return acc;
  }, {} as Record<string, typeof exams>);

  // Also catch 'Other' or significantly important exams not in main categories if needed, 
  // but for now stick to requested structure.

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            D-Day Tracker: <br className="hidden md:block" /> Track Every Government Exam
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-10">
            Stay updated with confirmed dates, notifications, and application deadlines for UPSC, SSC, Railways, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/exams">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                Browse All Exams
              </Button>
            </Link>
            <Link href="/calendar">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white font-semibold">
                View Calendar
              </Button>
            </Link>
          </div>

          <div className="mt-12 max-w-md mx-auto bg-white/10 backdrop-blur-md p-2 rounded-xl flex items-center border border-white/20">
            <Search className="text-white/70 ml-3 w-5 h-5" />
            <input
              type="text"
              placeholder="Search exams like 'UPSC 2026'..."
              className="bg-transparent border-none focus:ring-0 text-white placeholder-white/70 w-full px-3 py-2"
            />
          </div>
        </div>
      </section>

      {/* Trending Section */}
      {trendingExams.length > 0 && (
        <section className="py-12 container mx-auto px-4 border-b border-gray-200">
          <div className="flex items-center mb-8 gap-2">
            <span className="text-2xl">🔥</span>
            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingExams.map(exam => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </section>
      )}

      {/* Categorized Sections */}
      <section className="py-16 container mx-auto px-4 space-y-16">
        {categories.map(category => {
          const categoryExams = categorizedExams[category];
          if (!categoryExams || categoryExams.length === 0) return null;

          return (
            <div key={category}>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3">{category} Exams</h2>
                <Link href={`/exams?category=${category}`} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View more {category} &rarr;
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
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why use D-Day Tracker?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">Fast Updates</h3>
              <p className="text-gray-600">Get notified as soon as official notifications are released.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-bold text-lg mb-2">Accurate Calendar</h3>
              <p className="text-gray-600">Track exams, admit cards, and results on a unified timeline.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-lg mb-2">Focused dashboard</h3>
              <p className="text-gray-600">Filter by category to see only the exams that matter to you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
