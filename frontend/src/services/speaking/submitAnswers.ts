import axios from "axios";
import { data } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_URL;

export const compareAudio = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE}/api/compare-audio`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error comparing audio:", error);
    throw error;
  }
};

export const describeImageSubmitAnswers = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE}/api/evaluate-from-image`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting describe image answers:", error);
    throw error;
  }
};

export const reTellLectureSubmitAnswers = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE}/api/evaluate-retell`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting re-tell lecture answers:", error);
    throw error;
  }
};

export const answerShortQuestionSubmitAnswers = async (
  data: any
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE}/api/evaluate-short-answer`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting answer short question answers:", error);
    throw error;
  }
};
