import RegistrationPage from "@/screens/registration/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Vinyla",
  description: "Access your private vault of high-fidelity sound.",
};

export default function Registration() {
  return <RegistrationPage />;
}
