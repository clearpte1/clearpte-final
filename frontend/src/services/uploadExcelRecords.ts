import axios from "axios";
interface UploadResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const API_BASE = process.env.REACT_APP_API_URL;

export class UploadExcelRecordsService {
  private async uploadRecords(
    endpoint: string,
    data: any[]
  ): Promise<UploadResponse> {
    try {
      await axios.post(`${API_BASE}/upload/${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return {
        success: true,
        message: `${endpoint} uploaded successfully`,
      };
    } catch (error) {
      console.error("Error uploading to API:", error);
      return {
        success: false,
        error: "Failed to upload questions to server",
      };
    }
  }

  async uploadReadAloudRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-read-aloud-questions", data);
  }

  async uploadRepeatSentenceRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-repeat-sentence-questions", data);
  }

  async uploadDescribeImageRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-describe-image-questions", data);
  }

  async uploadRetellLectureRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-retell-lecture-questions", data);
  }

  async uploadAnswerShortQuestionRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-answer-short-question-questions", data);
  }

  // writing
  async uploadSummarizeTextRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-summarize-text-questions", data);
  }

  async uploadWriteEssayRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-write-essay-questions", data);
  }

  // reading
  async uploadFillInTheBlanksRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-reading-fill-blanks-questions", data);
  }

  async uploadReadingFillInTheBlanksRecords(
    data: any[]
  ): Promise<UploadResponse> {
    return this.uploadRecords("upload-reading-fill-blanks-rw-questions", data);
  }

  async uploadMultipleChoiceMultipleRecords(
    data: any[]
  ): Promise<UploadResponse> {
    return this.uploadRecords(
      "upload-multiple-choice-multiple-questions",
      data
    );
  }

  async uploadMultipleChoiceSingleRecords(
    data: any[]
  ): Promise<UploadResponse> {
    return this.uploadRecords("upload-multiple-choice-single-questions", data);
  }

  async uploadReorderParagraphRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-reorder-paragraphs-questions", data);
  }

  // listening
  async uploadSummarizeSpokenTextRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-summarize-spoken-text-questions", data);
  }

  async uploadListeningMultipleChoiceMultipleRecords(
    data: any[]
  ): Promise<UploadResponse> {
    return this.uploadRecords(
      "upload-listening-multiple-choice-multiple-questions",
      data
    );
  }

  async uploadListeningMultipleChoiceSingleRecords(
    data: any[]
  ): Promise<UploadResponse> {
    return this.uploadRecords(
      "upload-listening-multiple-choice-single-questions",
      data
    );
  }

  async uploadListeningFillInTheBlanksRecords(
    data: any[]
  ): Promise<UploadResponse> {
    return this.uploadRecords("upload-listening-fill-blanks-questions", data);
  }

  async uploadHighlightCorrectSummaryRecords(
    data: any[]
  ): Promise<UploadResponse> {
    return this.uploadRecords(
      "upload-highlight-correct-summary-questions",
      data
    );
  }

  async uploadHighlightIncorrectWordsRecords(
    data: any[]
  ): Promise<UploadResponse> {
    return this.uploadRecords(
      "upload-highlight-incorrect-words-questions",
      data
    );
  }

  async uploadSelectMissingWordRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-select-missing-word-questions", data);
  }

  async uploadWriteFromDictationRecords(data: any[]): Promise<UploadResponse> {
    return this.uploadRecords("upload-write-from-dictation-questions", data);
  }
}
