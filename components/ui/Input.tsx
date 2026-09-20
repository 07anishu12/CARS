import React from 'react';
import { cn } from '../../utils/cn';

export type InputProps = 
  | ({ as?: 'input'; options?: never } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({ as: 'select'; options?: Array<{ label: string; value: string }> } & React.SelectHTMLAttributes<HTMLSelectElement>)
  | ({ as: 'textarea'; options?: never } & React.TextareaHTMLAttributes<HTMLTextAreaElement>);

const Input: React.FC<InputProps> = ({
  as = 'input',
  options,
  className,
  ...props
}) => {
  if (as === 'select' && options) {
    const selectProps = props as React.SelectHTMLAttributes<HTMLSelectElement>;
    return (
      <select
        className={cn('input-ui', className)}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (as === 'textarea') {
    const textareaProps = props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    return (
      <textarea
        className={cn('input-ui', className)}
        {...textareaProps}
      />
    );
  }

  const inputProps = props as React.InputHTMLAttributes<HTMLInputElement>;
  return (
    <input
      className={cn('input-ui', className)}
      {...inputProps}
    />
  );
};

export default Input;
