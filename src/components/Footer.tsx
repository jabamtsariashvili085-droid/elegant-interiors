import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FURNIFY</h3>
            <p className="text-sm opacity-70">{t.about.description}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t.nav.products}</h4>
            <div className="space-y-2 text-sm opacity-70">
              <Link to="/products?category=tables" className="block hover:opacity-100">{t.categories.tables}</Link>
              <Link to="/products?category=livingRoom" className="block hover:opacity-100">{t.categories.livingRoom}</Link>
              <Link to="/products?category=bedroom" className="block hover:opacity-100">{t.categories.bedroom}</Link>
              <Link to="/products?category=other" className="block hover:opacity-100">{t.categories.other}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t.nav.about}</h4>
            <div className="space-y-2 text-sm opacity-70">
              <Link to="/about" className="block hover:opacity-100">{t.nav.about}</Link>
              <Link to="/contact" className="block hover:opacity-100">{t.nav.contact}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t.nav.contact}</h4>
            <div className="space-y-2 text-sm opacity-70">
              <p>info@furnify.ge</p>
              <p>+995 555 123 456</p>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="opacity-70 hover:opacity-100"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="opacity-70 hover:opacity-100"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="opacity-70 hover:opacity-100"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm opacity-50">
          © 2026 FURNIFY. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
