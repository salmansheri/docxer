import { API_URL } from "@/lib/utils";
import { SelectUserType } from "@/drizzle/schema";

type SessionType = {
  id: SelectUserType['id'],
  name: SelectUserType['name'],
  email: SelectUserType['email'],

}

export async function getSession(): Promise<SessionType | null> {
  try {
    const response = await fetch(`${API_URL}/getSession`);

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;

  }
}