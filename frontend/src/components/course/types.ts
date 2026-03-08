/**
 * Course Types
 */

export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  completed: boolean;
  locked: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessonsCount: number;
  duration: number; // in minutes
  lessons?: Lesson[];
}
