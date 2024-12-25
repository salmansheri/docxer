import { NextResponse } from "next/server";

import { db } from "@/drizzle";
import { document } from "@/drizzle/schema";
import { createId } from "@paralleldrive/cuid2";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: Request) {
  return NextResponse.json({ message: request.text() }, { status: 200 });
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
    const user = await db.insert(document).values({
      id: createId(),
      title: body.title ?? "Untitled Document",
      ownerId: session.user.id as string,
      initialContent: body.initialContent,
    });

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
