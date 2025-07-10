import LoginForm from "@/components/Forms/LoginForm";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default async function page() {
  // if (session) {
  //   redirect("/dashboard");
  // }
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
