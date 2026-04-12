import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-baseline gap-1 mb-4">
              <span className="font-display text-2xl font-bold gold-text">KALE</span>
              <span className="font-display text-2xl font-light text-foreground">GROUP</span>
            </Link>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">{t.about.description}</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6">{t.nav.products}</h4>
            <div className="space-y-3">
              <Link to="/products?category=tables" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.categories.tables}</Link>
              <Link to="/products?category=livingRoom" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.categories.livingRoom}</Link>
              <Link to="/products?category=bedroom" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.categories.bedroom}</Link>
              <Link to="/products?category=other" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.categories.other}</Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6">{t.nav.about}</h4>
            <div className="space-y-3">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.about}</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.contact}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6">{t.nav.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                info@kalegroup.ge
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                +995 555 123 456
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                თბილისი, საქართველო
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-label uppercase tracking-widest">
            © 2026 KALE GROUP. {t.footer.rights}.
          </p>
          <div className="w-12 h-px line-gold" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
