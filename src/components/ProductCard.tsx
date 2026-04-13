import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const name = language === 'ka' ? product.nameKa : language === 'en' ? product.nameEn : product.nameRu;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              width={640}
              height={640}
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />

            {discount > 0 && (
              <span className="absolute top-0 left-0 bg-destructive text-destructive-foreground text-xs font-label font-bold px-3 py-1.5 uppercase tracking-wider">
                -{discount}%
              </span>
            )}

            {/* Wishlist button */}
            <button
              onClick={(e) => { e.preventDefault(); toggleWishlist(product.id, language); }}
              className="absolute top-3 right-3 p-2 glass border border-border hover:border-primary/50 transition-all z-10"
            >
              <Heart className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-primary text-primary' : 'text-foreground/60 hover:text-primary'}`} />
            </button>

            {/* Hover Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <button
                onClick={(e) => { e.preventDefault(); addToCart(product, language); }}
                className="flex items-center justify-center gap-2 w-full gold-gradient text-primary-foreground font-label font-semibold text-xs uppercase tracking-widest py-3 hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="w-4 h-4" />
                {t.products.addToCart}
              </button>
            </div>
          </div>

          <div className="p-4 lg:p-5">
            <h3 className="font-heading font-medium text-sm lg:text-base text-foreground mb-2 line-clamp-1">{name}</h3>
            <div className="flex items-center gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < product.rating ? 'fill-primary text-primary' : 'text-border'}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through font-label">₾{product.oldPrice.toFixed(2)}</span>
              )}
              <span className="font-heading font-bold text-lg text-foreground">₾{product.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
