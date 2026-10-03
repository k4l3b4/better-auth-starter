import { db } from "@/db";
import { post } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import AnimatedSection from "@/components/shared/animated-section";
import SectionHeading from "@/components/shared/section-heading";

export default async function BlogPreviewSection() {
  let latestPosts: any[] = [];
  try {
    latestPosts = await db.query.post.findMany({
      where: eq(post.status, "published"),
      orderBy: [desc(post.createdAt)],
      limit: 3,
      with: {
        author: true,
        categories: {
          with: {
            category: true,
          },
        },
      },
    });
  } catch {
    // DB not connected yet — show empty state
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            label="From the Blog"
            title="Latest Thoughts & Insights"
            subtitle="Marketing strategies, book reviews, and lessons learned from the intersection of storytelling and business."
          />
        </AnimatedSection>

        {latestPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {latestPosts.map((p: any, i: number) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                    {p.coverImage ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center">
                        <span className="font-heading text-4xl text-primary/20 font-bold">
                          {p.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {p.categories && p.categories.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            {p.categories[0].category.name}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(p.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {p.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection>
            <div className="text-center py-16 rounded-2xl border border-dashed border-border/50 bg-card/50">
              <p className="text-muted-foreground mb-4">
                No posts published yet. Check back soon!
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/write">Write the First Post</Link>
              </Button>
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection>
          <div className="text-center">
            <Button
              variant="outline"
              className="rounded-full px-8 gap-2"
              asChild
            >
              <Link href="/blog">
                View All Posts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
