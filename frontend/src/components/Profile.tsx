import React, { useState } from 'react';
import { Container, Typography, Card, Box, Avatar, TextField, Grid } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { User } from '../types';
import { Button } from './common/Button';

interface ProfileProps {
  user: User | null;
  setUser: (user: User) => void;
}

export const Profile = ({ user, setUser }: ProfileProps) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: user?.name || '',
    email: user?.email || '',
    targetScore: '79',
    testDate: '2024-03-15'
  });

  const handleSave = () => {
    setUser({ ...user, ...formData });
    setEditing(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Profile Settings
      </Typography>
      
      <Card sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography color="text.secondary">{user?.email}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Button
              startIcon={<Edit />}
              onClick={() => setEditing(!editing)}
              variant={editing ? "outlined" : "contained"}
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Box>
        </Box>

        {editing ? (
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              label="Target Score"
              type="number"
              value={formData.targetScore}
              onChange={(e) => setFormData({ ...formData, targetScore: e.target.value })}
            />
            <TextField
              label="Test Date"
              type="date"
              value={formData.testDate}
              onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid 
            // item xs={12} sm={6}
            >
              <Typography variant="body2" color="text.secondary">Target Score</Typography>
              <Typography variant="h6">79/90</Typography>
            </Grid>
            <Grid
            //  item xs={12} sm={6}
             >
              <Typography variant="body2" color="text.secondary">Test Date</Typography>
              <Typography variant="h6">March 15, 2024</Typography>
            </Grid>
            <Grid
            //  item xs={12} sm={6}
             >
              <Typography variant="body2" color="text.secondary">Member Since</Typography>
              <Typography variant="h6">January 2024</Typography>
            </Grid>
            <Grid
            //  item xs={12} sm={6}
             >
              <Typography variant="body2" color="text.secondary">Tests Completed</Typography>
              <Typography variant="h6">8</Typography>
            </Grid>
          </Grid>
        )}
      </Card>
    </Container>
  );
};
export default Profile;
