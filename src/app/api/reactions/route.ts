import { NextResponse } from "next/server";
import { db } from "@/db";
import { reaction } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import crypto from "crypto";
import { and, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { postId, type } = body;

    if (!postId || !type) {
      return NextResponse.json({ error: "postId and type are required" }, { status: 400 });
    }

    // Toggle reaction: Check if exists, if so delete it, else insert it
    const existing = await db.select().from(reaction).where(
      and(
        eq(reaction.postId, postId),
        eq(reaction.userId, session.user.id),
        eq(reaction.type, type)
      )
    );

    if (existing.length > 0) {
      await db.delete(reaction).where(eq(reaction.id, existing[0].id));
      return NextResponse.json({ message: "Reaction removed", action: "removed" }, { status: 200 });
    } else {
      const newReaction = await db.insert(reaction).values({
        id: crypto.randomUUID(),
        postId,
        type,
        userId: session.user.id,
      }).returning();
      return NextResponse.json({ message: "Reaction added", action: "added", reaction: newReaction[0] }, { status: 201 });
    }

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

    const postReactions = await db.select().from(reaction).where(eq(reaction.postId, postId));

    // Group by type
    const grouped = postReactions.reduce((acc, curr) => {
      if (!acc[curr.type]) {
        acc[curr.type] = 0;
      }
      acc[curr.type]++;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json(grouped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
