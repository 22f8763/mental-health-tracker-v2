"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// Lazy-loaded components (client-side only)
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false, loading: () => <LoadingSection section="Hero" /> });
const WhyMentalHealth = dynamic(() => import("@/components/WhyMentalHealth"), { ssr: false, loading: () => <LoadingSection section="Why Mental Health" /> });
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), { ssr: false, loading: () => <LoadingSection section="Features" /> });
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), { ssr: false, loading: () => <LoadingSection section="Testimonials" /> });
const FinalCTA = dynamic(() => import("@/components/FinalCTA"), { ssr: false, loading: () => <LoadingSection section="CTA" /> });
//import FinalCTA from "../components/FinalCTA";


// Loading fallback for each section
function LoadingSection({ section }: { section: string }) {
  return (
    <div className="flex justify-center items-center py-20 text-purple-600 animate-pulse">
      Loading {section}...
    </div>
  );
}

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        // Check if current path is '/' and user just logged in via magic link
        const isComingFromAuth = document.referrer.includes("/auth/callback");

        if (session && isMounted && isComingFromAuth) {
          router.push("/analyze"); // only redirect if just logged in
        } else {
          setLoading(false); // allow home page
        }
      } catch (error) {
        console.error("Session check failed", error);
        setLoading(false);
      }
    };

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-purple-600 text-xl font-semibold animate-pulse">
        Loading your experience...
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <main className="overflow-x-hidden">
        <Suspense fallback={<LoadingSection section="Hero" />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<LoadingSection section="Why Mental Health" />}>
          <WhyMentalHealth />
        </Suspense>
        <Suspense fallback={<LoadingSection section="Features" />}>
          <FeaturesSection />
        </Suspense>
        <Suspense fallback={<LoadingSection section="Testimonials" />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<LoadingSection section="CTA" />}>
          <FinalCTA />
        </Suspense>
      </main>
    </LazyMotion>
  );
}
