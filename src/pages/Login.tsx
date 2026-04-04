import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

const Login = () => {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16 lg:py-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card border border-border rounded-2xl p-8"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            {isLogin ? t.nav.login : t.nav.register}
          </h1>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <input
                type="text"
                placeholder={t.contact.name}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
            <input
              type="email"
              placeholder={t.contact.email}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              {isLogin ? t.nav.login : t.nav.register}
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-medium">
              {isLogin ? t.nav.register : t.nav.login}
            </button>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
