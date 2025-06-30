import { checkUserOnboardingStatus } from '@/actions/user'
import DashboardPageClient from '@/components/dashboard/dashboard-page-client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const DashboardPage = async () => {
  const session = await  auth.api.getSession({
    headers: await headers()
  })

   if (!session) {
    return (
      <div>
        Not authenticated,{" "}
        <Link href="/register" className="underline">
          Go here to Register{" "}
        </Link>
      </div>
    );
  }

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