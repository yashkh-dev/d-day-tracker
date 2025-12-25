import { promises as fs } from 'fs';
import path from 'path';
import { Exam } from './types';

export async function getExams(): Promise<Exam[]> {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'exams.json'), 'utf8');
    const exams: Exam[] = JSON.parse(fileContents);
    return exams;
}
