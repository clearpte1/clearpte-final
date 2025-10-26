import axios from "axios";
import { ReadAloudQuestion } from "../../components/practice/speaking/read-a-loud/ReadAloudTypes";

const API_BASE = process.env.REACT_APP_API_URL;

export const fetchReadAloudQuestions = async (): Promise<
  ReadAloudQuestion[]
> => {
  try {
    const response = await axios.get<any[]>(
      `${API_BASE}/questions/read-aloud`
    );

    if (response.data && response.data.length > 0) {
      console.log("Fetched questions from API:", response.data);
      return response.data.map((q) => ({
        id: q.id,
        text: q.text,
        preparationTime: q.preparation_time,
        recordingTime: q.recording_time,
        difficulty: q.difficulty,
        category: q.category,
        tags: q.tags,
        expectedAnswer: q.expected_answer,
        isNew: false,
        isMarked: false,
        pracStatus: "Undone",
        hasExplanation: true,
        title: q.title,
        createdAt: q.created_at,
        updatedAt: q.updated_at,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching read aloud questions:", error);
    throw error;
  }
};

export const fetchReadAloudQuestionById = async (
  id: number
): Promise<ReadAloudQuestion> => {
  try {
    const response = await axios.get<any>(
      `${API_BASE}/questions/read-aloud/${id}`
    );
    return {
      id: response.data.id,
      text: response.data.text,
      preparationTime: response.data.preparation_time,
      recordingTime: response.data.recording_time,
      difficulty: response.data.difficulty,
      category: response.data.category,
      tags: response.data.tags,
      expectedAnswer: response.data.expected_answer,
      isNew: false,
      isMarked: false,
      pracStatus: "Undone",
      hasExplanation: true,
      title: response.data.title,
      createdAt: response.data.created_at,
      updatedAt: response.data.updated_at,
    };
  } catch (error) {
    console.error(`Error fetching read aloud question ${id}:`, error);
    throw error;
  }
};

export const fetchRepeatSentenceQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/repeat-sentence`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching repeat sentence questions:", error);
    throw error;
  }
};

export const fetchRepeatSentenceQuestionById = async (
  id: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/repeat-sentence/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching repeat sentence question ${id}:`, error);
    throw error;
  }
};

export const fetchDescribeImageQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/describe-image`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching describe image questions:", error);
    throw error;
  }
};

export const fetchDescribeImageQuestionById = async (
  id: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/describe-image/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching describe image question ${id}:`, error);
    throw error;
  }
};

export const fetchRetellLectureQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/retell-lecture`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching retell lecture questions:", error);
    throw error;
  }
};

export const fetchRetellLectureQuestionById = async (
  id: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/retell-lecture/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching retell lecture question ${id}:`, error);
    throw error;
  }
};

export const fetchAnswerShortQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE}/questions/answer-short`);
    return response.data;
  } catch (error) {
    console.error("Error fetching answer short questions:", error);
    throw error;
  }
};

export const fetchAnswerShortQuestionById = async (
  id: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/answer-short/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching answer short question ${id}:`, error);
    throw error;
  }
};
