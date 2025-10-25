import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Box,
  TablePagination,
  Tooltip,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';

// Import mock data
import { questionTopics } from '../../practice/speaking/answer-short-questions/questionTopics';

import { emailScenarios } from '../../practice/Writing/emailWriting/emailMockData';
import { textPassages } from '../../practice/Writing/summarize-text/textPassages';
import { ESSAY_QUESTIONS } from '../../practice/Writing/writing-essay/constants';
import { questions as fillBlanksQuestions } from '../../practice/Reading/fillin-blanks/FillInBlanksMockData';
import { mockReadingPassages } from '../../practice/Reading/ReadingFillInTheBlanks/ReadingFillInTheBlanksMockData';
import { multipleChoiceQuestions } from '../../practice/Reading/multiple-choice/multipleChoiceQuestions';
import { allMultipleChoiceQuestions } from '../../practice/Reading/multiple-choice-single/mutlipleChoiceSingleMockData';
import { QUESTIONS as reorderQuestions } from '../../practice/Reading/re-order-paragraphs/constants';
import { allSummarizeSpokenTextTopics } from '../../practice/Listening/SummarizeSpokenText/SummarizeSpokenTextMockData';
import { listeningMultipleChoiceQuestions } from '../../practice/Listening/MultipleChoiceMultiple/MutlipleChoiceMultipleMockData';
import { mockListeningPassages } from '../../practice/Listening/FillinTheBlanks/FillinTheBlanksMockData';
import { mockHighlightSummaryQuestions } from '../../practice/Listening/HighlightCorrectSummary/HighlightCorrectSummaryMockData';
import { mockHighlightIncorrectWordsQuestions } from '../../practice/Listening/HighlightIncorrectWords/HighlightIncorrectWordsMockData';
import { mockSelectMissingWordQuestions } from '../../practice/Listening/SelectMissingWord/SelectMissingWordMockData';
import { mockWriteFromDictationQuestions } from '../../practice/Listening/WriteFromDictation/WriteFromDictationMockData';

interface QuestionsTableProps {
  selectedModule: string;
  selectedSubModule: string;
  onEdit: (question: any) => void;
  onDelete: (questionId: string) => void;
  onView: (question: any) => void;
  refreshTrigger?: number;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({
  selectedModule,
  selectedSubModule,
  onEdit,
  onDelete,
  onView,
  refreshTrigger
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get mock data based on selected module and sub-module
  const getMockData = (): any[] => {
    const key = `${selectedModule}-${selectedSubModule}`;
    
    switch (key) {
      case 'Speaking-read-aloud':
        return [];
      case 'Speaking-repeat-sentence':
        return [];
      case 'Speaking-describe-image':
        return [];
      case 'Speaking-answer-short-questions':
        return questionTopics;
      case 'Speaking-retell-lecture':
        return [];
      
      // Writing
      case 'Writing-summarize-text':
        return textPassages;
      case 'Writing-write-email':
        return emailScenarios;
      case 'Writing-writing-essay':
        return ESSAY_QUESTIONS;
      
      // Reading
      case 'Reading-fill-blanks':
        return fillBlanksQuestions;
      case 'Reading-reading-fill-blanks':
        return mockReadingPassages;
      case 'Reading-multiple-choice-multiple':
        return multipleChoiceQuestions;
      case 'Reading-multiple-choice-single':
        return allMultipleChoiceQuestions.slice(0, 20); // Limit for demo
      case 'Reading-reorder-paragraphs':
        return reorderQuestions;
      
      // Listening
      case 'Listening-summarize-spoken-text':
        return allSummarizeSpokenTextTopics.slice(0, 15); // Limit for demo
      case 'Listening-multiple-choice-multiple':
        return listeningMultipleChoiceQuestions;
      case 'Listening-multiple-choice-single':
        return []; // No separate mock data
      case 'Listening-fill-blanks':
        return mockListeningPassages;
      case 'Listening-highlight-correct-summary':
        return mockHighlightSummaryQuestions;
      case 'Listening-highlight-incorrect-words':
        return mockHighlightIncorrectWordsQuestions;
      case 'Listening-select-missing-word':
        return mockSelectMissingWordQuestions;
      case 'Listening-write-from-dictation':
        return mockWriteFromDictationQuestions;
      
      default:
        return [];
    }
  };

  // Load questions when module/sub-module changes
  useEffect(() => {
    if (selectedModule && selectedSubModule) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const mockData = getMockData();
        setQuestions(mockData);
        setLoading(false);
        setPage(0); // Reset to first page when data changes
      }, 500);
    } else {
      setQuestions([]);
    }
  }, [selectedModule, selectedSubModule, refreshTrigger]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const getDisplayValue = (question: any, field: string) => {
    switch (field) {
      case 'title':
        return question.title || question.prompt || question.questionText || `Question ${question.id}`;
      case 'difficulty':
        return question.difficulty || 'Not specified';
      case 'category':
        return question.category || 'General';
      case 'status':
        return question.pracStatus || question.status || 'Active';
      case 'preview':
        return question.text || question.passage || question.audioText || question.situation || question.questionText || 'No preview available';
      default:
        return 'N/A';
    }
  };

  if (!selectedModule || !selectedSubModule) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Please select both module and sub-module to view questions.
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No questions found for {selectedModule} → {selectedSubModule}
      </Alert>
    );
  }

  const paginatedQuestions = questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {selectedModule} → {selectedSubModule} Questions ({questions.length})
      </Typography>
      
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedQuestions.map((question) => (
              <TableRow key={question.id} hover>
                <TableCell>{question.id}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200 }}>
                    {getDisplayValue(question, 'title')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                    {getDisplayValue(question, 'preview').substring(0, 100)}
                    {getDisplayValue(question, 'preview').length > 100 && '...'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getDisplayValue(question, 'difficulty')}
                    color={getDifficultyColor(getDisplayValue(question, 'difficulty')) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {getDisplayValue(question, 'category')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getDisplayValue(question, 'status')}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton size="small" onClick={() => onView(question)}>
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onEdit(question)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => onDelete(question.id.toString())}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={questions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default QuestionsTable;