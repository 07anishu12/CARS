import React from 'react';
import Image from 'next/image';

export interface CarImageProps {
  src?: string;
  alt: string;
  priority?: boolean;
}

export const CarImage: React.FC<CarImageProps> = ({
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          <span role="img" aria-label="Car Placeholder Icon" style={{ fontSize: '2rem', marginBottom: 'var(--spacing-8)' }}>
            🚗
          </span>
          <span>{src || 'Vehicle Image Placeholder'}</span>
        </div>
      )}
    </div>
  );
};

export default CarImage;
