 'use client';

import { notFound } from "next/navigation";
import { blogs } from "@/lib/blogs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { motion } from "framer-motion";

type Params = {
  params: {
    slug: string;
  };
};

export default function BlogDetailPage({ params }: Params) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return notFound();

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white min-h-screen text-gray-900 dark:from-[#0f172a] dark:to-[#1e293b] dark:text-white transition-colors duration-300">

      {/* Hero Image */}
      <div className="relative w-full h-[320px] sm:h-[450px] md:h-[520px] overflow-hidden rounded-b-3xl shadow-xl">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-10 left-6 sm:left-10 text-white max-w-3xl space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span className="inline-flex items-center gap-1">
              <User className="w-4 h-4" /> {blog.author || "Admin"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {blog.date &&
                new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
            </span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>
      </div>

      {/* Main Blog Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 pb-20"
      >
        <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl p-6 sm:p-10">
          {/* Content */}
          <article className="prose dark:prose-invert prose-lg sm:prose-xl max-w-none prose-slate dark:prose-sky leading-relaxed tracking-wide">
            {blog.content || "Blog content is not available yet."}
          </article>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
