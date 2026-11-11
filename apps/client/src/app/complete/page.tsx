import { CompletePage } from "@/screens/complete/ui";
import { Suspense } from "react";

export default function Complete() {
  return (
    <Suspense
      fallback={<div className="text-center py-24 text-white">Loading...</div>}
    >
      <CompletePage />
    </Suspense>
  );
}
