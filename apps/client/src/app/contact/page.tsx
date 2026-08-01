import { Metadata } from "next";
import { ContactPage } from "@/screens/contact/ui";

export const metadata: Metadata = {
  title: "Contact | Vinyla",
  description:
    "We are always ready to help you and answer your questions. Contact Vinyla.",
};

export default function Contact() {
  return <ContactPage />;
}
