'use client';

import { createContext } from 'react';

export interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (carId: string) => void;
  isWishlisted: (carId: string) => boolean;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
