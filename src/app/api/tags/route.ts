import { NextResponse } from "next/server";
import { db } from "@/db";
import { tag } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allTags = await db.select().from(tag).orderBy(desc(tag.name));
    return NextResponse.json(allTags);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}
