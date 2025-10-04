"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Briefcase, FileText, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar"; // your top navbar

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const studentLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/student" },
    { icon: Briefcase, label: "Jobs", href: "/student/jobs" },
    { icon: FileText, label: "Applications", href: "/student/applications" },
    { icon: Award, label: "Certifications", href: "/student/certifications" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ✅ Top Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* ✅ Sidebar (desktop) */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted/20">
          <nav className="flex flex-1 flex-col gap-1 p-2">
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

        {/* ✅ Page content */}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* ✅ Bottom nav (mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background shadow-md flex justify-around py-2">
        {studentLinks.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center text-xs",
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
