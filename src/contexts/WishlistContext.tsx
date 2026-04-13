import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (productId: string, lang?: 'ka' | 'en' | 'ru') => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'kale-wishlist';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = useCallback((productId: string, lang: 'ka' | 'en' | 'ru' = 'ka') => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        const msgs = { ka: 'წაიშალა სურვილების სიიდან', en: 'Removed from wishlist', ru: 'Удалено из избранного' };
        toast(msgs[lang]);
        return prev.filter(id => id !== productId);
      } else {
        const msgs = { ka: 'დაემატა სურვილების სიაში', en: 'Added to wishlist', ru: 'Добавлено в избранное' };
        toast.success(msgs[lang]);
        return [...prev, productId];
      }
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);
  const clearWishlist = useCallback(() => setWishlist([]), []);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist, isWishlistOpen, setIsWishlistOpen }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
