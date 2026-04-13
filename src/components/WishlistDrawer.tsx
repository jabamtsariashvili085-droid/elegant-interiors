import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleProducts } from '@/lib/products';

import productSofa from '@/assets/product-sofa.jpg';
import productTable from '@/assets/product-table.jpg';
import productArmchair from '@/assets/product-armchair.jpg';
import productWardrobe from '@/assets/product-wardrobe.jpg';
import productDesk from '@/assets/product-desk.jpg';
import productCommode from '@/assets/product-commode.jpg';

const imageMap: Record<string, string> = {
  '/images/product-1.jpg': productSofa,
  '/images/product-2.jpg': productTable,
  '/images/product-3.jpg': productArmchair,
  '/images/product-4.jpg': productWardrobe,
  '/images/product-5.jpg': productDesk,
  '/images/product-6.jpg': productCommode,
};

const labels = {
  ka: { title: 'სურვილების სია', empty: 'სია ცარიელია', addToCart: 'კალათაში' },
  en: { title: 'Wishlist', empty: 'Wishlist is empty', addToCart: 'Add to Cart' },
  ru: { title: 'Избранное', empty: 'Список пуст', addToCart: 'В корзину' },
};

const WishlistDrawer = () => {
  const { wishlist, toggleWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const l = labels[language];

  const products = wishlist
    .map(id => sampleProducts.find(p => p.id === id))
    .filter(Boolean) as typeof sampleProducts;

  const getName = (p: typeof sampleProducts[0]) =>
    language === 'ka' ? p.nameKa : language === 'ru' ? p.nameRu : p.nameEn;

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-heading text-lg font-bold flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                {l.title} ({products.length})
              </h2>
              <button onClick={() => setIsWishlistOpen(false)} className="p-1.5 hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Heart className="w-12 h-12 mb-3 opacity-20" />
                  <p className="font-label text-sm uppercase tracking-widest">{l.empty}</p>
                </div>
              ) : (
                products.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex gap-4 bg-secondary p-3 border border-border"
                  >
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="shrink-0"
                    >
                      <img
                        src={imageMap[product.image] || product.image}
                        alt={getName(product)}
                        className="w-20 h-20 object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="text-sm font-heading font-medium truncate block hover:text-primary transition-colors"
                      >
                        {getName(product)}
                      </Link>
                      <p className="text-sm font-bold gold-text mt-1">₾{product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => { addToCart(product, language); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-label font-semibold uppercase tracking-wider gold-gradient text-primary-foreground hover:opacity-90 transition-opacity"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {l.addToCart}
                        </button>
                        <button
                          onClick={() => toggleWishlist(product.id, language)}
                          className="ml-auto p-1.5 text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
