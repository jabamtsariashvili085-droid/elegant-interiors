import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-living-room.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <img
        src={heroImage}
        alt="Luxury furniture"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />

      {/* Split Overlay */}
      <div className="absolute inset-0 flex">
        {/* Left - Heavy frosted glass */}
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" />
          <div className="relative h-full flex items-center justify-end pr-4 lg:pr-8">
            <motion.span
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl sm:text-7xl lg:text-[10rem] font-bold tracking-tight gold-text select-none"
            >
              KALE
            </motion.span>
          </div>
        </div>

        {/* Right - Clear with light overlay */}
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-background/20" />
          <div className="relative h-full flex items-center justify-start pl-4 lg:pl-8">
            <motion.span
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl sm:text-7xl lg:text-[10rem] font-light tracking-tight text-white select-none"
            >
              GROUP
            </motion.span>
          </div>
        </div>
      </div>

      {/* Bottom content overlay */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container mx-auto px-4 pb-12 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Badge */}
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary border border-primary/30 px-6 py-2 mb-6">
              PREMIUM FURNITURE
            </span>

            <p className="text-foreground/70 text-sm lg:text-base max-w-md mb-8 font-body">
              {t.hero.subtitle}
            </p>

            <div className="flex gap-4">
              <Link
                to="/products"
                className="group flex items-center gap-2 px-8 py-3.5 gold-gradient text-primary-foreground font-label font-semibold text-sm uppercase tracking-widest hover:opacity-90 transition-all"
              >
                {t.hero.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-8 py-3.5 border border-foreground/30 text-foreground font-label font-semibold text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
              >
                {t.nav.contact}
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-center gap-12 lg:gap-20 mt-12 pt-8 border-t border-foreground/10"
          >
            {[
              { value: '10+', label: language === 'ka' ? 'წლის გამოცდილება' : 'Years' },
              { value: '500+', label: language === 'ka' ? 'პროექტი' : 'Projects' },
              { value: '100%', label: language === 'ka' ? 'ხარისხი' : 'Quality' },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="font-display text-2xl lg:text-3xl font-bold gold-text">{stat.value}</p>
                <p className="font-label text-xs uppercase tracking-widest text-foreground/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border border-foreground/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

// Need language in scope for the stats
const HeroWrapper = () => {
  const { language } = useLanguage();
  return <HeroSectionInner language={language} />;
};

const HeroSectionInner = ({ language }: { language: string }) => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen overflow-hidden">
      <img
        src={heroImage}
        alt="Luxury furniture"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />

      <div className="absolute inset-0 flex">
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" />
          <div className="relative h-full flex items-center justify-end pr-4 lg:pr-8">
            <motion.span
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl sm:text-7xl lg:text-[10rem] font-bold tracking-tight gold-text select-none"
            >
              KALE
            </motion.span>
          </div>
        </div>

        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-background/20" />
          <div className="relative h-full flex items-center justify-start pl-4 lg:pl-8">
            <motion.span
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl sm:text-7xl lg:text-[10rem] font-light tracking-tight text-white select-none"
            >
              GROUP
            </motion.span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="container mx-auto px-4 pb-12 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary border border-primary/30 px-6 py-2 mb-6">
              PREMIUM FURNITURE
            </span>

            <p className="text-foreground/70 text-sm lg:text-base max-w-md mb-8 font-body">
              {t.hero.subtitle}
            </p>

            <div className="flex gap-4">
              <Link
                to="/products"
                className="group flex items-center gap-2 px-8 py-3.5 gold-gradient text-primary-foreground font-label font-semibold text-sm uppercase tracking-widest hover:opacity-90 transition-all"
              >
                {t.hero.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-8 py-3.5 border border-foreground/30 text-foreground font-label font-semibold text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
              >
                {t.nav.contact}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-center gap-12 lg:gap-20 mt-12 pt-8 border-t border-foreground/10"
          >
            {[
              { value: '10+', label: language === 'ka' ? 'წლის გამოცდილება' : language === 'ru' ? 'Лет опыта' : 'Years Experience' },
              { value: '500+', label: language === 'ka' ? 'პროექტი' : language === 'ru' ? 'Проектов' : 'Projects' },
              { value: '100%', label: language === 'ka' ? 'ხარისხი' : language === 'ru' ? 'Качество' : 'Quality' },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="font-display text-2xl lg:text-3xl font-bold gold-text">{stat.value}</p>
                <p className="font-label text-xs uppercase tracking-widest text-foreground/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border border-foreground/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroWrapper;
