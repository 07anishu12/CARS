import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  type = 'button',
  ...props
}) => {
  const variantClass = `btn-ui-${variant}`;
  return (
    <button
      type={type}
      className={cn('btn-ui', variantClass, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
