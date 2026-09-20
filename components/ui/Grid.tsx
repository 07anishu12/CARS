import React from 'react';
import { cn } from '../../utils/cn';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  variant?: '12' | 'cards';
}

const Grid: React.FC<GridProps> = ({
  as: Tag = 'div',
  variant = 'cards',
  children,
  className,
  ...props
}) => {
  const gridClass = variant === '12' ? 'grid-12' : 'grid-cards';
  return (
    <Tag className={cn(gridClass, className)} {...props}>
      {children}
    </Tag>
  );
};

export default Grid;
