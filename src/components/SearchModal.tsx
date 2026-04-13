import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
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

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return sampleProducts.filter(p => {
      const name = language === 'ka' ? p.nameKa : language === 'ru' ? p.nameRu : p.nameEn;
      const desc = language === 'ka' ? p.descriptionKa : language === 'ru' ? p.descriptionRu : p.descriptionEn;
      return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    });
  }, [query, language]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const goToProduct = useCallback((id: string) => {
    onClose();
    navigate(`/product/${id}`);
  }, [navigate, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      goToProduct(results[selectedIndex].id);
    }
  }, [results, selectedIndex, goToProduct]);

  const getName = (p: typeof sampleProducts[0]) =>
    language === 'ka' ? p.nameKa : language === 'ru' ? p.nameRu : p.nameEn;

  const searchLabels = {
    ka: { placeholder: 'პროდუქტის ძებნა...', noResults: 'არაფერი მოიძებნა', hint: 'ძებნა' },
    en: { placeholder: 'Search products...', noResults: 'No results found', hint: 'Search' },
    ru: { placeholder: 'Поиск товаров...', noResults: 'Ничего не найдено', hint: 'Поиск' },
  };
  const labels = searchLabels[language];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg mx-4 glass-heavy border border-border shadow-2xl shadow-black/50 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-5 h-5 text-primary shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={labels.placeholder}
                className="flex-1 bg-transparent text-foreground text-sm font-body placeholder:text-muted-foreground outline-none"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-label text-muted-foreground border border-border bg-muted/30">
                  ESC
                </kbd>
                <button onClick={onClose} className="p-1 hover:text-primary transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results */}
            {query.trim() && (
              <div className="max-h-[300px] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map((product, i) => (
                      <motion.button
                        key={product.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => goToProduct(product.id)}
                        className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-colors ${
                          i === selectedIndex ? 'bg-primary/10' : 'hover:bg-muted/20'
                        }`}
                      >
                        <div className="w-12 h-12 shrink-0 overflow-hidden border border-border">
                          <img
                            src={imageMap[product.image] || product.image}
                            alt={getName(product)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-body text-foreground truncate">{getName(product)}</p>
                          <p className="text-xs text-muted-foreground font-label mt-0.5">
                            ₾{product.price}
                            {product.oldPrice && (
                              <span className="line-through ml-2 text-muted-foreground/50">₾{product.oldPrice}</span>
                            )}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary/50 shrink-0" />
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center text-sm text-muted-foreground font-label">
                    {labels.noResults}
                  </div>
                )}
              </div>
            )}

            {/* Footer hint */}
            {!query.trim() && (
              <div className="px-5 py-6 text-center text-xs text-muted-foreground/60 font-label tracking-wider uppercase">
                {labels.hint} · Ctrl+K
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
