
export enum TestCategory {
  MBTI = 'MBTI',
  DISC = 'DISC',
  LOGIC = 'LOGIC',
  INTEREST = 'INTEREST'
}

export interface Option {
  id: string;
  text: string;
  weight?: Record<string, number>; // e.g. { E: 1, I: 0 }
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  category: TestCategory;
}

export interface TestModule {
  id: TestCategory;
  title: string;
  description: string;
  icon: string;
  isPremium: boolean;
  questions: Question[];
}

export interface TestResult {
  id: string;
  categoryId: TestCategory;
  timestamp: number;
  scores: Record<string, number>;
  analysis: string;
  isUnlocked: boolean;
}

export interface UserStats {
  completedTests: number;
  unlockedReports: number;
  lastTestDate: number | null;
}
