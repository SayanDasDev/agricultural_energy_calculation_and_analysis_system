import "server-only";
import { createSession, generateSessionToken, SessionValidationResult, validateRequest, validateSessionToken } from "@/auth";
import { cache } from "react";
import { cookies } from "next/headers";
import { UserId } from "@/use-cases/types";
import { AuthenticationError } from "@/app/utils";

const SESSION_COOKIE_NAME = "session";

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
  const cookieJar = await cookies();
  cookieJar.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieJar = await cookies();
  cookieJar.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieJar = await cookies();
  return cookieJar.get(SESSION_COOKIE_NAME)?.value;
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
  const token = await getSessionToken();
  if (token == null) {
    return { session: null, user: null };
  }
  const result = await validateSessionToken(token as string);
  return result;
});

export const getCurrentUser = cache(async () => {
  const { user } = await validateRequest();
  return user ?? undefined;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};

export async function setSession(userId: UserId) {
  const token = generateSessionToken();
  const session = await createSession(token, userId);
  await setSessionTokenCookie(token, session.expiresAt);
}