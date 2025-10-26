import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL;

export const fetchSummarizeSpokenTextQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/summarize-spoken-text`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching summarize spoken text questions:", error);
    throw error;
  }
};

export const fetchMultipleChoiceMultipleQuestions = async (): Promise<
  any[]
> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/listening-multiple-choice-multiple`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching listening-multiple-choice-multiple questions:",
      error
    );
    throw error;
  }
};

export const fetchMultipleChoiceSingleQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/listening-multiple-choice-single`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching listening-multiple-choice-single questions:",
      error
    );
    throw error;
  }
};

export const fetchFillInTheBlanksQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/listening-fill-blanks`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching listening-fill-blanks questions:", error);
    throw error;
  }
};

export const fetchHighlightCorrectSummaryQuestions = async (): Promise<
  any[]
> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/highlight-correct-summary`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching highlight-correct-summary questions:", error);
    throw error;
  }
};

export const fetchSelectMissingWordsQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/select-missing-word`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching select-missing-words questions:", error);
    throw error;
  }
};

export const fetchHighlightIncorrectWordsQuestions = async (): Promise<
  any[]
> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/highlight-incorrect-words`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching highlight-incorrect-words questions:", error);
    throw error;
  }
};

export const fetchWriteFromDictationQuestions = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_BASE}/questions/write-from-dictation`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching write-from-dictation questions:", error);
    throw error;
  }
};
