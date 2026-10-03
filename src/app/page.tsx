import SiteHeader from "@/components/shared/site-header";
import SiteFooter from "@/components/shared/site-footer";
import HeroSection from "@/components/landing/hero-section";
import ServicesSection from "@/components/landing/services-section";
import PortfolioSection from "@/components/landing/portfolio-section";
import BlogPreviewSection from "@/components/landing/blog-preview-section";
import AboutSection from "@/components/landing/about-section";
import NewsletterSection from "@/components/landing/newsletter-section";
import TeamSection from "@/components/landing/team-section";

import ThemeSwitcher from "@/components/shared/theme-switcher";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <BlogPreviewSection />
        <AboutSection />
        <TeamSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
      <ThemeSwitcher />
    </div>
  );
}
