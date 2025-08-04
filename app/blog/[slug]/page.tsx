
'use client';

import { notFound } from "next/navigation";
import { blogs } from "@/lib/blogs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";

// ✅ Import safe wrapper instead of directly from 'framer-motion'
import { motion } from "@/components/motion";

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-500 hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4 text-gray-800"
      >
        {blog.title}
      </motion.h1>

      {/* Metadata */}
      <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          {blog.author}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {blog.date}
        </div>
      </div>

      {/* Blog image */}
      <motion.div
        className="relative w-full h-64 mb-6 rounded-xl overflow-hidden shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src={blog.image}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </motion.div>

      {/* Blog content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="prose prose-lg max-w-none text-gray-800"
      >
        <p>{blog.content}</p>
      </motion.div>
    </div>
  );
}
