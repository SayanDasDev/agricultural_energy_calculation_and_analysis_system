"use server"
import { getUserByEmail } from "@/data/user";
import { setSession } from "@/lib/session";
import { verifyPassword } from "@/lib/utils";
import { loginSchema } from "@/use-cases/schema";
import { z } from "zod";


export const login = async (values: z.infer<typeof loginSchema>) => {
  
    const validatedFields = loginSchema.safeParse(values);
  
    if(!validatedFields){
      return { error: "Invalid login credentials" }
    }
  
    const { email, password } = values;
  
    const user = await getUserByEmail(email);
  
    if(!user){
      return { error: "Account does not exist!" }
    }
  
    const passwordMatch = await verifyPassword(password, user.password);
  
    if(!passwordMatch){
      return { error: "Password Incorrect!" }
    }
  
    await setSession(user.id);
  
    return { success: "Logged In!" }
}