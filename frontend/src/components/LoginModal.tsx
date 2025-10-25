// src/components/LoginModal.tsx
import React, { use, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Link
} from '@mui/material';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (credentials: { email: string; password: string; name?: string }) => Promise<void>;
  onRegister: (data: { name: string; email: string; password: string }) => Promise<void>;
  loading?: boolean;
  selectedMode: string; // 'login' or 'register'
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin, onRegister, loading = false, selectedMode }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMode === 'register') {
      setMode('register');
    }
    else {
      setMode('login');
    }
  }, [selectedMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLocalLoading(true);

    try {
      if (mode === 'login') {
        await onLogin({ email, password });
      } else {
        await onRegister({ name, email, password });
      }
      // success -> app will close modal
    } catch (err: any) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleClose = () => {
    if (localLoading || loading) return;
    setName('');
    setEmail('');
    setPassword('');
    setError(null);
    onClose();
  };

  const isLoading = localLoading || loading;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', pb: 2 }}>
        {mode === 'login' ? 'Login to PTE Practice' : 'Create your account'}
      </DialogTitle>
      <DialogContent>
        {mode === 'login' && (
          <Box sx={{ mb: 2 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <strong>Demo Credentials:</strong><br />
              Admin: admin@pte.com / admin123<br />
              User: user@pte.com / user123
            </Alert>
          </Box>
        )}

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
              sx={{ mb: 2 }}
            />
          )}

          <TextField
            autoFocus={mode === 'login'}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            sx={{ mb: 2 }}
          />

          <DialogActions sx={{ px: 0, pt: 2 }}>
            <Button onClick={handleClose} disabled={isLoading} color="inherit">Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !email || !password || (mode === 'register' && !name)}
              startIcon={isLoading ? <CircularProgress size={16} /> : null}
              sx={{ minWidth: 100 }}
            >
              {isLoading ? (mode === 'login' ? 'Logging in...' : 'Registering...') : (mode === 'login' ? 'Login' : 'Register')}
            </Button>
          </DialogActions>
        </form>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          {mode === 'login' ? (
            <Typography variant="body2">
              Don’t have an account?{' '}
              <Link component="button" variant="body2" onClick={() => setMode('register')}>Register here</Link>
            </Typography>
          ) : (
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component="button" variant="body2" onClick={() => setMode('login')}>Login</Link>
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
