export interface UserProgress {
  totalTests: number;
  completedTests: number;
  averageScore: number;
  strongAreas: string[];
  weakAreas: string[];
}

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'admin' | 'user';
  progress: UserProgress;
}
