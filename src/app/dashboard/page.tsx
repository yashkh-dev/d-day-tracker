"use client"

import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { Exam } from "@/lib/types"
import { ExamCard } from "@/components/ExamCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2, BookOpen, AlertCircle } from "lucide-react"

export default function DashboardPage() {
    const { user, savedExams } = useAuth()
    const [exams, setExams] = useState<Exam[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/exams')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setExams(data.data.filter((exam: Exam) => savedExams.includes(exam.id)))
                }
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }, [savedExams])

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
                <p className="text-muted-foreground mb-8">You need to be logged in to view your dashboard.</p>
                <Link href="/">
                    <Button>Return Home</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Welcome, {user.name} 👋</h1>
                    <p className="text-muted-foreground mt-1">Here is your exam preparation overview.</p>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-lg text-primary font-medium">
                    {savedExams.length} Exams Tracked
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    Your Saved Exams
                </h2>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                ) : exams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exams.map(exam => (
                            <ExamCard key={exam.id} exam={exam} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-muted/30 rounded-xl p-8 text-center border border-dashed border-border">
                        <p className="text-muted-foreground mb-4">You haven't saved any exams yet.</p>
                        <Link href="/exams">
                            <Button variant="outline">Browse Exams</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
