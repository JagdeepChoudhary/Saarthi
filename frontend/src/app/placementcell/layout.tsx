"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Briefcase, FileText, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar"; // your top navbar

export default function PlacementCellLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const studentLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/placementcell" },
    {
      icon: Briefcase,
      label: "Job Openings",
      href: "/placementcell/job-openings",
    },
    { icon: Users, label: "Recruiters", href: "/placementcell/recruiters" },
    { icon: FileText, label: "Reports", href: "/placementcell/reports" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      {/* ✅ Sticky Top Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar role="Placement Cell" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ✅ Sticky Sidebar (desktop only) */}
        <aside className="hidden md:flex flex-col w-64 border-r bg-muted/20 sticky top-0 h-[calc(100vh-64px)]">
          {/* Adjust 64px if your Navbar height changes */}
          <nav className="flex flex-col gap-1 p-3 overflow-y-auto">
            {studentLinks.map(({ icon: Icon, label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* ✅ Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>

      {/* ✅ Bottom Navbar (mobile only, fixed) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background shadow-md flex justify-around py-2 z-50">
        {studentLinks.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center text-xs transition-colors",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
