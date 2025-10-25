import React, { useMemo, useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Divider,
    Chip,
    Stack,
    Paper,
    Tabs,
    Tab,
    FormControl,
    Select,
    MenuItem,
    Button,
    Badge,
    InputAdornment,
    TextField,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Close, KeyboardArrowDown, Search } from '@mui/icons-material';
import { type } from '@testing-library/user-event/dist/type';
import { EmailScenario } from '../practice/Writing/emailWriting/emailTypes';

interface Topic {
    category: any;
    tags: any;
    isNew: boolean;
    isMarked: boolean;
    pracStatus: string;
    hasExplanation: boolean;
    id: number;
    title: string;
    duration?: string;
    speaker?: string;
    difficulty: string;
    link?: string;
}

interface TopicSelectionDrawerProps {
    open: boolean;
    onClose: () => void;
    onSelect: (topic: Topic) => void;
    topics: Topic[];
    title: string;
    type: string;
}

const TopicSelectionDrawer: React.FC<TopicSelectionDrawerProps> = ({ open, onClose, onSelect, topics, title }) => {
    const [selectedTab, setSelectedTab] = useState(0);
     const theme = useTheme();
      const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    new: 'All',
    mark: 'All',
    pracStatus: 'All',
    difficulty: 'All',
    explanation: 'All'
  });

  const handleTopicSelect = (topic:Topic) => {
    onSelect(topic);
    onClose();
  };

  const handleTabChange = (event:any, newValue:any) => {
    setSelectedTab(newValue);
  };

  const handleFilterChange = (filterKey:any, value:any) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      new: 'All',
      mark: 'All',
      pracStatus: 'All',
      difficulty: 'All',
      explanation: 'All'
    });
    setSearchQuery('');
  };

  // Filter and search logic
  const filteredTopics = useMemo(() => {
    let filtered = [...topics];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic?.speaker?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        topic.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.tags?.some((tag:any) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // New filter
    if (filters.new !== 'All') {
      if (filters.new === 'New') {
        filtered = filtered.filter(topic => topic.isNew === true);
      }
    }

    // Mark filter
    if (filters.mark !== 'All') {
      if (filters.mark === 'Marked') {
        filtered = filtered.filter(topic => topic.isMarked === true);
      } else if (filters.mark === 'Unmarked') {
        filtered = filtered.filter(topic => topic.isMarked === false);
      }
    }

    // Practice Status filter
    if (filters.pracStatus !== 'All') {
      filtered = filtered.filter(topic => topic.pracStatus === filters.pracStatus);
    }

    // Difficulty filter
    if (filters.difficulty !== 'All') {
      filtered = filtered.filter(topic => topic.difficulty === filters.difficulty);
    }

    // Explanation filter
    if (filters.explanation !== 'All') {
      if (filters.explanation === 'With Explanation') {
        filtered = filtered.filter(topic => topic.hasExplanation === true);
      } else if (filters.explanation === 'No Explanation') {
        filtered = filtered.filter(topic => topic.hasExplanation === false);
      }
    }

    return filtered;
  }, [topics, searchQuery, filters]);

  // Statistics
  const doneCount = topics.filter(topic => topic.pracStatus === 'Done').length;
  const totalCount = topics.length;
  const foundCount = filteredTopics.length;

  // Generate question data for display
  const questionsData = filteredTopics.map((topic, index) => ({
    id: topic.id,
    questionNumber: `#${2349 - index}`,
    type: title === 'lecture' ? 'RL' : 'ASQ',
    title: topic.title,
    status: topic.pracStatus || 'Undone',
    tags: [`#${2349 - index}`],
    topic: topic,
    difficulty: topic.difficulty,
    category: topic.category
  }));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500, md: 600 },
          bgcolor: '#f8f9fa',
          zIndex: 1200
        },
        style: { width: isMobile ? '95%' : '60%' }
      }}
      ModalProps={{
        sx: {
          zIndex: 1200
        }
      }}
      SlideProps={{
        direction: 'left'
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
          {/* Top Header with Close Button */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: title === 'lecture' ? theme.palette.warning.main : theme.palette.warning.light,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '14px',
                  boxShadow: `0 2px 8px ${theme.palette.warning.main}30`,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: `0 4px 12px ${theme.palette.warning.main}40`,
                  }
                }}
              >
                {title === 'lecture' ? 'RL' : 'ASQ'}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                {title}
              </Typography>
            </Stack>
            <IconButton 
              onClick={onClose} 
              sx={{ 
                color: theme.palette.text.secondary,
                padding: '6px',
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                }
              }}
            >
              <Close sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          {/* Search Bar */}
          <Box sx={{ px: 2, pb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search topics, speakers, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ 
                      color: theme.palette.text.secondary,
                      fontSize: 20
                    }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: 'white',
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '1px',
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: '0.875rem',
                  '&::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 0.8,
                  },
                },
              }}
            />
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange} 
              sx={{ 
                px: 2,
                minHeight: 42,
                '& .MuiTabs-indicator': {
                  height: 2,
                  backgroundColor: theme.palette.primary.main,
                }
              }}
            >
              <Tab 
                label="All" 
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  minHeight: 42,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }
                }} 
              />
              <Tab 
                label="Recent" 
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  minHeight: 42,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }
                }} 
              />
            </Tabs>
          </Box>

          {/* Filters Row */}
          <Stack direction="row" spacing={1} sx={{ p: 2, flexWrap: 'wrap', gap: 1 }}>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={filters.new}
                onChange={(e) => handleFilterChange('new', e.target.value)}
                displayEmpty
                sx={{ 
                  height: '32px',
                  bgcolor: filters.new !== 'All' ? `${theme.palette.primary.light}20` : 'white',
                  '& .MuiSelect-select': { 
                    py: 0.5, 
                    fontSize: '0.813rem',
                    fontWeight: 500
                  },
                  '&:hover': {
                    bgcolor: filters.new !== 'All' ? `${theme.palette.primary.light}30` : theme.palette.grey[50]
                  }
                }}
              >
                <MenuItem value="All">All New</MenuItem>
                <MenuItem value="New">New Only</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={filters.mark}
                onChange={(e) => handleFilterChange('mark', e.target.value)}
                displayEmpty
                sx={{ 
                  bgcolor: filters.mark !== 'All' ? '#e3f2fd' : 'white',
                  '& .MuiSelect-select': { py: 0.5, fontSize: '0.875rem' } 
                }}
              >
                <MenuItem value="All">All Mark</MenuItem>
                <MenuItem value="Marked">Marked</MenuItem>
                <MenuItem value="Unmarked">Unmarked</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={filters.pracStatus}
                onChange={(e) => handleFilterChange('pracStatus', e.target.value)}
                displayEmpty
                sx={{ 
                  bgcolor: filters.pracStatus !== 'All' ? '#e3f2fd' : 'white',
                  '& .MuiSelect-select': { py: 0.5, fontSize: '0.875rem' } 
                }}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
                <MenuItem value="Undone">Undone</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 90 }}>
              <Select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                displayEmpty
                sx={{ 
                  bgcolor: filters.difficulty !== 'All' ? '#e3f2fd' : 'white',
                  '& .MuiSelect-select': { py: 0.5, fontSize: '0.875rem' } 
                }}
              >
                <MenuItem value="All">All Difficulty</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={filters.explanation}
                onChange={(e) => handleFilterChange('explanation', e.target.value)}
                displayEmpty
                sx={{ 
                  bgcolor: filters.explanation !== 'All' ? '#e3f2fd' : 'white',
                  '& .MuiSelect-select': { py: 0.5, fontSize: '0.875rem' } 
                }}
              >
                <MenuItem value="All">All Explanation</MenuItem>
                <MenuItem value="With Explanation">With Explanation</MenuItem>
                <MenuItem value="No Explanation">No Explanation</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Status Row */}
          <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="space-between" 
            sx={{ px: 2, pb: 2 }}
          >
            <Typography variant="body2" sx={{ color: '#666' }}>
              Done {doneCount}, Found {foundCount} of {totalCount} Questions
            </Typography>
            <Button 
              size="small" 
              onClick={resetFilters}
              sx={{ 
                color: theme.palette.error.main, 
                textTransform: 'none',
                fontSize: '0.75rem',
                padding: '4px 8px',
                minHeight: '28px',
                '&:hover': { 
                  bgcolor: `${theme.palette.error.light}20`
                }
              }}
            >
              🔄 Reset Filters
            </Button>
          </Stack>
        </Box>

        {/* Questions List */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {questionsData.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                No questions found matching your filters.
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {questionsData.map((question, index) => (
                <ListItem key={question.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleTopicSelect(question.topic)}
                    sx={{
                      py: 2,
                      px: 3,
                      borderBottom: '1px solid #f0f0f0',
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                      {/* Question Info */}
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                            {question.questionNumber} {question.title}
                          </Typography>
                          <Chip 
                            onClick={() => { }}
                            label={question.questionNumber} 
                            size="small" 
                            sx={{ 
                              bgcolor: theme.palette.grey[100],
                              color: theme.palette.text.secondary,
                              height: 20,
                              fontSize: '0.688rem',
                              '& .MuiChip-label': {
                                px: 1
                              }
                            }} 
                          />
                          {question.topic.isNew && (
                            <Chip 
                            onClick={() => { }}
                              label="NEW" 
                              size="small" 
                              color="primary"
                              sx={{ height: 20, fontSize: '0.6rem' }} 
                            />
                          )}
                          {question.topic.isMarked && (
                            <Chip 
                            onClick={() => { }}
                              label="★" 
                              size="small" 
                              color="warning"
                              sx={{ height: 20, fontSize: '0.6rem' }} 
                            />
                          )}
                        </Stack>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem', mb: 0.5 }}>
                          {question.title}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Chip
                          onClick={() => { }}
                            label={question.difficulty}
                            size="small"
                            color={
                              question.difficulty === 'Beginner' ? 'success' :
                              question.difficulty === 'Intermediate' ? 'warning' : 'error'
                            }
                            sx={{ height: 18, fontSize: '0.65rem' }}
                          />
                          {question.category && (
                            <Chip
                            onClick={() => { }}
                              label={question.category}
                              size="small"
                              variant="outlined"
                              sx={{ height: 18, fontSize: '0.65rem' }}
                            />
                          )}
                        </Stack>
                      </Box>

                      {/* Status Button */}
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          height: '28px',
                          bgcolor: question.status === 'Done' ? 
                            `${theme.palette.success.light}20` : 
                            question.status === 'In Progress' ? 
                            `${theme.palette.warning.light}20` : 
                            theme.palette.grey[50],
                          color: question.status === 'Done' ? 
                            theme.palette.success.main : 
                            question.status === 'In Progress' ? 
                            theme.palette.warning.main : 
                            theme.palette.text.secondary,
                          borderColor: question.status === 'Done' ? 
                            theme.palette.success.main : 
                            question.status === 'In Progress' ? 
                            theme.palette.warning.main : 
                            theme.palette.grey[300],
                          textTransform: 'none',
                          fontSize: '0.75rem',
                          minWidth: 70,
                          py: '2px',
                          fontWeight: 500,
                          '&:hover': { 
                            bgcolor: question.status === 'Done' ? 
                              `${theme.palette.success.light}30` : 
                              question.status === 'In Progress' ? 
                              `${theme.palette.warning.light}30` : 
                              theme.palette.grey[100],
                            borderColor: question.status === 'Done' ? 
                              theme.palette.success.main : 
                              question.status === 'In Progress' ? 
                              theme.palette.warning.main : 
                              theme.palette.grey[400]
                          }
                        }}
                      >
                        {question.status}
                      </Button>
                    </Stack>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ 
          bgcolor: 'white', 
          borderTop: '1px solid #e0e0e0',
          p: 2,
          textAlign: 'center'
        }}>
          <Typography variant="caption" sx={{ color: '#666' }}>
            Showing {foundCount} of {totalCount} questions
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};
export default TopicSelectionDrawer;