import { NextResponse } from "next/server";
import { db } from "@/db";
import { comment } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { postId, content, parentId } = body;

    if (!postId || !content) {
      return NextResponse.json({ error: "postId and content are required" }, { status: 400 });
    }

    const newComment = await db.insert(comment).values({
      id: crypto.randomUUID(),
      content,
      postId,
      parentId,
      authorId: session.user.id,
    }).returning();

    return NextResponse.json(newComment[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "postId is required" }, { status: 400 });
    }

    const postComments = await db.query.comment.findMany({
      where: eq(comment.postId, postId),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            image: true,
          }
        },
        replies: {
          with: {
            author: {
              columns: {
                id: true,
                name: true,
                image: true,
              }
            }
          }
        }
      }
    });

    // To make it simple, we filter out top level comments (where parentId is null)
    // The replies are already fetched via `replies` relation
    const topLevelComments = postComments.filter(c => c.parentId === null);

    return NextResponse.json(topLevelComments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
