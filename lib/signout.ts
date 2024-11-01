"use server"

import { invalidateSession } from "@/auth";
import { redirect } from "next/navigation";
import { deleteSessionTokenCookie, getCurrentSession } from "./session";

export async function signOutAction() {
  const { session } = await getCurrentSession();
	if (session === null) {
		return {
			message: "Not authenticated"
		};
	}
	invalidateSession(session.id);
	deleteSessionTokenCookie();
	return redirect("/login");
}