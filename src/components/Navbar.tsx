import Link from "next/link"
import { Button } from "./ui/button"
import { BookOpen } from "lucide-react"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-900">D-Day Tracker</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <Link href="/exams" className="hover:text-blue-600 transition-colors">All Exams</Link>
                    <Link href="/calendar" className="hover:text-blue-600 transition-colors">Calendar</Link>
                    <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
                </nav>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="hidden sm:flex">Log In</Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Get Updates</Button>
                </div>
            </div>
        </header>
    )
}
