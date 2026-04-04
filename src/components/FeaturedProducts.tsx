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
    <section className="py-16 lg:py-24 bg-warm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-bold"
          >
            {t.products.featured}
          </motion.h2>
          <Link
            to="/products"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t.products.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
