import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function POST() {
  const cookieStore = await cookies();
  try {
    cookieStore.set("auth_token", JWT_SECRET!, { maxAge: 0, path: "/" });
    return NextResponse.json(
      { message: "Signout Successful" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error Signing Out" }, { status: 500 });
  }
}
