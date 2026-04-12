import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/lib/products';
import { motion, AnimatePresence } from 'framer-motion';

const langLabels: Record<Language, string> = { ka: 'ქარ', en: 'EN', ru: 'RU' };

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.products, path: '/products', hasDropdown: true },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.contact, path: '/contact' },
  ];

  const categoryNames: Record<string, string> = {
    tables: t.categories.tables,
    livingRoom: t.categories.livingRoom,
    bedroom: t.categories.bedroom,
    hallway: t.categories.hallway,
    other: t.categories.other,
  };

  const subcategoryNames: Record<string, string> = t.subcategories as unknown as Record<string, string>;

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileProductsOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-heavy border-b border-border' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-baseline gap-1">
              <span className="font-display text-2xl lg:text-3xl font-bold tracking-tight gold-text">KALE</span>
              <span className="font-display text-2xl lg:text-3xl font-light tracking-tight text-foreground">GROUP</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setProductsOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setProductsOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1.5 text-sm font-label font-medium uppercase tracking-widest transition-colors hover:text-primary ${
                      location.pathname === item.path ? 'text-primary' : 'text-foreground/70'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
                  </Link>

                  {item.hasDropdown && productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 mt-2 glass border border-border shadow-2xl shadow-black/40 p-6 min-w-[500px]"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        {categories.map((cat) => (
                          <div key={cat.id}>
                            <Link
                              to={`/products?category=${cat.id}`}
                              className="font-label font-semibold text-xs text-primary uppercase tracking-widest mb-2 block hover:text-primary/80"
                            >
                              {categoryNames[cat.id]}
                            </Link>
                            <div className="space-y-1.5 mt-2">
                              {cat.subcategories.map((sub) => (
                                <Link
                                  key={sub}
                                  to={`/products?category=${cat.id}&sub=${sub}`}
                                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {subcategoryNames[sub]}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1 lg:gap-2">
              {/* Search */}
              <div className="relative">
                <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 hover:text-primary transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 280 }}
                      exit={{ opacity: 0, width: 0 }}
                      className="absolute right-0 top-full mt-2 overflow-hidden"
                    >
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.nav.search}
                        className="w-full px-4 py-3 glass border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Language */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 p-2.5 hover:text-primary transition-colors text-sm font-label font-medium"
                >
                  <Globe className="w-4 h-4" />
                  {langLabels[language]}
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute right-0 top-full mt-1 glass border border-border shadow-xl shadow-black/30 overflow-hidden min-w-[80px]"
                    >
                      {(Object.keys(langLabels) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => { setLanguage(lang); setLangOpen(false); }}
                          className={`block w-full px-4 py-2.5 text-sm text-left hover:bg-primary/10 hover:text-primary transition-colors ${
                            language === lang ? 'text-primary font-semibold' : 'text-foreground/70'
                          }`}
                        >
                          {langLabels[lang]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User */}
              <Link to="/login" className="hidden sm:block p-2.5 hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0.5 right-0.5 w-4 h-4 gold-gradient text-primary-foreground text-[10px] flex items-center justify-center font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                className="lg:hidden p-2.5 hover:text-primary transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu with Glassmorphism */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-heavy"
          >
            <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
              <nav className="flex-1 space-y-0">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          className={`flex items-center justify-between w-full py-5 text-lg font-heading font-semibold uppercase tracking-wider transition-colors ${
                            location.pathname === item.path ? 'text-primary' : 'text-foreground'
                          }`}
                        >
                          <span>{item.label}</span>
                          <motion.div animate={{ rotate: mobileProductsOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronRight className="w-5 h-5 text-primary" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {mobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-2 pb-3 space-y-4">
                                {categories.map((cat, catIdx) => (
                                  <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: catIdx * 0.05 }}
                                  >
                                    <Link
                                      to={`/products?category=${cat.id}`}
                                      onClick={closeMobile}
                                      className="block text-xs font-label font-bold text-primary uppercase tracking-[0.2em] mb-2"
                                    >
                                      {categoryNames[cat.id]}
                                    </Link>
                                    <div className="space-y-0.5 border-l border-primary/30 pl-4">
                                      {cat.subcategories.map((sub) => (
                                        <Link
                                          key={sub}
                                          to={`/products?category=${cat.id}&sub=${sub}`}
                                          onClick={closeMobile}
                                          className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                          {subcategoryNames[sub]}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={closeMobile}
                        className={`block py-5 font-heading text-lg font-semibold uppercase tracking-wider transition-colors ${
                          location.pathname === item.path ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                    <div className="h-px bg-border/50" />
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-5 pt-6 border-t border-border/50"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <div className="flex gap-2">
                    {(Object.keys(langLabels) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-4 py-2 text-sm font-label font-medium transition-all border ${
                          language === lang
                            ? 'gold-gradient text-primary-foreground border-primary'
                            : 'border-border text-foreground/60 hover:border-primary/50'
                        }`}
                      >
                        {langLabels[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="flex items-center gap-3 py-3 text-foreground font-label font-medium uppercase tracking-wider text-sm"
                >
                  <User className="w-5 h-5 text-primary" />
                  <span>{t.nav.login}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
