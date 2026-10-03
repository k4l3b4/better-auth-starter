import { NextResponse } from "next/server";
import { db } from "@/db";
import { category } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allCategories = await db.select().from(category).orderBy(desc(category.name));
    return NextResponse.json(allCategories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
