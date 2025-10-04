"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Home, Briefcase, FileText, Award, Settings } from "lucide-react";

type Role = "student" | "company" | "admin" | string;

interface DashboardLayoutProps {
  role?: Role;
  children: ReactNode;
}

export function DashboardLayout({
  role = "student",
  children,
}: DashboardLayoutProps) {
  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      { href: `/${role}`, label: "Dashboard", icon: Home },
      { href: `/${role}/jobs`, label: "Jobs", icon: Briefcase },
      { href: `/${role}/applications`, label: "Applications", icon: FileText },
      { href: `/${role}/certifications`, label: "Certificates", icon: Award },
      { href: `/settings`, label: "Settings", icon: Settings },
    ],
    [role]
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Top navbar */}
      <Navbar role={role} />

      <div className="relative">
        {/* Desktop sidebar */}
        <aside className="hidden md:block fixed top-16 left-0 bottom-0 w-64 border-r bg-card">
          <nav className="p-3 space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                    "transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={cn("h-4 w-4", active && "text-primary")} />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Page content */}
        <main className="container px-4 sm:px-6 lg:px-8">
          {/* push content right when sidebar visible */}
          <div className="md:ml-64 pt-6 pb-24 md:pb-8">{children}</div>
        </main>

        {/* Mobile bottom tabs - icons only */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <ul className="grid grid-cols-5">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex flex-col items-center justify-center h-14",
                      "text-xs gap-1",
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label={label}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className={cn("h-5 w-5", active && "text-primary")} />
                    <span className="sr-only">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
