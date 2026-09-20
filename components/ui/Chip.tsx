import React from 'react';
import { cn } from '../../utils/cn';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  disabled?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  active = false,
  disabled = false,
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'chip-ui',
        active && 'chip-ui-active',
        disabled && 'chip-ui-disabled',
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </span>
  );
};

export default Chip;
