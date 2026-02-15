import { cookies } from "next/headers";
import { dbActions } from "./db";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_user")?.value;

  if (!userId) return null;

  return dbActions.findUserById(userId);
}
