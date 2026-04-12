import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Check, X, Ruler, ChevronRight, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { sampleProducts } from '@/lib/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const product = sampleProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <p className="text-xl text-muted-foreground mb-4">{t.products.notFound}</p>
            <Link to="/products" className="text-primary hover:underline">{t.products.backToProducts}</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const resolvedProduct = { ...product, image: imageMap[product.image] || product.image, images: product.images.map(img => imageMap[img] || img) };

  const name = language === 'ka' ? product.nameKa : language === 'en' ? product.nameEn : product.nameRu;
  const description = language === 'ka' ? product.descriptionKa : language === 'en' ? product.descriptionEn : product.descriptionRu;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const similarProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
    .map(p => ({ ...p, image: imageMap[p.image] || p.image }));

  const categoryName = t.categories[product.category as keyof typeof t.categories] || product.category;
  const subcategoryName = t.subcategories[product.subcategory as keyof typeof t.subcategories] || product.subcategory;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Fullscreen Zoom */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={resolvedProduct.images[selectedImage]}
              alt={name}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-10 font-label"
        >
          <Link to="/" className="hover:text-primary transition-colors uppercase tracking-wider text-xs">{t.nav.home}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-primary transition-colors uppercase tracking-wider text-xs">{t.nav.products}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground text-xs truncate max-w-[200px]">{name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative overflow-hidden bg-card border border-border aspect-square cursor-zoom-in group"
              onClick={() => setZoomed(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={resolvedProduct.images[selectedImage]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {discount > 0 && (
                <span className="absolute top-0 left-0 bg-destructive text-destructive-foreground text-xs font-label font-bold px-4 py-2 uppercase tracking-wider">
                  -{discount}%
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>
            {resolvedProduct.images.length > 1 && (
              <div className="flex gap-1 mt-1">
                {resolvedProduct.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 overflow-hidden border transition-all ${
                      selectedImage === i ? 'border-primary' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col p-6 lg:p-10 border border-border border-l-0 bg-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">
                {categoryName}
              </span>
              <span className="text-muted-foreground text-xs">/</span>
              <span className="font-label text-xs text-muted-foreground">{subcategoryName}</span>
            </div>

            <h1 className="font-heading text-2xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">{name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-primary text-primary' : 'text-border'}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-label">({product.rating}/5)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-heading font-bold gold-text">₾{product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through font-label">₾{product.oldPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-label uppercase tracking-wider">
                  <Check className="w-4 h-4" />
                  {t.products.inStock}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-destructive text-xs font-label uppercase tracking-wider">
                  <X className="w-4 h-4" />
                  {t.products.outOfStock}
                </div>
              )}
            </div>

            <div className="h-px bg-border mb-6" />

            <div className="mb-6">
              <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-3">{t.products.description}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-body">{description}</p>
            </div>

            <div className="grid grid-cols-2 gap-1 mb-6">
              <div className="p-4 bg-secondary border border-border">
                <span className="font-label text-[10px] uppercase tracking-widest text-muted-foreground">{t.products.material}</span>
                <p className="text-sm font-heading font-semibold text-foreground mt-1">{product.material}</p>
              </div>
              <div className="p-4 bg-secondary border border-border">
                <span className="font-label text-[10px] uppercase tracking-widest text-muted-foreground">{t.products.color}</span>
                <p className="text-sm font-heading font-semibold text-foreground mt-1 capitalize">{product.color}</p>
              </div>
            </div>

            <div className="mb-8 p-5 bg-secondary border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-4 h-4 text-primary" />
                <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary">{t.products.dimensions} (cm)</h3>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { label: t.products.width, value: product.dimensions.width },
                  { label: t.products.height, value: product.dimensions.height },
                  { label: t.products.depth, value: product.dimensions.depth },
                ].map((dim) => (
                  <div key={dim.label} className="text-center p-3 bg-background border border-border">
                    <span className="font-label text-[10px] uppercase tracking-widest text-muted-foreground">{dim.label}</span>
                    <p className="text-xl font-heading font-bold text-foreground mt-1">{dim.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => addToCart(product, language)}
              disabled={!product.inStock}
              className="flex items-center justify-center gap-3 w-full gold-gradient text-primary-foreground font-label font-bold text-sm uppercase tracking-widest py-4 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              {t.products.addToCart}
            </motion.button>
          </motion.div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-3 block">{t.products.similar}</span>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground">{t.products.similar}</h2>
                <div className="w-12 h-px line-gold mt-4" />
              </div>
              <Link to="/products" className="font-label text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                {t.products.viewAll} →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
              {similarProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link to={`/product/${p.id}`}>
                    <ProductCard product={p} index={i} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
