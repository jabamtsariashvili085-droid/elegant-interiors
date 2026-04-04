import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleProducts, categories } from '@/lib/products';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

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

  const subcategoryNames: Record<string, string> = t.subcategories as unknown as Record<string, string>;

  let products = sampleProducts.map(p => ({ ...p, image: imageMap[p.image] || p.image }));
  if (categoryFilter) products = products.filter(p => p.category === categoryFilter);
  if (onSale) products = products.filter(p => p.oldPrice);
  if (inStock) products = products.filter(p => p.inStock);
  products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl lg:text-3xl font-bold mb-8"
        >
          {t.products.title}
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 shrink-0 space-y-6"
          >
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-sm mb-3">{t.categories.title}</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <a
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    className={`block text-sm py-1 transition-colors ${
                      categoryFilter === cat.id ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {categoryNames[cat.id]}
                  </a>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="font-semibold text-sm mb-3">{t.products.price}</h3>
              <p className="text-sm text-muted-foreground mb-2">₾{priceRange[0]} - ₾{priceRange[1]}</p>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={50}
                max={2500}
                step={10}
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={onSale} onCheckedChange={(v) => setOnSale(v as boolean)} />
                {t.products.onSale}
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={inStock} onCheckedChange={(v) => setInStock(v as boolean)} />
                {t.products.inStock}
              </label>
            </div>
          </motion.aside>

          {/* Product Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-20">
                {t.products.title} — 0
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
