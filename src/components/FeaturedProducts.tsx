import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleProducts } from '@/lib/products';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const products = sampleProducts.map(p => ({ ...p, image: imageMap[p.image] || p.image }));

  return (
    <section id="products" className="py-20 lg:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
              {t.products.featured}
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold">
              {t.products.featured}
            </h2>
            <div className="w-16 h-px line-gold mt-6" />
          </motion.div>
          <Link
            to="/products"
            className="group hidden lg:flex items-center gap-2 font-label text-sm uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
          >
            {t.products.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-1">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <Link
          to="/products"
          className="lg:hidden flex items-center justify-center gap-2 mt-8 font-label text-sm uppercase tracking-widest text-primary"
        >
          {t.products.viewAll}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
