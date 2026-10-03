import { NextResponse } from "next/server";
import { db } from "@/db";
import { post, user, tag, postCategory, postTag, comment, reaction } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import crypto from "crypto";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const singlePost = await db.query.post.findFirst({
      where: eq(post.slug, slug),
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

    if (!singlePost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(singlePost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug: oldSlug } = await params;

    const existingPost = await db.query.post.findFirst({
      where: eq(post.slug, oldSlug)
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const author = await db.query.user.findFirst({
      where: eq(user.id, session.user.id)
    });

    if (existingPost.authorId !== session.user.id && author?.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, slug, content, excerpt, categories, tags, coverImage, metaTitle, metaDescription } = body;

    await db.update(post).set({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      metaTitle,
      metaDescription,
      updatedAt: new Date()
    }).where(eq(post.id, existingPost.id));

    // Update categories (delete all existing and re-insert)
    await db.delete(postCategory).where(eq(postCategory.postId, existingPost.id));
    if (categories && Array.isArray(categories) && categories.length > 0) {
      const categoryInserts = categories.map((catId: string) => ({
        postId: existingPost.id,
        categoryId: catId
      }));
      await db.insert(postCategory).values(categoryInserts);
    }

    // Update tags
    await db.delete(postTag).where(eq(postTag.postId, existingPost.id));
    if (tags && Array.isArray(tags) && tags.length > 0) {
      for (const tagName of tags) {
        let tagRecord = await db.query.tag.findFirst({
          where: eq(tag.name, tagName)
        });

        if (!tagRecord) {
          const newTag = await db.insert(tag).values({
            id: crypto.randomUUID(),
            name: tagName,
            slug: tagName.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")
          }).returning();
          tagRecord = newTag[0];
        }

        await db.insert(postTag).values({
          postId: existingPost.id,
          tagId: tagRecord.id
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
