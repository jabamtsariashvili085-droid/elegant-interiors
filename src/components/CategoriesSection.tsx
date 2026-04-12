import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import catTables from '@/assets/cat-tables.jpg';
import catLiving from '@/assets/cat-living.jpg';
import catBedroom from '@/assets/cat-bedroom.jpg';
import catHallway from '@/assets/cat-hallway.jpg';

const CategoriesSection = () => {
  const { t } = useLanguage();

  const cats = [
    { id: 'tables', label: t.categories.tables, image: catTables },
    { id: 'livingRoom', label: t.categories.livingRoom, image: catLiving },
    { id: 'bedroom', label: t.categories.bedroom, image: catBedroom },
    { id: 'hallway', label: t.categories.hallway, image: catHallway },
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-14"
        >
          <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
            {t.categories.title}
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold">
            {t.categories.title}
          </h2>
          <div className="w-16 h-px line-gold mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className="group block relative overflow-hidden aspect-[3/4]"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width={640}
                  height={853}
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                  <span className="font-heading text-lg lg:text-xl font-semibold text-white mb-2">{cat.label}</span>
                  <span className="font-label text-xs uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {t.products.viewAll} →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
