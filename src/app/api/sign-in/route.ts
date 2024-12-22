import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "@/drizzle";
import { usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = await cookies();

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, body.email));

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isCorrectPassword = await compare(body.password, user.password);

    if (!isCorrectPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 },
      );
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET!, {
      expiresIn: "24h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
    };

    cookieStore.set("auth_token", token, cookieOptions);

    return NextResponse.json(
      { message: "Sign In Successful" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
