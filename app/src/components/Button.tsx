import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'alert';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${isLoading ? styles.loading : ''} ${className || ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className={styles.spinner} />}
      {!isLoading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      {children}
    </button>
  );
};
