import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

import { adminService } from '../../services/adminService';
import EnhancedFileOperations from './common/EnhancedFileOperations';
import ModuleSelector from './common/ModuleSelector';
import EnhancedQuestionFormDrawer from './common/EnhancedQuestionFormDrawer';
import QuestionsTable from './common/QuestionsTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboardNew: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedSubModule, setSelectedSubModule] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleModuleChange = (module: string) => {
    setSelectedModule(module);
    setSelectedSubModule(''); // Reset sub-module when module changes
  };

  const handleSubModuleChange = (subModule: string) => {
    setSelectedSubModule(subModule);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleCreateNew = () => {
    if (!selectedModule || !selectedSubModule) {
      setSnackbar({
        open: true,
        message: 'Please select both module and sub-module first',
        severity: 'error'
      });
      return;
    }
    setEditingQuestion(null);
    setDrawerOpen(true);
  };

  const handleEdit = (question: any) => {
    setEditingQuestion(question);
    setDrawerOpen(true);
  };

  const handleDelete = async (questionId: string) => {
    if (!selectedModule || !selectedSubModule) return;
    
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        const response = await adminService.deleteQuestion(selectedModule, selectedSubModule, questionId);
        if (response.success) {
          setSnackbar({
            open: true,
            message: response.message || 'Question deleted successfully',
            severity: 'success'
          });
          setRefreshTrigger(prev => prev + 1);
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to delete question',
          severity: 'error'
        });
      }
    }
  };

  const handleView = (question: any) => {
    // For now, just log the question. In a real app, you might open a read-only drawer
    console.log('Viewing question:', question);
    setSnackbar({
      open: true,
      message: 'Question details logged to console',
      severity: 'success'
    });
  };

  const handleDrawerSave = () => {
    setRefreshTrigger(prev => prev + 1);
    setSnackbar({
      open: true,
      message: editingQuestion ? 'Question updated successfully' : 'Question created successfully',
      severity: 'success'
    });
  };

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setSnackbar({
      open: true,
      message: 'Excel file uploaded successfully',
      severity: 'success'
    });
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
    setSnackbar({
      open: true,
      message: 'Data refreshed',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const canPerformOperations = selectedModule && selectedSubModule;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage questions and content for PTE practice modules
        </Typography>
      </Box>

      {/* Module Selector */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select Module & Sub-Module
        </Typography>
        <ModuleSelector
          selectedModule={selectedModule}
          selectedSubModule={selectedSubModule}
          onModuleChange={handleModuleChange}
          onSubModuleChange={handleSubModuleChange}
        />
      </Paper>

      {/* Main Content Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Manage Questions" />
            <Tab label="File Operations" />
          </Tabs>
        </Box>

        {/* Questions Management Tab */}
        <TabPanel value={currentTab} index={0}>
          <Box sx={{ px: 3 }}>
            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateNew}
                disabled={!canPerformOperations}
              >
                Create New Question
              </Button>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                disabled={!canPerformOperations}
              >
                Refresh
              </Button>
            </Box>

            {/* Questions Table */}
            <QuestionsTable
              selectedModule={selectedModule}
              selectedSubModule={selectedSubModule}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              refreshTrigger={refreshTrigger}
            />
          </Box>
        </TabPanel>

        {/* File Operations Tab */}
        <TabPanel value={currentTab} index={1}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h6" gutterBottom>
              File Import/Export Operations
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Upload Excel files with questions or export existing questions to Excel format.
              {selectedModule === 'Listening' && (
                <Box sx={{ mt: 1, p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
                  <strong>Listening Module:</strong> Supports both audio URL and text-to-speech options.
                  Include audioUrl for direct audio files or audioText for speech synthesis.
                </Box>
              )}
            </Typography>
            
            <EnhancedFileOperations
              selectedModule={selectedModule}
              selectedSubModule={selectedSubModule}
              onUploadSuccess={handleUploadSuccess}
              disabled={!canPerformOperations}
            />
          </Box>
        </TabPanel>
      </Paper>

      {/* Help Section */}
      {!canPerformOperations && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Getting Started
          </Typography>
          <Typography variant="body2">
            1. Select a module (Speaking, Writing, Reading, or Listening)<br />
            2. Choose a sub-module from the dropdown<br />
            3. Use the tabs to manage questions or upload/export files
          </Typography>
        </Alert>
      )}

      {/* Question Form Drawer */}
      <EnhancedQuestionFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedModule={selectedModule}
        selectedSubModule={selectedSubModule}
        question={editingQuestion}
        onSave={handleDrawerSave}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboardNew;