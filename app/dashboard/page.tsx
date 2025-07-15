import { checkUserOnboardingStatus } from '@/actions/user';
import DashboardPageClient from '@/components/dashboard/dashboard-page-client';
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }


  console.log("This is the session object: ",session)
  const user = session.user;
  console.log("This is the user in the user session: ", user);
  const isOnboarded = await checkUserOnboardingStatus(user.id);
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <div>
      <DashboardPageClient/>
    </div>
  )
}

export default DashboardPage