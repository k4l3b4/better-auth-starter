"use client";

import {
  Search,
  Share2,
  FileText,
  Palette,
  Megaphone,
} from "lucide-react";
import AnimatedSection from "@/components/shared/animated-section";
import SectionHeading from "@/components/shared/section-heading";

const services = [
  {
    icon: Search,
    title: "SEO & Search Optimization",
    description:
      "Boost your visibility on search engines with data-driven SEO strategies. I optimize your content, structure, and technical foundation to attract organic traffic that converts.",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "Build a loyal community and amplify your brand presence across platforms. Strategic content calendars, engagement tactics, and growth strategies tailored to your audience.",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: FileText,
    title: "Content Strategy & Creation",
    description:
      "From blog posts to brand manifestos — I craft content that tells your story and drives action. Every word serves a purpose, every piece builds your authority.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Palette,
    title: "Brand Strategy & Identity",
    description:
      "Define what makes you unforgettable. I help you uncover your brand's core narrative, positioning, and visual identity that resonates with the right people.",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    description:
      "Maximize ROI with precision-targeted ad campaigns across Google, Meta, and beyond. Data-backed creative, smart budgets, and relentless optimization.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            label="What I Do"
            title="Services That Drive Growth"
            subtitle="Strategic marketing services built on a foundation of storytelling, data, and genuine brand understanding."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                {/* Gradient glow on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:-rotate-12 group-hover:shadow-xl group-hover:shadow-primary/20">
                    <service.icon className="h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-90" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
