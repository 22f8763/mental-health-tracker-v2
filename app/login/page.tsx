 "use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        router.push(redirect);
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router, redirect]);

  const handleLogin = async () => {
    if (!email || !name) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSending(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error("Something went wrong. Try again.");
    } else {
      toast.success("Magic link sent! Check your email.");
    }

    setSending(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <span className="animate-pulse text-lg text-gray-600">
          Checking authentication...
        </span>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-100 to-indigo-100 px-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
          🔐 Login with Magic Link
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-800"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-800"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={sending}
            type="submit"
            className={`w-full py-3 rounded-md text-white text-lg font-semibold transition duration-300 ${
              sending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {sending ? "Sending Link..." : "Send Magic Link"}
          </motion.button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          No passwords required. Just check your inbox 📬
        </p>
      </motion.div>
    </main>
  );
}
