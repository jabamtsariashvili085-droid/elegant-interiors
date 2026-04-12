import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/cat-living.jpg';
import { Shield, Award, Truck, Sparkles } from 'lucide-react';

const About = () => {
  const { language, t } = useLanguage();

  const features = [
    { icon: Shield, label: language === 'ka' ? 'გარანტია' : language === 'ru' ? 'Гарантия' : 'Warranty' },
    { icon: Award, label: language === 'ka' ? 'ხარისხი' : language === 'ru' ? 'Качество' : 'Quality' },
    { icon: Truck, label: language === 'ka' ? 'მიწოდება' : language === 'ru' ? 'Доставка' : 'Delivery' },
    { icon: Sparkles, label: language === 'ka' ? 'დიზაინი' : language === 'ru' ? 'Дизайн' : 'Design' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative h-[50vh] overflow-hidden">
          <img src={heroImage} alt="About" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4 block">KALE GROUP</span>
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground">{t.about.title}</h1>
              <div className="w-16 h-px line-gold mx-auto mt-6" />
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <img src={heroImage} alt="About" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute -bottom-6 -right-6 bg-card border border-border p-6">
                <span className="font-display text-4xl font-bold gold-text">10+</span>
                <p className="font-label text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  {language === 'ka' ? 'წლის გამოცდილება' : language === 'ru' ? 'Лет опыта' : 'Years Experience'}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4 block">{t.about.title}</span>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.about.title}</h2>
              <div className="w-12 h-px line-gold mb-8" />
              <p className="text-muted-foreground leading-relaxed font-body text-base mb-10">{t.about.description}</p>

              <div className="grid grid-cols-2 gap-1">
                {features.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 bg-secondary border border-border flex items-center gap-3"
                  >
                    <f.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-label text-xs uppercase tracking-widest text-foreground">{f.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
