import { LoginForm } from "@/components/login-form"
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {

  const { session } = await getCurrentSession();
	if (session !== null) {
		// if (!user.emailVerified) {
		// 	return redirect("/verify-email");
		// }
		// if (!user.registered2FA) {
		// 	return redirect("/2fa/setup");
		// }
		// if (!session.twoFactorVerified) {
		// 	return redirect("/2fa");
		// }
		return redirect("/dashboard");
	}

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  )
}
