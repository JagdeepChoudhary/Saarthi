"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  Users,
  UserCheck,
  Briefcase,
  Building2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const roles = [
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    path: "/student",
    color: "hover:border-blue-500",
  },
  {
    id: "placement",
    label: "Placement Cell",
    icon: Building2,
    path: "/placementcell",
    color: "hover:border-purple-500",
  },
  {
    id: "mentor",
    label: "Mentor",
    icon: UserCheck,
    path: "/mentor",
    color: "hover:border-green-500",
  },
  {
    id: "supervisor",
    label: "Supervisor",
    icon: Users,
    path: "/supervisor",
    color: "hover:border-orange-500",
  },
  {
    id: "recruiter",
    label: "Recruiter",
    icon: Briefcase,
    path: "/recruiter",
    color: "hover:border-pink-500",
  },
];

export default function Login() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      const role = roles.find((r) => r.id === selectedRole);
      if (role) {
        router.push(role.path);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-5xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground shadow-md">
              <GraduationCap className="h-8 w-8 text-background" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Welcome to SAARTHI
            </CardTitle>
            <CardDescription className="text-base">
              Select your role to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                    selectedRole === role.id
                      ? "border-foreground bg-muted shadow-md"
                      : "border-border bg-background hover:bg-muted/50"
                  } ${role.color}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      selectedRole === role.id
                        ? "bg-foreground text-background"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <role.icon className="h-6 w-6" />
                  </div>
                  <span className="text-center text-sm font-medium">
                    {role.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Login Form */}
            {selectedRole && (
              <form onSubmit={handleLogin} className="space-y-4 border-t pt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <Link href="#" className="text-foreground hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Login as {roles.find((r) => r.id === selectedRole)?.label}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="#"
                    className="font-medium text-foreground hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
