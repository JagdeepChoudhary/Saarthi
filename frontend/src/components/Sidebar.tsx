"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Calendar,
  Settings,
  Award,
  ClipboardCheck,
} from "lucide-react";

interface SidebarProps {
  role: string;
}

const sidebarLinks = {
  student: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/student" },
    { icon: Briefcase, label: "Jobs", href: "/student/jobs" },
    { icon: FileText, label: "Applications", href: "/student/applications" },
    { icon: Award, label: "Certifications", href: "/student/certifications" },
  ],
  placement: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/placement" },
    { icon: Briefcase, label: "Job Openings", href: "/placement/openings" },
    { icon: Users, label: "Recruiters", href: "/placement/recruiters" },
    { icon: FileText, label: "Reports", href: "/placement/reports" },
  ],
  mentor: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/mentor" },
    { icon: Users, label: "Students", href: "/mentor/students" },
    { icon: ClipboardCheck, label: "Approvals", href: "/mentor/approvals" },
    { icon: FileText, label: "Feedback", href: "/mentor/feedback" },
  ],
  supervisor: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/supervisor" },
    { icon: Users, label: "Interns", href: "/supervisor/interns" },
    {
      icon: ClipboardCheck,
      label: "Evaluations",
      href: "/supervisor/evaluations",
    },
    { icon: Award, label: "Certificates", href: "/supervisor/certificates" },
  ],
  recruiter: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/recruiter" },
    { icon: Briefcase, label: "Post Job", href: "/recruiter/post" },
    { icon: Users, label: "Candidates", href: "/recruiter/candidates" },
    { icon: Calendar, label: "Interviews", href: "/recruiter/interviews" },
  ],
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = sidebarLinks[role as keyof typeof sidebarLinks] || [];

  return (
    <>
      <aside className="hidden md:fixed md:left-0 md:top-0 md:block md:h-screen md:w-64 md:border-r md:bg-card md:p-4 md:shadow-soft">
        <nav className="space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-gradient-primary text-white shadow-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}

          <div className="pt-4">
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </div>
        </nav>
      </aside>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 md:hidden"
        role="navigation"
        aria-label="Bottom navigation"
      >
        <ul className="grid grid-cols-5">
          {[
            ...links,
            { icon: Settings, label: "Settings", href: "/settings" },
          ].map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
