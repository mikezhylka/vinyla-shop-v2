import { LoginPage } from "@/screens/login/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Vinyla",
  description: "Access your private vault of high-fidelity sound.",
};

export default function Page() {
  return <LoginPage />;
}
