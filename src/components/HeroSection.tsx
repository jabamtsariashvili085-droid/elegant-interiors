import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-living-room.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
      <img
        src={heroImage}
        alt="Modern living room"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={900}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsla(30,10%,15%,0.6) 0%, hsla(30,10%,15%,0.15) 100%)' }} />
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: 'white' }}>
            {t.hero.title}
            <br />
            <span className="text-primary-foreground">{t.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg lg:text-xl mb-8 opacity-90" style={{ color: 'white' }}>
            {t.hero.subtitle}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all text-sm lg:text-base"
          >
            {t.hero.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
