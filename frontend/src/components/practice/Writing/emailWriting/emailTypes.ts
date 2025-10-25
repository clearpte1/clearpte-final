import { BaseTopic } from "../../common/types";

export interface EmailScenario extends BaseTopic{
    id: number;
    title: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    timeLimit: number; // minutes
    wordLimit: { min: number; max?: number };
    situation: string;
    keyPoints: string[];
    sampleEmail: string;
    tags: string[];
    isNew: boolean;
    isMarked: boolean;
    pracStatus: 'Undone' | 'Done' | 'In Progress';
    hasExplanation: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface EmailResponse {
    id: string;
    scenarioId: number;
    emailText: string;
    wordCount: number;
    score: number;
    submittedAt: string;
  }
  
  export interface UserEmail {
    id: string;
    name: string;
    email: string;
  }