import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

export const submitSummarizeTextAnswers = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE}/api/evaluate-summary`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting summarize text answers:", error);
    throw error;
  }
};

export const submitEssayAnswers = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE}/api/evaluate-essay`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting essay answers:", error);
    throw error;
  }
};
