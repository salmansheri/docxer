import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/drizzle";
import { SelectUserType, usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const config = {
  runtime: "nodejs",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("auth_token");
  const token = cookie?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { email } = jwt.verify(token, JWT_SECRET!);
    console.log(email);
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email as string));

    const usersData = {
      id: user.id,
      email: user.email,
      name: user.name,
    } as SelectUserType;

    return NextResponse.json({ data: usersData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error getting users" }, { status: 400 });
  }
}
