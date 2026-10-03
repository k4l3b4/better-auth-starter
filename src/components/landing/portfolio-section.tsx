"use client";

import AnimatedSection from "@/components/shared/animated-section";
import SectionHeading from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Bloom Botanicals",
    category: "Brand Strategy",
    description:
      "Complete brand repositioning for an organic skincare startup. Developed brand voice, visual identity, and go-to-market content strategy that increased awareness by 340%.",
    tags: ["Branding", "Content", "Social"],
    gradient: "from-amber-600/30 via-orange-500/20 to-rose-500/10",
  },
  {
    title: "NomadTech",
    category: "SEO & Content",
    description:
      "Drove a B2B SaaS company from page 5 to page 1 on Google for 12 high-intent keywords. Organic traffic grew 5x in 8 months through a strategic content pillar approach.",
    tags: ["SEO", "Blog Strategy", "Analytics"],
    gradient: "from-emerald-600/30 via-teal-500/20 to-cyan-500/10",
  },
  {
    title: "The Reading Room",
    category: "Social & Paid",
    description:
      "Built an engaged 50K community for an independent bookstore chain. Blended organic storytelling with targeted Meta Ads for a 420% ROAS on their holiday campaign.",
    tags: ["Social Media", "Paid Ads", "Community"],
    gradient: "from-violet-600/30 via-purple-500/20 to-fuchsia-500/10",
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            label="Portfolio"
            title="Selected Work"
            subtitle="A glimpse at projects where strategy met storytelling — and results followed."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={i} delay={i * 0.12}>
              <div className="group relative rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Gradient header */}
                <div
                  className="h-48 relative flex items-end p-6 overflow-hidden"
                >
                  {/* The actual gradient background that scales on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110`} />
                  
                  <div className="absolute top-4 right-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm text-foreground"
                  >
                    {project.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
