import { NextResponse } from "next/server";
import { db } from "@/db";
import { post, user, tag, postCategory, postTag } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, desc, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import crypto from "crypto";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category");
    const status = searchParams.get("status") || "published";
    const authorId = searchParams.get("authorId");

    // Build the query
    const allPosts = await db.query.post.findMany({
      where: (posts, { eq, and }) => {
        const conditions = [eq(posts.status, status)];
        if (authorId) {
          conditions.push(eq(posts.authorId, authorId));
        }
        return and(...conditions);
      },
      orderBy: [desc(post.createdAt)],
      with: {
        categories: {
          with: {
            category: true
          }
        },
        tags: {
          with: {
            tag: true
          }
        },
        author: true
      }
    });
    
    // Filter by category if provided since drizzle doesn't natively filter on relational many-to-many easily
    let filteredPosts = allPosts;
    if (categoryId) {
      filteredPosts = allPosts.filter(p => p.categories.some(c => c.category.id === categoryId));
    }
    
    return NextResponse.json(filteredPosts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, content, excerpt, categories, tags, coverImage, metaTitle, metaDescription } = body;

    const author = await db.query.user.findFirst({
      where: eq(user.id, session.user.id)
    });

    let postStatus = 'pending';
    if (author?.role === 'admin' || (author?.trustPoints ?? 0) >= 100) {
      postStatus = 'published';
    }

    const postId = crypto.randomUUID();

    const newPost = await db.insert(post).values({
      id: postId,
      title,
      slug,
      content,
      excerpt,
      coverImage,
      metaTitle,
      metaDescription,
      authorId: session.user.id,
      status: postStatus,
    }).returning();

    // Insert categories
    if (categories && Array.isArray(categories) && categories.length > 0) {
      const categoryInserts = categories.map((catId: string) => ({
        postId: postId,
        categoryId: catId
      }));
      await db.insert(postCategory).values(categoryInserts);
    }

    // Process tags (create on the fly if needed)
    if (tags && Array.isArray(tags) && tags.length > 0) {
      for (const tagName of tags) {
        // check if tag exists
        let tagRecord = await db.query.tag.findFirst({
          where: eq(tag.name, tagName)
        });

        if (!tagRecord) {
          // create tag
          const newTag = await db.insert(tag).values({
            id: crypto.randomUUID(),
            name: tagName,
            slug: tagName.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")
          }).returning();
          tagRecord = newTag[0];
        }

        // link to post
        await db.insert(postTag).values({
          postId: postId,
          tagId: tagRecord.id
        });
      }
    }

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
