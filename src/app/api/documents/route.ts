import { NextResponse } from "next/server";

import { db } from "@/drizzle";
import { document } from "@/drizzle/schema";
import { createId } from "@paralleldrive/cuid2";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSession } from "@/lib/getSession";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 },
      );
    }

    const offset = (page - 1) * limit;

    const documents = await db
      .select()
      .from(document)
      .where(eq(document.ownerId, session.user.id))






    return NextResponse.json(
      { message: request.text(), data: documents },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const [user] = await db
      .insert(document)
      .values({
        id: createId(),
        title: body.title ?? "Untitled Document",
        ownerId: session.user.id as string,
        initialContent: body.initialContent,
      })
      .returning();

    return NextResponse.json(
      { message: "Documents Created Successfully", data: user },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 },
    );
  }
}
