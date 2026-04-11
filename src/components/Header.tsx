import { useState } from 'react';
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
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
              FURNIFY
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setProductsOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setProductsOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === item.path ? 'text-primary' : 'text-foreground'
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
                      className="absolute top-full left-0 mt-2 bg-popover border border-border rounded-xl shadow-xl p-6 min-w-[500px]"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        {categories.map((cat) => (
                          <div key={cat.id}>
                            <Link
                              to={`/products?category=${cat.id}`}
                              className="font-semibold text-sm text-foreground mb-2 block hover:text-primary"
                            >
                              {categoryNames[cat.id]}
                            </Link>
                            <div className="space-y-1">
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
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Search */}
              <div className="relative">
                <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-secondary rounded-xl transition-colors">
                  <Search className="w-5 h-5 text-foreground" />
                </button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 250 }}
                      exit={{ opacity: 0, width: 0 }}
                      className="absolute right-0 top-full mt-2 overflow-hidden"
                    >
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.nav.search}
                        className="w-full px-4 py-2.5 bg-popover border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Language Switcher */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 p-2 hover:bg-secondary rounded-xl transition-colors text-sm font-medium"
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
                      className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-xl shadow-lg overflow-hidden"
                    >
                      {(Object.keys(langLabels) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => { setLanguage(lang); setLangOpen(false); }}
                          className={`block w-full px-4 py-2.5 text-sm text-left hover:bg-secondary transition-colors ${
                            language === lang ? 'bg-secondary font-semibold' : ''
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
              <Link to="/login" className="hidden sm:block p-2 hover:bg-secondary rounded-xl transition-colors">
                <User className="w-5 h-5 text-foreground" />
              </Link>

              {/* Cart */}
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-secondary rounded-xl transition-colors">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 hover:bg-secondary rounded-xl transition-colors"
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

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background"
          >
            <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
              {/* Nav Links */}
              <nav className="flex-1 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                  >
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          className={`flex items-center justify-between w-full py-4 text-lg font-semibold transition-colors ${
                            location.pathname === item.path ? 'text-primary' : 'text-foreground'
                          }`}
                        >
                          <span className="font-display text-xl">{item.label}</span>
                          <motion.div
                            animate={{ rotate: mobileProductsOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
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
                                      className="block text-sm font-bold text-primary uppercase tracking-wider mb-1.5"
                                    >
                                      {categoryNames[cat.id]}
                                    </Link>
                                    <div className="space-y-0.5 border-l-2 border-border pl-4">
                                      {cat.subcategories.map((sub) => (
                                        <Link
                                          key={sub}
                                          to={`/products?category=${cat.id}&sub=${sub}`}
                                          onClick={closeMobile}
                                          className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                        className={`block py-4 font-display text-xl font-semibold transition-colors ${
                          location.pathname === item.path ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-border" />
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-5 pt-6 border-t border-border"
              >
                {/* Language */}
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div className="flex gap-2">
                    {(Object.keys(langLabels) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          language === lang
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {langLabels[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Login */}
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="flex items-center gap-3 py-3 text-foreground font-medium"
                >
                  <User className="w-5 h-5" />
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
