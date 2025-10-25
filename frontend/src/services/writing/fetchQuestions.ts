import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL;

export const fetchSummarizeTextQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/questions/summarize-text`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching summarize text questions:", error);
    throw error;
  }
};

export const fetchSummarizeTextQuestionById = async (
  id: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/questions/summarize-text/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching summarize text question ${id}:`, error);
    throw error;
  }
};

export const fetchWriteEssayQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE}/api/questions/writing-essay`);
    return response.data;
  } catch (error) {
    console.error("Error fetching write essay questions:", error);
    throw error;
  }
};

export const fetchWriteEssayQuestionById = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/questions/writing-essay/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching write essay question ${id}:`, error);
    throw error;
  }
};
