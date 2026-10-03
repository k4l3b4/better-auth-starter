"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/shared/animated-section";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
        toast.success("You're in! Welcome to the list.");
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
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-warm-400/10 to-warm-600/5 border border-primary/20 p-10 md:p-16">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-warm-400/10 rounded-full blur-3xl" />

            <div className="relative max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Join 2,000+ Readers
              </div>

              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Marketing Insights &
                <br />
                Book Recommendations
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                A weekly newsletter where marketing strategy meets literary
                wisdom. No spam, no fluff — just stories and strategies that
                make you think.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-full bg-background/80 backdrop-blur-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 rounded-full px-8 gap-2"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4">
                Unsubscribe anytime. Your inbox, your rules.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
