import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  padding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, title, padding = true }) => {
  return (
    <div className={`${styles.card} ${padding ? styles.padding : ''} ${className || ''}`}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </div>
  );
};
