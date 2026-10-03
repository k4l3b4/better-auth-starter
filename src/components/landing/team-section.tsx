"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import AnimatedSection from "@/components/shared/animated-section";
import SectionHeading from "@/components/shared/section-heading";

const team = [
  {
    name: "Feben",
    role: "Founder & Lead Strategist",
    bio: "Marketing visionary with 8+ years turning brand stories into measurable growth. Feben's literary sensibility and strategic depth set the tone for everything we do.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80&face",
    socials: {
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
    isLeader: true,
    gradient: "from-primary/20 via-primary/5 to-transparent",
    badge: "Founder",
  },
  {
    name: "Aisha Tekle",
    role: "Content Director",
    bio: "Storyteller at heart. Aisha transforms complex ideas into narratives that resonate deeply with target audiences.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    socials: { linkedin: "#", twitter: "#", website: "#" },
    isLeader: false,
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    badge: null,
  },
  {
    name: "Dawit Haile",
    role: "Brand Strategist",
    bio: "Data-driven yet deeply human. Dawit builds brand identities that are both analytically sound and emotionally compelling.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    socials: { linkedin: "#", twitter: "#", website: "#" },
    isLeader: false,
    gradient: "from-sky-500/20 via-sky-500/5 to-transparent",
    badge: null,
  },
  {
    name: "Meron Alemu",
    role: "Social Media Lead",
    bio: "Culture-fluent and always ahead of the algorithm. Meron keeps our clients relevant and resonant across every platform.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600&auto=format&fit=crop&q=80",
    socials: { linkedin: "#", twitter: "#", website: "#" },
    isLeader: false,
    gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    badge: null,
  },
  {
    name: "Yonas Bekele",
    role: "Growth & Analytics",
    bio: "Numbers tell stories too. Yonas unearths the insights that drive smarter decisions and accelerate campaign performance.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    socials: { linkedin: "#", twitter: "#", website: "#" },
    isLeader: false,
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    badge: null,
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <AnimatedSection className="flex flex-col items-center">
          <SectionHeading
            label="Our Team"
            title="The Minds Behind the Magic"
            subtitle="A collective of strategists, storytellers, and creatives united by one belief: great marketing starts with a great story."
          />
        </AnimatedSection>

        {/* Leader card — full width hero-style */}
        <AnimatedSection delay={0.1}>
          <div className="relative mb-8 rounded-3xl overflow-hidden border border-border/60 bg-card group">
            {/* Gradient bg */}
            <div className={`absolute inset-0 bg-gradient-to-br ${team[0].gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
            {/* Decorative blobs */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-12 items-center">
              {/* Photo */}
              <div className="relative shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/50 to-primary/10 rounded-full blur-md" />
                <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                  <img
                    src={team[0].image}
                    alt={team[0].name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                  {team[0].badge}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">
                  {team[0].role}
                </p>
                <h3 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  {team[0].name}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                  {team[0].bio}
                </p>
                {/* Socials */}
                <div className="flex items-center gap-3 mt-6 justify-center md:justify-start">
                  <a href={team[0].socials.linkedin} className="flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors">
                    {/* <Linkedin className="h-4 w-4" /> */}
                  </a>
                  <a href={team[0].socials.twitter} className="flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors">
                    {/* <Twitter className="h-4 w-4" /> */}
                  </a>
                  <a href={team[0].socials.website} className="flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors">
                    <Globe className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Team grid — 4 members */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.slice(1).map((member, i) => (
            <AnimatedSection key={member.name} delay={0.1 + i * 0.08}>
              <div
                className="relative rounded-2xl overflow-hidden border border-border/60 bg-card group h-full flex flex-col transition-transform duration-300 ease-out hover:-translate-y-1.5"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-linear-to-b ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle gradient at bottom of photo */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1 p-5">
                  <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">
                    {member.role}
                  </p>
                  <h3 className="font-heading text-xl font-bold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {member.bio}
                  </p>

                  {/* Socials */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                    <a href={member.socials.linkedin} className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors">
                      {/* <Linkedin className="h-3.5 w-3.5" /> */}
                    </a>
                    <a href={member.socials.twitter} className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors">
                      {/* <Twitter className="h-3.5 w-3.5" /> */}
                    </a>
                    <a href={member.socials.website} className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors">
                      <Globe className="h-3.5 w-3.5" />
                    </a>
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
