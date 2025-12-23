import { NextResponse } from 'next/server';
import { getExams } from '@/lib/db';
import { ApiResponse, Exam } from '@/lib/types';

export async function GET() {
    try {
        const exams = await getExams();
        const response: ApiResponse<Exam[]> = {
            success: true,
            data: exams,
        };
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch exams' },
            { status: 500 }
        );
    }
}
