import { NextResponse } from "next/server";
import { getSession } from "@/lib/getSession";
import { db } from "@/drizzle";
import { and, eq } from "drizzle-orm";
import { document } from "@/drizzle/schema";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ documentId: string }> },
) {
  const { documentId } = await params;
  return NextResponse.json({ message: await request.text(), id: documentId });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ documentId: string }> },
) {
  const { documentId } = await params;

  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [deleteDocument] = await db
      .delete(document)
      .where(
        and(eq(document.id, documentId), eq(document.ownerId, session.user.id)),
      )
      .returning();

    return NextResponse.json(
      { data: deleteDocument, message: await request.text() },
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ documentId: string }> },
) {
  const { documentId } = await params;
  const body = await request.json();
  const session = await getSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [updateDocument] = await db
      .update(document)
      .set({
        title: body.title,
        initialContent: body.initialContent,
      })
      .where(
        and(eq(document.id, documentId), eq(document.ownerId, session.user.id)),
      )
      .returning();

    return NextResponse.json(
      { data: updateDocument, message: await request.text() },
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