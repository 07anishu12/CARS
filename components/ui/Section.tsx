import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

const Section: React.FC<SectionProps> = ({
  as: Tag = 'section',
  children,
  className,
  ...props
}) => {
  return (
    <Tag className={cn('section', className)} {...props}>
      {children}
    </Tag>
  );
};

export default Section;
