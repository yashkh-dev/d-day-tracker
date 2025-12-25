export type ExamStatus = 'confirmed' | 'tentative' | 'predicted' | 'released';
export type ExamCategory = 'UPSC' | 'SSC' | 'Railways' | 'Banking' | 'Teaching' | 'Defense' | 'Engineering' | 'Medical' | 'Management' | 'Law' | 'State PSC' | 'Other';

export interface Exam {
  id: string;
  title: string;
  organization: string; // e.g. Union Public Service Commission
  category: ExamCategory;
  examDate: string; // ISO 8601 date string YYYY-MM-DD
  status: ExamStatus;
  description: string;
  applicationStartDate?: string;
  applicationEndDate?: string;
  officialNotificationUrl?: string;
  syllabusUrl?: string;
  admitCardDate?: string;
  resultDate?: string;
  tags?: string[];
  isPopular?: boolean; // To feature on homepage
  // Extended Details
  eligibility?: {
    ageLimit?: string;
    qualification?: string;
    experience?: string;
  };
  applicationFee?: string;
  examPattern?: string; // Markdown supported
  importantInstructions?: string[]; // TnC
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}
