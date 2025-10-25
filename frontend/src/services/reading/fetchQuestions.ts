import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL;

export const fetchFillInTheBlanks = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/questions/reading-fill-blanks`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reading-fill-blanks text questions:", error);
    throw error;
  }
};

export const fetchReadingFillInTheBlanks = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/questions/reading-fill-blanks-rw`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching reading-fill-blanks-rw text questions:",
      error
    );
    throw error;
  }
};

export const fetchMultipleChoiceMultipleQuestions = async (): Promise<
  any[]
> => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/questions/multiple-choice-multiple`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching reading-multiple-choice-multiple questions:",
      error
    );
    throw error;
  }
};

export const fetchMultipleChoiceSingleQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/questions/multiple-choice-single`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching reading-multiple-choice-single questions:",
      error
    );
    throw error;
  }
};

export const fetchReorderParagraphQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/questions/reorder-paragraphs`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching reading-reorder-paragraphs questions:",
      error
    );
    throw error;
  }
};
