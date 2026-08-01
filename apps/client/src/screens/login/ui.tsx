import { LoginForm } from "@/features/auth-by-email/ui/login-form";
import Link from "next/link";
import { AuthBanner } from "./components/auth-banner";

export function LoginPage() {
  return (
    <main className="grow flex flex-col md:flex-row min-h-screen bg-body-background text-white">
      <AuthBanner />

      <section className="flex-1 flex items-center justify-center p-8 md:p-16 relative">
        <div className="w-full max-w-sm z-10 animate-on-scroll">
          <div className="mb-10">
            <h3 className="h3 font-bold mb-3">Ready to Spin?</h3>
            <p className="small-text text-neutral-gray">
              Enter your credentials...
            </p>
          </div>

          <LoginForm />

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="small-text text-neutral-gray">
              New to Vinyla?{" "}
              <Link
                href="/registration"
                className="cursor-pointer underline lg:no-underline lg:hover:underline"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
