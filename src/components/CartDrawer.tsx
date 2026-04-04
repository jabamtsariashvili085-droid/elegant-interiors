import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

const cartTranslations = {
  ka: { title: 'კალათა', empty: 'კალათა ცარიელია', total: 'ჯამი', checkout: 'შეკვეთის გაფორმება' },
  en: { title: 'Cart', empty: 'Cart is empty', total: 'Total', checkout: 'Checkout' },
  ru: { title: 'Корзина', empty: 'Корзина пуста', total: 'Итого', checkout: 'Оформить заказ' },
};

const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const { language } = useLanguage();
  const ct = cartTranslations[language];

  const getProductName = (item: typeof items[0]) => {
    const p = item.product;
    return language === 'ka' ? p.nameKa : language === 'en' ? p.nameEn : p.nameRu;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-foreground/40 z-50"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                {ct.title} ({totalItems})
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-1 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBag className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm">{ct.empty}</p>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex gap-4 bg-card rounded-xl p-3 border border-border"
                  >
                    <img
                      src={item.product.image}
                      alt={getProductName(item)}
                      className="w-20 h-20 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{getProductName(item)}</h3>
                      <p className="text-sm font-bold text-foreground mt-1">₾{item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-secondary rounded-md hover:bg-border transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-secondary rounded-md hover:bg-border transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-border space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>{ct.total}</span>
                  <span>₾{totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
                  {ct.checkout}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
