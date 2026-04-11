import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingCart, Check, X, Ruler } from 'lucide-react';
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

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <Link to="/" className="hover:text-foreground transition-colors">{t.nav.home}</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground transition-colors">{t.nav.products}</Link>
          <span>/</span>
          <span className="text-foreground">{name}</span>
        </motion.nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-card border border-border aspect-square mb-4">
              <img
                src={product.images[selectedImage]}
                alt={name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-discount text-primary-foreground text-sm font-bold px-3 py-1.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
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
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              {categoryName} / {subcategoryName}
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? 'fill-accent text-accent' : 'text-border'}`}
                />
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">₾{product.oldPrice.toFixed(2)}</span>
              )}
              <span className="text-3xl font-bold text-foreground">₾{product.price.toFixed(2)}</span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">{t.products.inStock}</span>
                </>
              ) : (
                <>
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500 font-medium">{t.products.outOfStock}</span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">{t.products.description}</h3>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-muted/50 border border-border">
              <div>
                <span className="text-xs text-muted-foreground">{t.products.material}</span>
                <p className="text-sm font-medium text-foreground">{product.material}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">{t.products.color}</span>
                <p className="text-sm font-medium text-foreground capitalize">{product.color}</p>
              </div>
            </div>

            {/* Dimensions */}
            <div className="mb-8 p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{t.products.dimensions} (cm)</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="text-xs text-muted-foreground">{t.products.width}</span>
                  <p className="text-lg font-bold text-foreground">{product.dimensions.width}</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-muted-foreground">{t.products.height}</span>
                  <p className="text-lg font-bold text-foreground">{product.dimensions.height}</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-muted-foreground">{t.products.depth}</span>
                  <p className="text-lg font-bold text-foreground">{product.dimensions.depth}</p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product, language)}
              disabled={!product.inStock}
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              <ShoppingCart className="w-5 h-5" />
              {t.products.addToCart}
            </button>
          </motion.div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.products.similar}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {similarProducts.map((p, i) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <ProductCard product={p} index={i} />
                </Link>
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
