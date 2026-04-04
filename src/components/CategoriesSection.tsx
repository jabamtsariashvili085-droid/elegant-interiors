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
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-2xl lg:text-3xl font-bold mb-10"
        >
          {t.categories.title}
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className="group block relative rounded-xl overflow-hidden aspect-square"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={640}
                  height={640}
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-sm lg:text-base font-semibold" style={{ color: 'white' }}>{cat.label}</span>
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
