 'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Journal', href: '/journal' },
  { name: 'Stats', href: '/stats' },
  { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [userName, setUserName] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const name = session?.user?.user_metadata?.name ?? null;
      setUserName(name);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserName(null);
    router.push('/login');
  };

  const combinedNavItems = [
    ...navItems,
    userName
      ? { name: `Hi, ${userName}`, href: '/profile' }
      : { name: 'Login', href: '/login' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-indigo-600">
          🧠 MHT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-5">
          {combinedNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
          {userName && (
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 text-sm font-medium transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-6 pt-4 pb-6 space-y-3 bg-white shadow-md rounded-b-xl"
          >
            {combinedNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`block px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {userName && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
