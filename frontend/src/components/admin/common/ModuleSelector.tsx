import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Chip,
  Typography
} from '@mui/material';
import { adminService } from '../../../services/adminService';

interface ModuleSelectorProps {
  selectedModule: string;
  selectedSubModule: string;
  onModuleChange: (module: string) => void;
  onSubModuleChange: (subModule: string) => void;
  disabled?: boolean;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  selectedModule,
  selectedSubModule,
  onModuleChange,
  onSubModuleChange,
  disabled = false
}) => {
  const moduleConfig = adminService.getModuleConfig();
  const modules = Object.keys(moduleConfig);
  const subModules = selectedModule ? moduleConfig[selectedModule as keyof typeof moduleConfig] || [] : [];

  const handleModuleChange = (event: SelectChangeEvent) => {
    const module = event.target.value;
    onModuleChange(module);
    onSubModuleChange(''); // Reset sub-module when module changes
  };

  const handleSubModuleChange = (event: SelectChangeEvent) => {
    onSubModuleChange(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
      <FormControl sx={{ minWidth: 200 }} disabled={disabled}>
        <InputLabel id="module-select-label">Select Module</InputLabel>
        <Select
          labelId="module-select-label"
          value={selectedModule}
          label="Select Module"
          onChange={handleModuleChange}
        >
          <MenuItem value="">
            <em>Select a module</em>
          </MenuItem>
          {modules.map((module) => (
            <MenuItem key={module} value={module}>
              {module}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 250 }} disabled={disabled || !selectedModule}>
        <InputLabel id="submodule-select-label">Select Sub-Module</InputLabel>
        <Select
          labelId="submodule-select-label"
          value={selectedSubModule}
          label="Select Sub-Module"
          onChange={handleSubModuleChange}
        >
          <MenuItem value="">
            <em>Select a sub-module</em>
          </MenuItem>
          {subModules.map((subModule) => (
            <MenuItem key={subModule.value} value={subModule.value}>
              {subModule.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedModule && selectedSubModule && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Selected:
          </Typography>
          <Chip 
            label={selectedModule} 
            color="primary" 
            variant="outlined" 
            size="small" 
          />
          <Typography variant="body2" color="text.secondary">
            →
          </Typography>
          <Chip 
            label={subModules.find(sm => sm.value === selectedSubModule)?.label || selectedSubModule}
            color="secondary" 
            variant="outlined" 
            size="small" 
          />
        </Box>
      )}
    </Box>
  );
};

export default ModuleSelector;