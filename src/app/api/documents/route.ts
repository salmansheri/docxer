import { NextResponse } from "next/server";
import { getSession } from "@/lib/server/get-session";
import { db } from "@/drizzle";
import { documentsTable } from "@/drizzle/schema";


export async function GET(request: Request) {
  return NextResponse.json({ message: request.text() }, { status: 200 });
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const user = await db.insert(documentsTable).values({
      title: body.title ?? "Untitled Document",
      ownerId: session.id,
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