import React from 'react';
import { cn } from '../../utils/cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const Container: React.FC<ContainerProps> = ({
  as: Tag = 'div',
  children,
  className,
  ...props
}) => {
  return (
    <Tag className={cn('container', className)} {...props}>
      {children}
    </Tag>
  );
};

export default Container;
