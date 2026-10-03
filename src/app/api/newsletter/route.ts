import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscription } from "@/db/schema";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await db.insert(newsletterSubscription).values({
      id: crypto.randomUUID(),
      email,
    }).onConflictDoNothing({ target: newsletterSubscription.email });

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
