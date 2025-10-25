import { api } from './api';
import { TestResult, UserProgress, PaginatedResponse, PteSkill } from '../types';

export interface ProgressStats {
  totalTests: number;
  averageScore: number;
  skillProgress: Record<PteSkill, number>;
  recentTests: TestResult[];
  weakAreas: string[];
  strongAreas: string[];
  timeSpentToday: number;
  streakDays: number;
}

export interface StudyPlan {
  id: string;
  userId: string;
  targetScore: number;
  currentLevel: string;
  weeklyGoal: number;
  recommendations: StudyRecommendation[];
  createdAt: string;
  updatedAt: string;
}

export interface StudyRecommendation {
  skill: PteSkill;
  questionType: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  estimatedTime: number; // minutes
}

export const progressService = {
  // Get user progress overview
  getProgress: async () => {
    return await api.get<ProgressStats>('/progress');
  },

  // Get detailed progress by skill
  getSkillProgress: async (skill: PteSkill) => {
    return await api.get<any>(`/progress/skill/${skill}`);
  },

  // Get test history
  getTestHistory: async (page = 1, limit = 20) => {
    return await api.get<PaginatedResponse<TestResult>>('/progress/history', { page, limit });
  },

  // Get performance analytics
  getAnalytics: async (timeframe: 'week' | 'month' | 'year' = 'month') => {
    return await api.get<any>(`/progress/analytics`, { timeframe });
  },

  // Update user progress
  updateProgress: async (progressData: Partial<UserProgress>) => {
    return await api.put<UserProgress>('/progress', progressData);
  },

  // Generate AI study plan
  generateStudyPlan: async (targetScore: number, timeframe: number) => {
    return await api.post<StudyPlan>('/progress/study-plan', { targetScore, timeframe });
  },

  // Get current study plan
  getStudyPlan: async () => {
    return await api.get<StudyPlan>('/progress/study-plan');
  },

  // Update study plan
  updateStudyPlan: async (planId: string, updates: Partial<StudyPlan>) => {
    return await api.put<StudyPlan>(`/progress/study-plan/${planId}`, updates);
  },

  // Get weakness analysis
  getWeaknessAnalysis: async () => {
    return await api.get<any>('/progress/analysis/weakness');
  },

  // Get strength analysis  
  getStrengthAnalysis: async () => {
    return await api.get<any>('/progress/analysis/strength');
  },

  // Get daily practice stats
  getDailyStats: async (date?: string) => {
    return await api.get<any>('/progress/daily', { date });
  },

  // Log practice session
  logPracticeSession: async (sessionData: {
    skill: PteSkill;
    questionType: string;
    timeSpent: number;
    questionsAttempted: number;
    averageScore: number;
  }) => {
    return await api.post('/progress/session', sessionData);
  },

  // Get leaderboard
  getLeaderboard: async (skill?: PteSkill, timeframe: 'week' | 'month' | 'all' = 'month') => {
    return await api.get<any>('/progress/leaderboard', { skill, timeframe });
  },

  // Compare with other users
  getComparison: async (skill?: PteSkill) => {
    return await api.get<any>('/progress/comparison', { skill });
  },
};
