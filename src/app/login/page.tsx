'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { email, password, confirmPassword, firstName, lastName, role } = formData;

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!isLogin) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            email,
            first_name: firstName,
            last_name: lastName,
            password_hash: hashedPassword,
            role,
          },
        ]);

      if (insertError) {
        setError(insertError.message || 'Sign-up failed.');
        return;
      }

      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.ok) router.push('/dashboard');
    } else {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.ok) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
      px={2}
    >
      <Typography variant="h4">
        {isLogin ? 'Login' : 'Sign Up'}
      </Typography>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400, width: '100%' }}>
        <Box display="flex" flexDirection="column" gap={2}>
          {!isLogin && (
            <>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Role"
                name="role"
                select
                value={formData.role}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="recruiter">Recruiter</MenuItem>
              </TextField>
            </>
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {!isLogin && (
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
            />
          )}

          <Button type="submit" variant="contained" color="primary">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </Box>
      </form>

      {error && <Typography color="error">{error}</Typography>}

      <Button onClick={() => setIsLogin(!isLogin)} variant="text">
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
      </Button>
    </Box>
  );
}
