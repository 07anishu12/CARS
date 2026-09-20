import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const Card: React.FC<CardProps> = ({
  as: Tag = 'div',
  children,
  className,
  ...props
}) => {
  return (
    <Tag className={cn('card-ui', className)} {...props}>
      {children}
    </Tag>
  );
};

export default Card;
