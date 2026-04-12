import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Award, Truck, Sparkles } from 'lucide-react';
import heroImage from '@/assets/cat-bedroom.jpg';

const AboutSection = () => {
  const { language, t } = useLanguage();

  const features = [
    { icon: Shield, label: language === 'ka' ? 'გარანტია' : language === 'ru' ? 'Гарантия' : 'Warranty' },
    { icon: Award, label: language === 'ka' ? 'ხარისხი' : language === 'ru' ? 'Качество' : 'Quality' },
    { icon: Truck, label: language === 'ka' ? 'მიწოდება' : language === 'ru' ? 'Доставка' : 'Delivery' },
    { icon: Sparkles, label: language === 'ka' ? 'დიზაინი' : language === 'ru' ? 'Дизайн' : 'Design' },
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-1 items-stretch">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <img src={heroImage} alt="About" className="w-full h-full object-cover min-h-[400px]" loading="lazy" />
            <div className="absolute bottom-0 left-0 bg-card border border-border p-6">
              <span className="font-display text-4xl font-bold gold-text">10+</span>
              <p className="font-label text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {language === 'ka' ? 'წლის გამოცდილება' : language === 'ru' ? 'Лет опыта' : 'Years Experience'}
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-card border border-border p-8 lg:p-12 flex flex-col justify-center"
          >
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4 block">{t.about.title}</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              <span className="gold-text">KALE</span> GROUP
            </h2>
            <div className="w-12 h-px line-gold mb-8" />
            <p className="text-muted-foreground leading-relaxed font-body text-sm lg:text-base mb-10">
              {t.about.description}
            </p>

            <div className="grid grid-cols-2 gap-1">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="p-4 bg-secondary border border-border flex items-center gap-3"
                >
                  <f.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-label text-xs uppercase tracking-widest text-foreground">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
