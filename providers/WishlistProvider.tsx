'use client';

import React, { useState, useCallback } from 'react';
import { WishlistContext } from '../contexts/WishlistContext';

export interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = useCallback((carId: string) => {
    setWishlist((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      } else {
        return [...prev, carId];
      }
    });
  }, []);

  const isWishlisted = useCallback((carId: string) => {
    return wishlist.includes(carId);
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};
