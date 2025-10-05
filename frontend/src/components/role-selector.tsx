"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Building2,
  UserCheck,
  Users,
  Briefcase,
} from "lucide-react";

type Role = {
  key: string;
  label: string;
  description?: string;
  href: string;
  badgeClass: string;
};

const ROLES: Role[] = [
  {
    key: "student",
    label: "Student",
    description: "Track opportunities and apply",
    href: "/student",
    badgeClass: "bg-blue-50 text-blue-600",
  },
  {
    key: "placementcell",
    label: "Placement Cell",
    description: "Manage drives and outreach",
    href: "/placementcell",
    badgeClass: "bg-purple-50 text-purple-600",
  },
  {
    key: "mentor",
    label: "Mentor",
    description: "Guide students to success",
    href: "/mentor",
    badgeClass: "bg-green-50 text-green-600",
  },
  {
    key: "supervisor",
    label: "Supervisor",
    description: "Oversee operations and workflows",
    href: "/supervisor",
    badgeClass: "bg-orange-50 text-orange-600",
  },
  {
    key: "recruiter",
    label: "Recruiter",
    description: "Discover talent efficiently",
    href: "/recruiter",
    badgeClass: "bg-pink-50 text-pink-600",
  },
];

const Icons = {
  student: GraduationCap,
  placementcell: Building2,
  mentor: UserCheck,
  supervisor: Users,
  recruiter: Briefcase,
};

export default function RoleSelector({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
      role="list"
      aria-label="Choose a role to continue"
    >
      {ROLES.map((role) => {
        const Icon = Icons[role.key as keyof typeof Icons];
        return (
          <button
            key={role.key}
            role="listitem"
            onClick={() => router.push(role.href)}
            className={cn(
              "rounded-lg border bg-card text-card-foreground border-border p-5 text-left",
              "transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
            )}
            aria-label={`Continue as ${role.label}`}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">{role.label}</h3>
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                  role.badgeClass
                )}
              >
                Go
              </span>
            </div>
            <div className="mt-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Icon className="h-6 w-6" />
            </div>
            {role.description ? (
              <p className="mt-3 text-sm text-muted-foreground">
                {role.description}
              </p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
