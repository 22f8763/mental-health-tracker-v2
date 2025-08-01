'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push('/login');
      } else {
        setUserEmail(data.user.email || '');
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-100">
        <div className="text-xl text-purple-700 animate-pulse">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-700 animate-fadeIn">Welcome!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-600">
          You’re logged in as: <span className="font-medium text-black">{userEmail}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Card title="📄 Profile" desc="View and edit your user profile." />
          <Card title="⚙️ Settings" desc="Manage account preferences and alerts." />
          <Card title="📊 Analytics" desc="Check usage stats and reports." />
          <Card title="🔐 Security" desc="Update password and 2FA settings." />
        </div>
      </div>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-5 bg-purple-50 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
      <h2 className="font-semibold text-lg text-purple-600 mb-2">{title}</h2>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}
