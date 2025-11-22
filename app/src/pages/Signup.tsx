import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullname: '',
    studentid: '',
    program: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      await signup(
        {
          fullname: formData.fullname,
          studentid: formData.studentid,
          program: formData.program,
          email: formData.email,
        },
        formData.password
      );
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>Join MindGuard today</p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Juan Dela Cruz"
            required
            fullWidth
          />
          <Input
            label="Student ID"
            name="studentid"
            value={formData.studentid}
            onChange={handleChange}
            placeholder="2021001234"
            required
            fullWidth
          />
          <Input
            label="Program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            placeholder="BS IT"
            required
            fullWidth
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@lspu.edu.ph"
            required
            fullWidth
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min. 8 characters"
            required
            fullWidth
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            required
            fullWidth
          />

          {error && <div className={styles.error}>{error}</div>}

          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full mt-4">
            Sign Up
          </Button>
        </form>

        <div className={styles.footer}>
          <p>Already have an account? <span className={styles.link} onClick={() => navigate('/login')}>Log In</span></p>
          <p className="mt-2"><span className={styles.link} onClick={() => navigate('/')}>Back to Home</span></p>
        </div>
      </div>
    </div>
  );
};
