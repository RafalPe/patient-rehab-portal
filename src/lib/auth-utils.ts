import { cookies } from "next/headers";
import { dbActions } from "./db";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const email = cookieStore.get("session_user")?.value;

  if (!email) return null;

  return dbActions.findUserByEmail(email);
}
