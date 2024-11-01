import Navbar from "@/components/navbar";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  
  const { session, user } = await getCurrentSession();
	if (session === null) {
		// if (!user.emailVerified) {
		// 	return redirect("/verify-email");
		// }
		// if (!user.registered2FA) {
		// 	return redirect("/2fa/setup");
		// }
		// if (!session.twoFactorVerified) {
		// 	return redirect("/2fa");
		// }
		return redirect("/login");
	}

  return (
    <div className="flex flex-col gap-4 h-screen w-full text-8xl items-center justify-center px-4">
      Dashboard of {user.username} with email - {user.email}
      <Navbar />
    </div>
  );
}
