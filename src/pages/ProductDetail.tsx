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

  const name = language === 'ka' ? product.nameKa : language === 'en' ? product.nameEn : product.nameRu;
  const description = language === 'ka' ? product.descriptionKa : language === 'en' ? product.descriptionEn : product.descriptionRu;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const similarProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const categoryName = t.categories[product.category as keyof typeof t.categories] || product.category;
  const subcategoryName = t.subcategories[product.subcategory as keyof typeof t.subcategories] || product.subcategory;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Fullscreen Zoom Overlay */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={product.images[selectedImage]}
              alt={name}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-10"
        >
          <Link to="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-primary transition-colors">{t.nav.products}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{name}</span>
        </motion.nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main Image */}
            <div
              className="relative rounded-3xl overflow-hidden bg-card border border-border aspect-[4/3] mb-4 group cursor-zoom-in"
              onClick={() => setZoomed(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={product.images[selectedImage]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {discount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                  className="absolute top-5 left-5 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full shadow-lg"
                >
                  -{discount}%
                </motion.span>
              )}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-70 transition-opacity drop-shadow-lg" />
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i
                        ? 'border-primary shadow-md shadow-primary/20 ring-2 ring-primary/10'
                        : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {selectedImage === i && (
                      <motion.div
                        layoutId="thumb-indicator"
                        className="absolute inset-0 border-2 border-primary rounded-2xl"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {categoryName}
              </span>
              <span className="text-xs text-muted-foreground">/ {subcategoryName}</span>
            </div>

            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">{name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < product.rating ? 'fill-accent text-accent' : 'text-border'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.rating}/5)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-foreground tracking-tight">₾{product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">₾{product.oldPrice.toFixed(2)}</span>
              )}
              {discount > 0 && (
                <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">{t.products.inStock}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-full">
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">{t.products.outOfStock}</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-6" />

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">{t.products.description}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-muted/60 border border-border">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{t.products.material}</span>
                <p className="text-sm font-semibold text-foreground mt-1">{product.material}</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/60 border border-border">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{t.products.color}</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-4 h-4 rounded-full border border-border ${
                    product.color === 'green' ? 'bg-green-500' :
                    product.color === 'brown' ? 'bg-amber-700' :
                    product.color === 'gray' ? 'bg-gray-400' :
                    product.color === 'white' ? 'bg-white' : 'bg-muted'
                  }`} />
                  <p className="text-sm font-semibold text-foreground capitalize">{product.color}</p>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="mb-8 p-5 rounded-2xl bg-muted/60 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">{t.products.dimensions} (cm)</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: t.products.width, value: product.dimensions.width },
                  { label: t.products.height, value: product.dimensions.height },
                  { label: t.products.depth, value: product.dimensions.depth },
                ].map((dim) => (
                  <div key={dim.label} className="text-center p-3 rounded-xl bg-background border border-border">
                    <span className="text-xs text-muted-foreground">{dim.label}</span>
                    <p className="text-xl font-bold text-foreground mt-1">{dim.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(product, language)}
              disabled={!product.inStock}
              className="flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground font-semibold py-4 rounded-2xl hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
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
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground">{t.products.similar}</h2>
              <Link to="/products" className="text-sm text-primary hover:underline font-medium">
                {t.nav.products} →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
