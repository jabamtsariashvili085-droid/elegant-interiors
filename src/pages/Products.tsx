import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleProducts, categories } from '@/lib/products';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { SlidersHorizontal } from 'lucide-react';

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

const Products = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [priceRange, setPriceRange] = useState([50, 2500]);
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(false);

  const categoryNames: Record<string, string> = {
    tables: t.categories.tables,
    livingRoom: t.categories.livingRoom,
    bedroom: t.categories.bedroom,
    hallway: t.categories.hallway,
    other: t.categories.other,
  };

  let products = sampleProducts.map(p => ({ ...p, image: imageMap[p.image] || p.image }));
  if (categoryFilter) products = products.filter(p => p.category === categoryFilter);
  if (onSale) products = products.filter(p => p.oldPrice);
  if (inStock) products = products.filter(p => p.inStock);
  products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-3 block">{t.products.title}</span>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">{t.products.title}</h1>
          <div className="w-12 h-px line-gold mt-4" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 shrink-0 space-y-6"
          >
            <div className="p-5 bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary">{t.categories.title}</h3>
              </div>
              <div className="space-y-1">
                <Link
                  to="/products"
                  className={`block text-sm py-2 px-3 transition-colors font-body ${
                    !categoryFilter ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.products.viewAll}
                </Link>
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    className={`block text-sm py-2 px-3 transition-colors font-body ${
                      categoryFilter === cat.id ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {categoryNames[cat.id]}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-5 bg-card border border-border">
              <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-4">{t.products.price}</h3>
              <p className="text-sm text-muted-foreground mb-3 font-label">₾{priceRange[0]} — ₾{priceRange[1]}</p>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={50}
                max={2500}
                step={10}
              />
            </div>

            <div className="p-5 bg-card border border-border space-y-4">
              <label className="flex items-center gap-3 text-sm cursor-pointer font-body text-foreground">
                <Checkbox checked={onSale} onCheckedChange={(v) => setOnSale(v as boolean)} />
                {t.products.onSale}
              </label>
              <label className="flex items-center gap-3 text-sm cursor-pointer font-body text-foreground">
                <Checkbox checked={inStock} onCheckedChange={(v) => setInStock(v as boolean)} />
                {t.products.inStock}
              </label>
            </div>
          </motion.aside>

          {/* Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-32 text-muted-foreground font-label text-sm uppercase tracking-widest">
                {t.products.notFound}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
