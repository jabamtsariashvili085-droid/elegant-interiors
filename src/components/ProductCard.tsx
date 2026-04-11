import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const name = language === 'ka' ? product.nameKa : language === 'en' ? product.nameEn : product.nameRu;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative rounded-xl overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow duration-300">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              width={640}
              height={640}
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-discount text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-medium text-sm lg:text-base text-foreground mb-1 line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < product.rating ? 'fill-accent text-accent' : 'text-border'}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">₾{product.oldPrice.toFixed(2)}</span>
              )}
              <span className="font-bold text-foreground">₾{product.price.toFixed(2)}</span>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); addToCart(product, language); }}
              className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {t.products.addToCart}
            </button>
          </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
