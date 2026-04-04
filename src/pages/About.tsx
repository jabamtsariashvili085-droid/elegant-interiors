import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/cat-living.jpg';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative h-[40vh] overflow-hidden">
          <img src={heroImage} alt="About" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-5xl font-bold"
              style={{ color: 'white' }}
            >
              {t.about.title}
            </motion.h1>
          </div>
        </section>
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">{t.about.description}</p>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
