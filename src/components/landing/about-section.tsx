"use client";

import AnimatedSection from "@/components/shared/animated-section";
import SectionHeading from "@/components/shared/section-heading";
import { BookOpen, Quote } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <AnimatedSection>
            <div>
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-widest mb-3">
                About Feben
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Where Marketing Meets{" "}
                <span className="text-primary">Literature</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I&apos;m Feben — a marketing strategist who believes the best
                  campaigns are built on the same principles as the best books:
                  compelling characters, authentic voices, and stories that stick
                  with you long after you&apos;ve finished reading.
                </p>
                <p>
                  With over 8 years helping brands from scrappy startups to
                  established enterprises, I&apos;ve learned that marketing
                  isn&apos;t about shouting the loudest — it&apos;s about
                  telling the right story to the right people at the right time.
                </p>
                <p>
                  When I&apos;m not crafting brand strategies or optimizing
                  campaigns, you&apos;ll find me deep in a book, writing
                  reviews, and drawing parallels between narrative structure and
                  marketing funnels. (You&apos;d be surprised how much they have
                  in common.)
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 rounded-xl bg-card border border-border/50 relative">
                <Quote className="absolute -top-3 -left-2 h-8 w-8 text-primary/30" />
                <p className="italic text-foreground font-heading text-lg leading-relaxed">
                  &ldquo;The best marketing doesn&apos;t feel like marketing. It
                  feels like a story you&apos;re glad someone told you.&rdquo;
                </p>
                <p className="text-muted-foreground text-sm mt-3">— Feben</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Visual side */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-warm-300/10 to-transparent rounded-3xl -rotate-3 scale-105" />
              <div className="relative bg-card border border-border/50 rounded-3xl p-8 md:p-12">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { value: "50+", label: "Brands Served", icon: "🚀" },
                    { value: "200+", label: "Books Read & Reviewed", icon: "📚" },
                    { value: "5M+", label: "Content Impressions", icon: "👁️" },
                    { value: "8+", label: "Years in Marketing", icon: "⏳" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-4 rounded-xl bg-muted/50"
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="font-heading text-2xl font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground text-xs mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Currently reading */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Currently Reading
                    </p>
                    <p className="font-heading font-semibold text-sm">
                      &ldquo;Building a StoryBrand&rdquo; by Donald Miller
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
