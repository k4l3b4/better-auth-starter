"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import TextRotate from "@/components/fancy/text/text-rotate"
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = useMemo(
    () => ["Sell", "Inspire", "Convert", "Resonate", "Captivate"],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-150 h-150 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-warm-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      {/* Grain overlay */}
      {/* <div className="absolute inset-0 grain-overlay opacity-50" /> */}
      <div className="relative container mx-auto px-4 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Tag */}
          <div className="animate-fade-in-up stagger-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <BookOpen className="h-4 w-4" />
              Marketing Strategist & Book Enthusiast
            </div>
          </div>

          {/* Heading */}
          <LayoutGroup>
            <motion.h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] flex whitespace-pre"
              layout={true}>
              <motion.span
                className="pt-0.5 sm:pt-1 md:pt-2"
                layout={true}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                Stories That{" "}
              </motion.span>
              <TextRotate
                texts={["Sell", "Inspire", "Convert", "Resonate", "Captivate"]}
                mainClassName="text-primary px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.02}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </motion.h1>
          </LayoutGroup>

          {/* Subtitle */}
          <p className="animate-fade-in-up stagger-3 text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mb-10 mt-6">
            I help brands find their voice through strategic marketing,
            compelling content, and the timeless art of storytelling. Because
            every great brand starts with a great story.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up stagger-4 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 gap-2 text-base transition-transform hover:scale-105 active:scale-95 duration-200"
              asChild
            >
              <Link href="/#services">
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-base transition-transform hover:scale-105 active:scale-95 duration-200"
              asChild
            >
              <Link href="/blog">Read the Blog</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up stagger-5 grid grid-cols-3 gap-8 md:gap-16 mt-16 pt-8 border-t border-border/50">
            {[
              { value: "50+", label: "Brands Served" },
              { value: "200+", label: "Books Reviewed" },
              { value: "8+", label: "Years Experience" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs md:text-sm mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
