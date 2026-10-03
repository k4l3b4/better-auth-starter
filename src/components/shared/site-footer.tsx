"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BookOpen, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  services: [
    { label: "SEO & Search", href: "/#services" },
    { label: "Social Media", href: "/#services" },
    { label: "Content Strategy", href: "/#services" },
    { label: "Brand Strategy", href: "/#services" },
    { label: "Paid Advertising", href: "/#services" },
  ],
};

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.success("Subscribed! Welcome aboard.");
        setEmail("");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to subscribe");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-lg">
                F
              </div>
              <span className="font-heading font-semibold text-xl tracking-tight">
                Feben
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Marketing strategist, book lover, and storyteller. Helping brands
              find their voice through the art of narrative.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm italic">&ldquo;Every brand has a story worth telling.&rdquo;</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get marketing insights &amp; book recommendations delivered to
              your inbox.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm"
                required
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading}
                className="shrink-0"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Feben Marketing. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
