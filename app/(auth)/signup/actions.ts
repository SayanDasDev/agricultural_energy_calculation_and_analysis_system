"use server"

import { getUserByEmail } from "@/data/user";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { setSession } from "@/lib/session";
import { hashPassword } from "@/lib/utils";
import { signupSchema } from "@/use-cases/schema";
import { z } from "zod";


export const signup = async (values: z.infer<typeof signupSchema>) => {

  const validatedFields = signupSchema.safeParse(values);

  if(!validatedFields){
    return { error: "Invalid login credentials" }
  }

  const { username, email, password } = values;

  const hashedPassword = await hashPassword(password);

  const existingUser = await getUserByEmail(email);

  if(existingUser){
    return { error: "Email Already in Use!" }
  }

  const userId = await db.insert(users).values({
    username,
    email,
    password: hashedPassword,
  }).returning({ insertedId : users.id });

  await setSession(userId[0].insertedId);

  return { success: "Account Created!" }

}