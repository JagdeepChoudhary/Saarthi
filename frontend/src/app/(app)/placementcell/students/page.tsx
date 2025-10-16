import type { Metadata } from "next";
import PlacementPage from "@/components/placement/placement-page";

export const metadata: Metadata = {
  title: "Placement Cell",
  description: "Students list with filters and marks upload modal",
};

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-pretty">Placement Cell</h1>
      </header>
      <PlacementPage />
    </main>
  );
}
