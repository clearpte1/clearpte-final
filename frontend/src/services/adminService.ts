import { UploadExcelRecordsService } from "./uploadExcelRecords";

interface AdminApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class AdminService {
  private static instance: AdminService;

  static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  // Generic CRUD operations for any module
  async getQuestions(
    module: string,
    subModule: string
  ): Promise<AdminApiResponse> {
    console.log(
      `🔍 GET Questions - Module: ${module}, SubModule: ${subModule}`
    );

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      data: [],
      message: `Successfully fetched ${subModule} questions from ${module} module`,
    };
  }

  async createQuestion(
    module: string,
    subModule: string,
    questionData: any
  ): Promise<AdminApiResponse> {
    console.log(
      `✅ CREATE Question - Module: ${module}, SubModule: ${subModule}`,
      questionData
    );

    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      data: { id: Date.now(), ...questionData },
      message: `Successfully created ${subModule} question in ${module} module`,
    };
  }

  async updateQuestion(
    module: string,
    subModule: string,
    questionId: string,
    questionData: any
  ): Promise<AdminApiResponse> {
    console.log(
      `📝 UPDATE Question - Module: ${module}, SubModule: ${subModule}, ID: ${questionId}`,
      questionData
    );

    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      data: { id: questionId, ...questionData },
      message: `Successfully updated ${subModule} question in ${module} module`,
    };
  }

  async deleteQuestion(
    module: string,
    subModule: string,
    questionId: string
  ): Promise<AdminApiResponse> {
    console.log(
      `DELETE Question - Module: ${module}, SubModule: ${subModule}, ID: ${questionId}`
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: `Successfully deleted ${subModule} question from ${module} module`,
    };
  }

  // Process Excel import with enhanced audio support
  async uploadExcel(
    module: string,
    subModule: string,
    file: File
  ): Promise<{
    success: boolean;
    message?: string;
    error?: string;
    data?: any;
  }> {
    try {
      const result = await this.processExcelFile(file, module, subModule);
      if (result.errors.length > 0) {
        return {
          success: false,
          error: `Validation errors found:\n${result.errors.join("\n")}`,
          data: { errors: result.errors },
        };
      }
      const uploadService = new UploadExcelRecordsService();
      if (module === "Speaking") {
        if (subModule === "read-aloud" && result.data.length > 0) {
          await uploadService.uploadReadAloudRecords(result.data);
        } else if (subModule === "repeat-sentence") {
          await uploadService.uploadRepeatSentenceRecords(result.data);
        } else if (subModule === "describe-image") {
          await uploadService.uploadDescribeImageRecords(result.data);
        } else if (subModule === "answer-short-questions") {
          await uploadService.uploadAnswerShortQuestionRecords(result.data);
        } else if (subModule === "retell-lecture") {
          await uploadService.uploadRetellLectureRecords(result.data);
        }
      } else if (module === "Writing") {
        if (subModule === "summarize-text") {
          await uploadService.uploadSummarizeTextRecords(result.data);
        } else if (subModule === "writing-essay") {
          await uploadService.uploadWriteEssayRecords(result.data);
        }
      } else if (module === "Reading") {
        if (subModule === "fill-blanks") {
          await uploadService.uploadFillInTheBlanksRecords(result.data);
        } else if (subModule === "reading-fill-blanks") {
          await uploadService.uploadReadingFillInTheBlanksRecords(result.data);
        } else if (subModule === "multiple-choice-multiple") {
          await uploadService.uploadMultipleChoiceMultipleRecords(result.data);
        } else if (subModule === "multiple-choice-single") {
          await uploadService.uploadMultipleChoiceSingleRecords(result.data);
        } else if (subModule === "reorder-paragraphs") {
          await uploadService.uploadReorderParagraphRecords(result.data);
        }
      } else if (module === "Listening") {
        if (subModule === "summarize-spoken-text") {
          await uploadService.uploadSummarizeSpokenTextRecords(result.data);
        } else if (subModule === "multiple-choice-multiple") {
          await uploadService.uploadListeningMultipleChoiceMultipleRecords(
            result.data
          );
        } else if (subModule === "multiple-choice-single") {
          await uploadService.uploadListeningMultipleChoiceSingleRecords(
            result.data
          );
        } else if (subModule === "fill-blanks") {
          await uploadService.uploadListeningFillInTheBlanksRecords(
            result.data
          );
        } else if (subModule === "highlight-correct-summary") {
          await uploadService.uploadHighlightCorrectSummaryRecords(result.data);
        } else if (subModule === "select-missing-word") {
          await uploadService.uploadSelectMissingWordRecords(result.data);
        } else if (subModule === "highlight-incorrect-words") {
          await uploadService.uploadHighlightIncorrectWordsRecords(result.data);
        } else if (subModule === "write-from-dictation") {
          await uploadService.uploadWriteFromDictationRecords(result.data);
        }
      }

      console.log(module, subModule);
      return {
        success: true,
        message: `Successfully imported ${result.imported} questions`,
        data: { imported: result.imported, processed: result.data },
      };
    } catch (error) {
      return {
        success: false,
        error:
          "Failed to process Excel file. Please check the format and try again.",
      };
    }
  }

  private async processExcelFile(
    file: File,
    module: string,
    subModule: string
  ): Promise<{ imported: number; errors: string[]; data: any[] }> {
    return new Promise(async (resolve) => {
      const XLSX = await import("xlsx");
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0]; // Limit sheet name to 30 chars
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const errors: string[] = [];
          const processedData: any[] = [];
          let imported = 0;

          jsonData.forEach((row: any, index: number) => {
            const rowNumber = index + 2; // Account for header row
            const validation = this.validateRow(
              row,
              module,
              subModule,
              rowNumber
            );

            if (validation.errors.length > 0) {
              errors.push(...validation.errors);
            } else {
              processedData.push(validation.processedRow);
              imported++;
            }
          });
          console.log(processedData);

          resolve({ imported, errors, data: processedData });
        } catch (error) {
          resolve({
            imported: 0,
            errors: ["Failed to parse Excel file"],
            data: [],
          });
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  private validateRow(
    row: any,
    module: string,
    subModule: string,
    rowNumber: number
  ): { errors: string[]; processedRow: any } {
    const errors: string[] = [];
    const processedRow: any = { ...row };

    // Basic validation
    if (!row.title) {
      errors.push(`Row ${rowNumber}: Title is required`);
    }

    // Listening module audio validation
    if (module === "Listening") {
      const hasAudioUrl = row.audioUrl && row.audioUrl.trim();
      const hasAudioText = row.audioText && row.audioText.trim();

      if (!hasAudioUrl && !hasAudioText) {
        errors.push(
          `Row ${rowNumber}: Either audioUrl or audioText is required for Listening module`
        );
      }

      if (hasAudioUrl && !this.isValidUrl(row.audioUrl)) {
        errors.push(`Row ${rowNumber}: Invalid audioUrl format`);
      }

      if (hasAudioText && row.audioText.length < 10) {
        errors.push(
          `Row ${rowNumber}: audioText should be at least 10 characters long`
        );
      }

      // Structure audio data properly
      processedRow.audio = {
        audioUrl: row.audioUrl || "",
        audioText: row.audioText || "",
        audioFormat:
          row.audioFormat ||
          (hasAudioUrl ? this.extractAudioFormat(row.audioUrl) : ""),
        audioDuration: row.audioDuration
          ? parseInt(row.audioDuration)
          : undefined,
        audioTitle: row.audioTitle || row.title || "Untitled Audio",
      };
    }

    // Module-specific validation
    switch (`${module}-${subModule}`) {
      case "Listening-summarize-spoken-text":
        if (!row.transcript && !row.audioText) {
          errors.push(`Row ${rowNumber}: Transcript or audioText is required`);
        }
        break;
      case "Listening-multiple-choice-multiple":
      case "Listening-multiple-choice-single":
        if (!row.question) {
          errors.push(`Row ${rowNumber}: Question is required`);
        }
        break;
      case "Listening-fill-blanks":
        if (!row.transcript) {
          errors.push(`Row ${rowNumber}: Text with blanks is required`);
        }
        break;
    }

    return { errors, processedRow };
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private extractAudioFormat(url: string): string {
    const extension = url.split(".").pop()?.toLowerCase();
    return ["mp3", "wav", "ogg", "m4a", "aac"].includes(extension || "")
      ? extension || "mp3"
      : "mp3";
  }

  async downloadTemplate(
    module: string,
    subModule: string
  ): Promise<AdminApiResponse> {
    console.log(
      `📥 DOWNLOAD Template - Module: ${module}, SubModule: ${subModule}`
    );

    try {
      // Import XLSX library dynamically
      const XLSX = await import("xlsx");

      // Get template data based on module and sub-module
      const templateData = this.getTemplateData(module, subModule);

      if (!templateData) {
        return {
          success: false,
          error: `No template available for ${module} - ${subModule}`,
        };
      }

      // Create workbook
      const workbook = XLSX.utils.book_new();

      // Create worksheet with template data
      const worksheet = XLSX.utils.aoa_to_sheet(templateData.data);

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        templateData.sheetName.substring(0, 30)
      ); // Limit sheet name to 30 chars

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Create blob and download
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${module}_${subModule}_Template.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return {
        success: true,
        message: `Template for ${subModule} in ${module} module downloaded successfully`,
      };
    } catch (error) {
      console.error("Error generating template:", error);
      return {
        success: false,
        error: "Failed to generate template",
      };
    }
  }

  // Generate template data based on module and sub-module
  private getTemplateData(
    module: string,
    subModule: string
  ): { data: any[][]; sheetName: string } | null {
    const key = `${module}-${subModule}`;

    switch (key) {
      // Speaking Module Templates
      case "Speaking-read-aloud":
        return {
          sheetName: "Read Aloud Template",
          data: [
            [
              "id",
              "text",
              "preparationTime",
              "recordingTime",
              "difficulty",
              "category",
              "tags",
              "expectedAnswer",
              "title",
            ],
          ],
        };

      case "Speaking-repeat-sentence":
        return {
          sheetName: "Repeat Sentence Template",
          data: [
            [
              "id",
              "audioUrl",
              "sentence",
              "recordingTime",
              "difficulty",
              "category",
              "tags",
              "title",
            ],
          ],
        };

      case "Speaking-describe-image":
        return {
          sheetName: "Describe Image Template",
          data: [
            [
              "id",
              "imageUrl",
              "imageType",
              "preparationTime",
              "speakingTime",
              "difficulty",
              "category",
              "keyPoints",
              "sampleAnswer",
              "title",
              "description",
            ],
          ],
        };

      case "Speaking-answer-short-questions":
        return {
          sheetName: "Answer Short Questions Template",
          data: [
            [
              "id",
              "audioUrl",
              "question",
              "correctAnswer",
              "acceptableAnswers",
              "difficulty",
              "category",
              "tags",
              "title",
            ],
          ],
        };

      case "Speaking-retell-lecture":
        return {
          sheetName: "Retell Lecture Template",
          data: [
            [
              "id",
              "audioUrl",
              "transcript",
              "duration",
              "keyPoints",
              "subject",
              "preparationTime",
              "speakingTime",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      // Writing Module Templates
      case "Writing-summarize-text":
        return {
          sheetName: "Summarize Text Template",
          data: [
            [
              "id",
              "passage",
              "wordLimit",
              "timeLimit",
              "sampleSummary",
              "keyIdeas",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      case "Writing-write-email":
        return {
          sheetName: "Write Email Template",
          data: [
            [
              "id",
              "scenario",
              "recipient",
              "purpose",
              "keyPoints",
              "wordLimit",
              "timeLimit",
              "tone",
              "sampleEmail",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      case "Writing-writing-essay":
        return {
          sheetName: "Writing Essay Template",
          data: [
            [
              "id",
              "prompt",
              "essayType",
              "wordLimit",
              "timeLimit",
              "rubricContent",
              "rubricForm",
              "rubricGrammar",
              "rubricVocabulary",
              "sampleEssay",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      // Reading Module Templates
      case "Reading-fill-blanks":
        return {
          sheetName: "Reading Fill Blanks Template",
          data: [
            [
              "id",
              "title",
              "text",
              "blank1_answer",
              "blank1_options",
              "blank2_answer",
              "blank2_options",
              "blank3_answer",
              "blank3_options",
              "blank4_answer",
              "blank4_options",
              "blank5_answer",
              "blank5_options",
              "difficulty",
              "category",
            ],
          ],
        };

      case "Reading-reading-fill-blanks":
        return {
          sheetName: "Reading Fill Blanks RW Template",
          data: [
            [
              "id",
              "title",
              "passage",
              "timeLimit",
              "blank1_answer",
              "blank1_options",
              "blank2_answer",
              "blank2_options",
              "blank3_answer",
              "blank3_options",
              "difficulty",
              "category",
            ],
          ],
        };

      case "Reading-multiple-choice-multiple":
        return {
          sheetName: "Multiple Choice Multiple Template",
          data: [
            [
              "id",
              "passage",
              "question",
              "optionA",
              "optionB",
              "optionC",
              "optionD",
              "optionE",
              "correctAnswers",
              "timeLimit",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      case "Reading-multiple-choice-single":
        return {
          sheetName: "Multiple Choice Single Template",
          data: [
            [
              "id",
              "passage",
              "question",
              "optionA",
              "optionB",
              "optionC",
              "optionD",
              "correctAnswer",
              "timeLimit",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      case "Reading-reorder-paragraphs":
        return {
          sheetName: "Reorder Paragraphs Template",
          data: [
            [
              "id",
              "paragraph1",
              "paragraph2",
              "paragraph3",
              "paragraph4",
              "paragraph5",
              "correctOrder",
              "timeLimit",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      // Listening Module Templates
      case "Listening-summarize-spoken-text":
        return {
          sheetName: "Summarize Spoken Text Template",
          data: [
            [
              "id",
              "audioUrl",
              "transcript",
              "duration",
              "wordLimit",
              "timeLimit",
              "keyPoints",
              "sampleSummary",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      case "Listening-multiple-choice-multiple":
        return {
          sheetName: "Listening Multiple Choice Multiple Template",
          data: [
            [
              "id",
              "audioUrl",
              "question",
              "optionA",
              "optionB",
              "optionC",
              "optionD",
              "optionE",
              "correctAnswers",
              "transcript",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      case "Listening-multiple-choice-single":
        return {
          sheetName: "Listening Multiple Choice Single Template",
          data: [
            [
              "id",
              "audioUrl",
              "question",
              "optionA",
              "optionB",
              "optionC",
              "optionD",
              "correctAnswer",
              "transcript",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      case "Listening-fill-blanks":
        return {
          sheetName: "Listening Fill Blanks Template",
          data: [
            [
              "id",
              "title",
              "audioUrl",
              "transcript",
              "duration",
              "blank1_answer",
              "blank1_word",
              "blank2_answer",
              "blank2_word",
              "blank3_answer",
              "blank3_word",
              "extraWords",
              "difficulty",
              "category",
            ],
          ],
        };

      case "Listening-highlight-correct-summary":
        return {
          sheetName: "Highlight Correct Summary Template",
          data: [
            [
              "id",
              "audioUrl",
              "summaryA",
              "summaryB",
              "summaryC",
              "correctSummary",
              "transcript",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      case "Listening-select-missing-word":
        return {
          sheetName: "Select Missing Word Template",
          data: [
            [
              "id",
              "audioUrl",
              "transcript",
              "missingWordPosition",
              "optionA",
              "optionB",
              "optionC",
              "optionD",
              "correctAnswer",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      case "Listening-highlight-incorrect-words":
        return {
          sheetName: "Highlight Incorrect Words Template",
          data: [
            [
              "id",
              "audioUrl",
              "transcript",
              "incorrectWords",
              "correctTranscript",
              "difficulty",
              "category",
              "title",
            ],
          ],
        };

      case "Listening-write-from-dictation":
        return {
          sheetName: "Write From Dictation Template",
          data: [
            [
              "id",
              "audioUrl",
              "sentence",
              "playCount",
              "difficulty",
              "category",
              "keyWords",
              "title",
            ],
          ],
        };

      default:
        return null;
    }
  }

  async exportQuestions(
    module: string,
    subModule: string
  ): Promise<AdminApiResponse> {
    console.log(
      `📊 EXPORT Questions - Module: ${module}, SubModule: ${subModule}`
    );

    try {
      // Import XLSX library dynamically
      const XLSX = await import("xlsx");

      // Get existing questions from mock data
      const existingQuestions = this.getExistingQuestions(module, subModule);

      if (!existingQuestions || existingQuestions.length === 0) {
        return {
          success: false,
          error: `No questions found for ${module} - ${subModule}`,
        };
      }

      // Convert questions to exportable format
      const exportData = this.convertQuestionsToExportFormat(
        module,
        subModule,
        existingQuestions
      );

      // Create workbook
      const workbook = XLSX.utils.book_new();

      // Create worksheet with exported data
      const worksheet = XLSX.utils.aoa_to_sheet(exportData.data);
      if (exportData.sheetName.length > 30) {
        const date = new Date();
        const randomNum = Math.floor(Math.random() * 10);
        exportData.sheetName = `${exportData.sheetName.substring(
          0,
          20
        )}${randomNum}${date.getTime()}`;
        exportData.sheetName = exportData.sheetName.substring(0, 30);
      }

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, exportData.sheetName);

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Create blob and download
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${module}_${subModule}_Questions_Export.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return {
        success: true,
        data: { exportedCount: existingQuestions.length },
        message: `Successfully exported ${existingQuestions.length} ${subModule} questions from ${module} module`,
      };
    } catch (error) {
      console.error("Error exporting questions:", error);
      return {
        success: false,
        error: "Failed to export questions",
      };
    }
  }

  // Get existing questions from mock data
  private getExistingQuestions(module: string, subModule: string): any[] {
    const key = `${module}-${subModule}`;

    try {
      switch (key) {
        // Speaking
        case "Speaking-read-aloud":
          return (
            require("../components/practice/speaking/read-a-loud/ReadALoudMockData")
              .readAloudQuestions || []
          );
        case "Speaking-repeat-sentence":
          return (
            require("../components/practice/speaking/repeat-sectence/RepeatSentenceMockData")
              .REPEAT_SENTENCE_QUESTIONS || []
          );
        case "Speaking-answer-short-questions":
          return (
            require("../components/practice/speaking/answer-short-questions/questionTopics")
              .questionTopics || []
          );
        case "Speaking-retell-lecture":
          return (
            require("../components/practice/speaking/re-tell-leacture/audioTopic")
              .audioTopics || []
          );

        // Writing
        case "Writing-summarize-text":
          return (
            require("../components/practice/Writing/summarize-text/textPassages")
              .textPassages || []
          );
        case "Writing-write-email":
          return (
            require("../components/practice/Writing/emailWriting/emailMockData")
              .emailScenarios || []
          );
        case "Writing-writing-essay":
          return (
            require("../components/practice/Writing/writing-essay/constants")
              .ESSAY_QUESTIONS || []
          );

        // Reading
        case "Reading-fill-blanks":
          return (
            require("../components/practice/Reading/fillin-blanks/FillInBlanksMockData")
              .questions || []
          );
        case "Reading-reading-fill-blanks":
          return (
            require("../components/practice/Reading/ReadingFillInTheBlanks/ReadingFillInTheBlanksMockData")
              .mockReadingPassages || []
          );
        case "Reading-multiple-choice-multiple":
          return (
            require("../components/practice/Reading/multiple-choice/multipleChoiceQuestions")
              .multipleChoiceQuestions || []
          );
        case "Reading-multiple-choice-single":
          return (
            require("../components/practice/Reading/multiple-choice-single/mutlipleChoiceSingleMockData").allMultipleChoiceQuestions?.slice(
              0,
              20
            ) || []
          );
        case "Reading-reorder-paragraphs":
          return (
            require("../components/practice/Reading/re-order-paragraphs/constants")
              .QUESTIONS || []
          );

        // Listening
        case "Listening-summarize-spoken-text":
          return (
            require("../components/practice/Listening/SummarizeSpokenText/SummarizeSpokenTextMockData").allSummarizeSpokenTextTopics?.slice(
              0,
              15
            ) || []
          );
        case "Listening-multiple-choice-multiple":
          return (
            require("../components/practice/Listening/MultipleChoiceMultiple/MutlipleChoiceMultipleMockData")
              .listeningMultipleChoiceQuestions || []
          );
        case "Listening-fill-blanks":
          return (
            require("../components/practice/Listening/FillinTheBlanks/FillinTheBlanksMockData")
              .mockListeningPassages || []
          );
        case "Listening-highlight-correct-summary":
          return (
            require("../components/practice/Listening/HighlightCorrectSummary/HighlightCorrectSummaryMockData")
              .mockHighlightSummaryQuestions || []
          );
        case "Listening-select-missing-word":
          return (
            require("../components/practice/Listening/SelectMissingWord/SelectMissingWordMockData")
              .mockSelectMissingWordQuestions || []
          );
        case "Listening-highlight-incorrect-words":
          return (
            require("../components/practice/Listening/HighlightIncorrectWords/HighlightIncorrectWordsMockData")
              .mockHighlightIncorrectWordsQuestions || []
          );
        case "Listening-write-from-dictation":
          return (
            require("../components/practice/Listening/WriteFromDictation/WriteFromDictationMockData")
              .mockWriteFromDictationQuestions || []
          );

        default:
          return [];
      }
    } catch (error) {
      console.warn(`Could not load mock data for ${key}:`, error);
      return [];
    }
  }

  // Convert questions to export format
  private convertQuestionsToExportFormat(
    module: string,
    subModule: string,
    questions: any[]
  ): { data: any[][]; sheetName: string } {
    const key = `${module}-${subModule}`;

    switch (key) {
      // Speaking Module Exports
      case "Speaking-read-aloud":
        return {
          sheetName: "Read Aloud Questions",
          data: [
            [
              "id",
              "text",
              "preparationTime",
              "recordingTime",
              "difficulty",
              "category",
              "tags",
              "expectedAnswer",
              "title",
            ],
            ...questions.map((q) => [
              q.id,
              q.text || "",
              q.preparationTime || 40,
              q.recordingTime || 40,
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
              q.expectedAnswer || "",
              q.title || "",
            ]),
          ],
        };

      case "Speaking-repeat-sentence":
        return {
          sheetName: "Repeat Sentence Questions",
          data: [
            [
              "id",
              "audioUrl",
              "sentence",
              "recordingTime",
              "difficulty",
              "category",
              "tags",
              "title",
            ],
            ...questions.map((q) => [
              q.id,
              q.audioUrl || "",
              q.sentence || q.text || "",
              q.recordingTime || 15,
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
              q.title || "",
            ]),
          ],
        };

      case "Speaking-answer-short-questions":
        return {
          sheetName: "Answer Short Questions",
          data: [
            [
              "id",
              "audioUrl",
              "question",
              "correctAnswer",
              "acceptableAnswers",
              "difficulty",
              "category",
              "tags",
              "title",
            ],
            ...questions.map((q) => [
              q.id,
              q.audioUrl || "",
              q.question || q.questionText || "",
              q.correctAnswer || q.answer || "",
              q.acceptableAnswers || "",
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
              q.title || "",
            ]),
          ],
        };

      case "Speaking-retell-lecture":
        return {
          sheetName: "Retell Lecture Questions",
          data: [
            [
              "id",
              "audioUrl",
              "transcript",
              "duration",
              "keyPoints",
              "subject",
              "preparationTime",
              "speakingTime",
              "difficulty",
              "category",
              "title",
            ],
            ...questions.map((q) => [
              q.id,
              q.audioUrl || "",
              q.transcript || q.audioText || "",
              q.duration || 60,
              Array.isArray(q.keyPoints)
                ? q.keyPoints.join(";")
                : q.keyPoints || "",
              q.subject || q.category || "",
              q.preparationTime || 10,
              q.speakingTime || 40,
              q.difficulty || "Beginner",
              q.category || "",
              q.title || "",
            ]),
          ],
        };

      // Writing Module Exports
      case "Writing-summarize-text":
        return {
          sheetName: "Summarize Text Questions",
          data: [
            [
              "id",
              "passage",
              "wordLimit",
              "timeLimit",
              "sampleSummary",
              "keyIdeas",
              "difficulty",
              "category",
              "title",
            ],
            ...questions.map((q) => [
              q.id,
              q.passage || q.text || "",
              q.wordLimit || 75,
              q.timeLimit || 10,
              q.sampleSummary || q.sampleAnswer || "",
              Array.isArray(q.keyIdeas)
                ? q.keyIdeas.join(";")
                : q.keyIdeas || "",
              q.difficulty || "Beginner",
              q.category || "",
              q.title || "",
            ]),
          ],
        };

      case "Writing-write-email":
        return {
          sheetName: "Write Email Questions",
          data: [
            [
              "id",
              "scenario",
              "recipient",
              "purpose",
              "keyPoints",
              "wordLimit",
              "timeLimit",
              "tone",
              "sampleEmail",
              "difficulty",
              "category",
              "title",
            ],
            ...questions.map((q) => [
              q.id,
              q.scenario || q.situation || "",
              q.recipient || "",
              q.purpose || "",
              Array.isArray(q.keyPoints)
                ? q.keyPoints.join(";")
                : q.keyPoints || "",
              q.wordLimit || 120,
              q.timeLimit || 20,
              q.tone || "formal",
              q.sampleEmail || "",
              q.difficulty || "Beginner",
              q.category || "",
              q.title || "",
            ]),
          ],
        };

      case "Writing-writing-essay":
        return {
          sheetName: "Writing Essay Questions",
          data: [
            [
              "id",
              "prompt",
              "essayType",
              "wordLimit",
              "timeLimit",
              "rubricContent",
              "rubricForm",
              "rubricGrammar",
              "rubricVocabulary",
              "sampleEssay",
              "difficulty",
              "category",
              "title",
            ],
            ...questions.map((q) => [
              q.id,
              q.prompt || q.questionText || "",
              q.essayType || "agree-disagree",
              q.wordLimit || 300,
              q.timeLimit || 20,
              q.rubricContent || "",
              q.rubricForm || "",
              q.rubricGrammar || "",
              q.rubricVocabulary || "",
              q.sampleEssay || "",
              q.difficulty || "Beginner",
              q.category || "",
              q.title || "",
            ]),
          ],
        };

      // Reading Module Exports
      case "Reading-fill-blanks":
        return {
          sheetName: "Reading Fill Blanks Questions",
          data: [
            [
              "id",
              "title",
              "text",
              "blank1_answer",
              "blank1_options",
              "blank2_answer",
              "blank2_options",
              "blank3_answer",
              "blank3_options",
              "blank4_answer",
              "blank4_options",
              "blank5_answer",
              "blank5_options",
              "difficulty",
              "category",
            ],
            ...questions.map((q) => {
              const blanks = q.blanks || [];
              return [
                q.id,
                q.title || "",
                q.text || "",
                blanks[0]?.correctAnswer || "",
                blanks[0]?.options?.join(";") || "",
                blanks[1]?.correctAnswer || "",
                blanks[1]?.options?.join(";") || "",
                blanks[2]?.correctAnswer || "",
                blanks[2]?.options?.join(";") || "",
                blanks[3]?.correctAnswer || "",
                blanks[3]?.options?.join(";") || "",
                blanks[4]?.correctAnswer || "",
                blanks[4]?.options?.join(";") || "",
                q.difficulty || "Beginner",
                q.category || "",
              ];
            }),
          ],
        };

      case "Reading-reading-fill-blanks":
        return {
          sheetName: "Reading Fill Blanks RW Questions",
          data: [
            [
              "id",
              "title",
              "passage",
              "timeLimit",
              "blank1_answer",
              "blank1_options",
              "blank2_answer",
              "blank2_options",
              "blank3_answer",
              "blank3_options",
              "difficulty",
              "category",
            ],
            ...questions.map((q) => {
              const blanks = q.blanks || [];
              return [
                q.id,
                q.title || "",
                q.passage || q.text || "",
                q.timeLimit || 10,
                blanks[0]?.correctAnswer || "",
                blanks[0]?.options?.join(";") || "",
                blanks[1]?.correctAnswer || "",
                blanks[1]?.options?.join(";") || "",
                blanks[2]?.correctAnswer || "",
                blanks[2]?.options?.join(";") || "",
                q.difficulty || "Beginner",
                q.category || "",
              ];
            }),
          ],
        };

      case "Reading-multiple-choice-multiple":
        return {
          sheetName: "MCM Questions",
          data: [
            [
              "id",
              "passage",
              "question",
              "optionA",
              "optionB",
              "optionC",
              "optionD",
              "optionE",
              "correctAnswers",
              "timeLimit",
              "difficulty",
              "category",
              "title",
            ],
            ...questions.map((q) => [
              q.id,
              q.passage || q.text || "",
              q.question || q.questionText || "",
              q.options?.[0] || q.optionA || "",
              q.options?.[1] || q.optionB || "",
              q.options?.[2] || q.optionC || "",
              q.options?.[3] || q.optionD || "",
              q.options?.[4] || q.optionE || "",
              Array.isArray(q.correctAnswers)
                ? q.correctAnswers.join(";")
                : q.correctAnswers || "",
              q.timeLimit || 15,
              q.difficulty || "Beginner",
              q.category || "",
              q.title || "",
            ]),
          ],
        };

      case "Reading-multiple-choice-single":
        return {
          sheetName: "Multiple Choice Single Questions",
          data: [
            [
              "id",
              "passage",
              "question",
              "optionA",
              "optionB",
              "optionC",
              "optionD",
              "correctAnswer",
              "timeLimit",
              "difficulty",
              "category",
              "title",
            ],
            ...questions.map((q) => [
              q.id,
              q.passage || q.text || "",
              q.question || q.questionText || "",
              q.options?.[0] || q.optionA || "",
              q.options?.[1] || q.optionB || "",
              q.options?.[2] || q.optionC || "",
              q.options?.[3] || q.optionD || "",
              q.correctAnswer || "",
              q.timeLimit || 12,
              q.difficulty || "Beginner",
              q.category || "",
              q.title || "",
            ]),
          ],
        };

      case "Reading-reorder-paragraphs":
        return {
          sheetName: "Reorder Paragraphs Questions",
          data: [
            [
              "id",
              "paragraph1",
              "paragraph2",
              "paragraph3",
              "paragraph4",
              "paragraph5",
              "correctOrder",
              "timeLimit",
              "difficulty",
              "category",
              "title",
            ],
            ...questions.map((q) => [
              q.id,
              q.paragraphs?.[0] || q.paragraph1 || "",
              q.paragraphs?.[1] || q.paragraph2 || "",
              q.paragraphs?.[2] || q.paragraph3 || "",
              q.paragraphs?.[3] || q.paragraph4 || "",
              q.paragraphs?.[4] || q.paragraph5 || "",
              Array.isArray(q.correctOrder)
                ? q.correctOrder.join(",")
                : q.correctOrder || "",
              q.timeLimit || 8,
              q.difficulty || "Beginner",
              q.category || "",
              q.title || "",
            ]),
          ],
        };

      // Listening Module Exports - Enhanced with Audio Support
      case "Listening-summarize-spoken-text":
        return {
          sheetName: "Summarize Spoken Text Questions",
          data: [
            [
              "id",
              "title",
              "audioUrl",
              "audioText",
              "audioFormat",
              "audioDuration",
              "audioTitle",
              "transcript",
              "wordLimitMin",
              "wordLimitMax",
              "timeLimit",
              "keyPoints",
              "sampleSummary",
              "difficulty",
              "category",
              "tags",
            ],
            ...questions.map((q) => [
              q.id,
              q.title || "",
              q.audio?.audioUrl || q.audioUrl || "",
              q.audio?.audioText || q.audioText || "",
              q.audio?.audioFormat || q.audioFormat || "",
              q.audio?.audioDuration || q.audioDuration || "",
              q.audio?.audioTitle || q.audioTitle || "",
              q.transcript || q.audioText || "",
              q.wordLimit?.min || 50,
              q.wordLimit?.max || 70,
              q.timeLimit || 10,
              Array.isArray(q.keyPoints)
                ? q.keyPoints.join(";")
                : q.keyPoints || "",
              q.sampleSummary || "",
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
            ]),
          ],
        };

      case "Listening-multiple-choice-multiple":
        return {
          sheetName: "Listening MC Multiple Questions",
          data: [
            [
              "id",
              "title",
              "audioUrl",
              "audioText",
              "audioFormat",
              "audioDuration",
              "audioTitle",
              "question",
              "optionA",
              "optionB",
              "optionC",
              "optionD",
              "optionE",
              "correctAnswers",
              "transcript",
              "speaker",
              "difficulty",
              "category",
              "tags",
            ],
            ...questions.map((q) => [
              q.id,
              q.title || "",
              q.audio?.audioUrl || q.audioUrl || "",
              q.audio?.audioText || q.audioText || "",
              q.audio?.audioFormat || q.audioFormat || "",
              q.audio?.audioDuration || q.audioDuration || "",
              q.audio?.audioTitle || q.audioTitle || "",
              q.question || q.questionText || "",
              q.options?.[0] || q.optionA || "",
              q.options?.[1] || q.optionB || "",
              q.options?.[2] || q.optionC || "",
              q.options?.[3] || q.optionD || "",
              q.options?.[4] || q.optionE || "",
              Array.isArray(q.correctAnswers)
                ? q.correctAnswers.join(";")
                : q.correctAnswers || "",
              q.transcript || "",
              q.speaker || "",
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
            ]),
          ],
        };

      case "Listening-multiple-choice-single":
        return {
          sheetName: "Listening MC Single Questions",
          data: [
            [
              "id",
              "title",
              "audioUrl",
              "audioText",
              "audioFormat",
              "audioDuration",
              "audioTitle",
              "question",
              "optionA",
              "optionB",
              "optionC",
              "optionD",
              "correctAnswer",
              "transcript",
              "speaker",
              "difficulty",
              "category",
              "tags",
            ],
            ...questions.map((q) => [
              q.id,
              q.title || "",
              q.audio?.audioUrl || q.audioUrl || "",
              q.audio?.audioText || q.audioText || "",
              q.audio?.audioFormat || q.audioFormat || "",
              q.audio?.audioDuration || q.audioDuration || "",
              q.audio?.audioTitle || q.audioTitle || "",
              q.question || q.questionText || "",
              q.options?.[0] || q.optionA || "",
              q.options?.[1] || q.optionB || "",
              q.options?.[2] || q.optionC || "",
              q.options?.[3] || q.optionD || "",
              q.correctAnswer || "",
              q.transcript || "",
              q.speaker || "",
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
            ]),
          ],
        };

      case "Listening-fill-blanks":
        return {
          sheetName: "Listening Fill Blanks Questions",
          data: [
            [
              "id",
              "title",
              "audioUrl",
              "audioText",
              "audioFormat",
              "audioDuration",
              "audioTitle",
              "text",
              "wordBank",
              "speaker",
              "instructions",
              "maxScore",
              "timeLimit",
              "difficulty",
              "category",
              "tags",
            ],
            ...questions.map((q) => [
              q.id,
              q.title || "",
              q.audio?.audioUrl || q.audioUrl || "",
              q.audio?.audioText || q.audioText || "",
              q.audio?.audioFormat || q.audioFormat || "",
              q.audio?.audioDuration || q.audioDuration || "",
              q.audio?.audioTitle || q.audioTitle || "",
              q.text || "",
              Array.isArray(q.wordBank)
                ? q.wordBank.join(";")
                : q.wordBank || "",
              q.speaker || "",
              q.instructions || "",
              q.maxScore || 100,
              q.timeLimit || 900,
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
            ]),
          ],
        };

      case "Listening-highlight-correct-summary":
        return {
          sheetName: "Highlight Correct Summary Questions",
          data: [
            [
              "id",
              "title",
              "audioUrl",
              "audioText",
              "audioFormat",
              "audioDuration",
              "audioTitle",
              "summaryA",
              "summaryB",
              "summaryC",
              "correctSummary",
              "transcript",
              "speaker",
              "instructions",
              "maxScore",
              "timeLimit",
              "difficulty",
              "category",
              "tags",
            ],
            ...questions.map((q) => [
              q.id,
              q.title || "",
              q.audio?.audioUrl || q.audioUrl || "",
              q.audio?.audioText || q.audioText || "",
              q.audio?.audioFormat || q.audioFormat || "",
              q.audio?.audioDuration || q.audioDuration || "",
              q.audio?.audioTitle || q.audioTitle || "",
              q.summaries?.[0] || q.summaryA || "",
              q.summaries?.[1] || q.summaryB || "",
              q.summaries?.[2] || q.summaryC || "",
              q.correctSummary || "",
              q.transcript || "",
              q.speaker || "",
              q.instructions || "",
              q.maxScore || 100,
              q.timeLimit || 900,
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
            ]),
          ],
        };

      case "Listening-select-missing-word":
        return {
          sheetName: "Select Missing Word Questions",
          data: [
            [
              "id",
              "title",
              "audioUrl",
              "audioText",
              "audioFormat",
              "audioDuration",
              "audioTitle",
              "missingWordPosition",
              "optionA",
              "optionB",
              "optionC",
              "correctAnswer",
              "speaker",
              "instructions",
              "difficulty",
              "category",
              "tags",
            ],
            ...questions.map((q) => [
              q.id,
              q.title || "",
              q.audio?.audioUrl || q.audioUrl || "",
              q.audio?.audioText || q.audioText || "",
              q.audio?.audioFormat || q.audioFormat || "",
              q.audio?.audioDuration || q.audioDuration || "",
              q.audio?.audioTitle || q.audioTitle || "",
              q.missingWordPosition || "",
              q.options?.[0] || q.optionA || "",
              q.options?.[1] || q.optionB || "",
              q.options?.[2] || q.optionC || "",
              q.correctAnswer || "",
              q.speaker || "",
              q.instructions || "",
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
            ]),
          ],
        };

      case "Listening-highlight-incorrect-words":
        return {
          sheetName: "Highlight Incorrect Words Questions",
          data: [
            [
              "id",
              "title",
              "audioUrl",
              "audioText",
              "audioFormat",
              "audioDuration",
              "audioTitle",
              "displayText",
              "incorrectWords",
              "speaker",
              "instructions",
              "maxScore",
              "timeLimit",
              "difficulty",
              "category",
              "tags",
            ],
            ...questions.map((q) => [
              q.id,
              q.title || "",
              q.audio?.audioUrl || q.audioUrl || "",
              q.audio?.audioText || q.audioText || "",
              q.audio?.audioFormat || q.audioFormat || "",
              q.audio?.audioDuration || q.audioDuration || "",
              q.audio?.audioTitle || q.audioTitle || "",
              q.displayText || q.audioText || "",
              Array.isArray(q.incorrectWords)
                ? q.incorrectWords.join(";")
                : q.incorrectWords || "",
              q.speaker || "",
              q.instructions || "",
              q.maxScore || 100,
              q.timeLimit || 1200,
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
            ]),
          ],
        };

      case "Listening-write-from-dictation":
        return {
          sheetName: "Write From Dictation Questions",
          data: [
            [
              "id",
              "title",
              "audioUrl",
              "audioText",
              "audioFormat",
              "audioDuration",
              "audioTitle",
              "keyWords",
              "acceptableVariations",
              "maxScore",
              "timeLimit",
              "instructions",
              "difficulty",
              "category",
              "tags",
            ],
            ...questions.map((q) => [
              q.id,
              q.title || "",
              q.audio?.audioUrl || q.audioUrl || "",
              q.audio?.audioText || q.audioText || "",
              q.audio?.audioFormat || q.audioFormat || "",
              q.audio?.audioDuration || q.audioDuration || "",
              q.audio?.audioTitle || q.audioTitle || "",
              Array.isArray(q.keyWords)
                ? q.keyWords.join(";")
                : q.keyWords || "",
              typeof q.acceptableVariations === "object"
                ? JSON.stringify(q.acceptableVariations)
                : q.acceptableVariations || "",
              q.maxScore || 100,
              q.timeLimit || 600,
              q.instructions || "",
              q.difficulty || "Beginner",
              q.category || "",
              Array.isArray(q.tags) ? q.tags.join(",") : q.tags || "",
            ]),
          ],
        };

      default:
        // If no specific format is defined, create a basic format
        return {
          sheetName: `${module} ${subModule} Questions`.substring(0, 30),
          data: [
            ["id", "title", "difficulty", "category", "content"],
            ...questions.map((q) => [
              q.id,
              q.title || q.questionText || `Question ${q.id}`,
              q.difficulty || "Beginner",
              q.category || "General",
              q.text || q.passage || q.question || JSON.stringify(q),
            ]),
          ],
        };
    }
  }

  // Module and sub-module mapping
  getModuleConfig() {
    return {
      Speaking: [
        { value: "read-aloud", label: "Read Aloud" },
        { value: "repeat-sentence", label: "Repeat Sentence" },
        { value: "describe-image", label: "Describe Image" },
        { value: "answer-short-questions", label: "Answer Short Questions" },
        { value: "retell-lecture", label: "Retell Lecture" },
      ],
      Writing: [
        { value: "summarize-text", label: "Summarize Text" },
        { value: "write-email", label: "Write Email" },
        { value: "writing-essay", label: "Writing Essay" },
      ],
      Reading: [
        { value: "fill-blanks", label: "Fill in Blanks" },
        { value: "reading-fill-blanks", label: "Reading Fill in Blanks" },
        {
          value: "multiple-choice-multiple",
          label: "Multiple Choice (Multiple)",
        },
        { value: "multiple-choice-single", label: "Multiple Choice (Single)" },
        { value: "reorder-paragraphs", label: "Reorder Paragraphs" },
      ],
      Listening: [
        { value: "summarize-spoken-text", label: "Summarize Spoken Text" },
        {
          value: "multiple-choice-multiple",
          label: "Multiple Choice (Multiple)",
        },
        { value: "multiple-choice-single", label: "Multiple Choice (Single)" },
        { value: "fill-blanks", label: "Fill in Blanks" },
        {
          value: "highlight-correct-summary",
          label: "Highlight Correct Summary",
        },
        {
          value: "highlight-incorrect-words",
          label: "Highlight Incorrect Words",
        },
        { value: "select-missing-word", label: "Select Missing Word" },
        { value: "write-from-dictation", label: "Write From Dictation" },
      ],
    };
  }
}

export const adminService = AdminService.getInstance();
