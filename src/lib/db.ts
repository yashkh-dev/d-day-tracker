import { promises as fs } from 'fs';
import path from 'path';
import { Exam } from './types';

const dataDirectory = path.join(process.cwd(), 'data');
const examsFile = path.join(dataDirectory, 'exams.json');

export async function getExams(): Promise<Exam[]> {
    try {
        const fileContents = await fs.readFile(examsFile, 'utf8');
        const exams: Exam[] = JSON.parse(fileContents);
        // Sort by date ascending (closest exams first)
        return exams.sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime());
    } catch (error) {
        console.error("Error reading exam data:", error);
        return [];
    }
}

export async function getExamById(id: string): Promise<Exam | undefined> {
    const exams = await getExams();
    return exams.find((exam) => exam.id === id);
}
