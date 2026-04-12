import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const ContactSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4 block">{t.nav.contact}</span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground">{t.contact.title}</h2>
          <div className="w-16 h-px line-gold mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-1 max-w-4xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.22, 1, 0.36, 1] }}
            className="bg-card border border-border p-8 lg:p-10 space-y-8"
          >
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-label text-xs uppercase tracking-widest text-primary mb-1">{t.contact.address}</h3>
                <p className="text-sm text-muted-foreground">თბილისი, საქართველო</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-label text-xs uppercase tracking-widest text-primary mb-1">{t.contact.phone}</h3>
                <p className="text-sm text-muted-foreground">+995 555 123 456</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-label text-xs uppercase tracking-widest text-primary mb-1">{t.contact.email}</h3>
                <p className="text-sm text-muted-foreground">info@kalegroup.ge</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass border border-border p-8 lg:p-10 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder={t.contact.name}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3.5 bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="email"
              placeholder={t.contact.email}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3.5 bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <textarea
              placeholder={t.contact.message}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3.5 bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 w-full py-3.5 gold-gradient text-primary-foreground font-label font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all"
            >
              <Send className="w-4 h-4" />
              {t.contact.send}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
