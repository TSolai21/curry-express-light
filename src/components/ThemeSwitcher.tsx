import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    // Check localStorage or default to dark
    const saved = localStorage.getItem('app-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    // Apply theme to html element
    const root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-bg transition-colors duration-300 focus:outline-none flex items-center justify-center cursor-pointer"
      aria-label="Toggle Theme"
      title="Toggle Light/Dark Mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 0 }}
        className="absolute"
        transition={{ duration: 0.3 }}
      >
        <Moon className="w-5 h-5" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : -180, scale: theme === 'light' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Sun className="w-5 h-5" />
      </motion.div>
    </button>
  );
}
