export type ExamStatus = 'confirmed' | 'tentative' | 'predicted' | 'released';

export interface Exam {
    id: string;
    title: string;
    organization: string;
    category: string;
    examDate: string;
    status: ExamStatus;
    description: string;
    applicationStartDate?: string;
    applicationEndDate?: string;
    officialNotificationUrl?: string;
    tags: string[];
    isPopular?: boolean;
}
