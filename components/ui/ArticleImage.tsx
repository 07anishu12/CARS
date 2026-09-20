import React from 'react';
import Image from 'next/image';

export interface ArticleImageProps {
  src?: string;
  alt: string;
  priority?: boolean;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({
  src,
  alt,
  priority = false
}) => {
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        aspectRatio: '16 / 9', 
        backgroundColor: 'var(--background)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        border: '1px solid var(--border)'
      }}
    >
      {src && src.startsWith('/') ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          loading={priority ? 'eager' : 'lazy'}
        />
      ) : (
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%', 
            color: 'var(--muted)',
            fontSize: 'var(--fs-caption)'
          }}
        >
          <span role="img" aria-label="Article Placeholder Icon" style={{ fontSize: '2rem', marginBottom: 'var(--spacing-8)' }}>
            📖
          </span>
          <span>{src || 'Editorial Illustration'}</span>
        </div>
      )}
    </div>
  );
};

export default ArticleImage;
