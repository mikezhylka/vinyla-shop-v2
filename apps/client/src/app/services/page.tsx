import { Metadata } from "next";
import ServicesPage from "@/screens/services/ui";

export const metadata: Metadata = {
  title: "Services | Vinyla",
  description:
    "Our services are tailored to every vinyl lover's needs—rare records, premium restoration, or custom pressing.",
};

export default function Services() {
  return <ServicesPage />;
}
