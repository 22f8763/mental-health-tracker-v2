 'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { blogs } from '@/lib/blogs' // ✅ FIXED: import from lib

export default function BlogPage() {
  const router = useRouter()

  const handleClick = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dfe9f3] to-white">
      <div
        className="relative h-[50vh] bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/images/mental-health-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug drop-shadow-md">
            Human Health Blog
          </h1>
          <p className="mt-4 text-base md:text-lg font-light text-white/90 drop-shadow-sm">
            Discover unique health insights, inspiring personal journeys, and platform updates
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <motion.div
            key={blog.slug}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-100"
            onClick={() => handleClick(blog.slug)}
          >
            <Image
              src={blog.image}
              alt={blog.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm">{blog.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
