 import { notFound } from "next/navigation";
import { blogs } from "@/lib/blogs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

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
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        {blog.title}
      </h1>

      {/* Metadata */}
      <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          {blog.author || "Author"}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {blog.date || "Date"}
        </div>
      </div>

      {/* Blog image */}
      <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden shadow">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Blog content */}
      <div className="prose prose-lg max-w-none text-gray-800">
        <div style={{ whiteSpace: 'pre-line' }}>
          {blog.content}
        </div>
      </div>
    </div>
  );
}