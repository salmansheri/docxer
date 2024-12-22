import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/drizzle";
import { usersTable } from "@/drizzle/schema";

export async function GET() {
  return NextResponse.json({ message: "Sign up page" });
}

export async function POST(request: Request) {
  const body = await request.json();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  try {
    const user = await db
      .insert(usersTable)
      .values({
        email: body.email as string,
        name: body.name as string,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json(
      { message: "SUCCESS", data: user },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
