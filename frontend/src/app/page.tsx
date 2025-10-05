"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RoleSelector from "@/components/role-selector";
import {
  GraduationCap,
  Building2,
  Users,
  ArrowRight,
  Briefcase,
  Target,
  Shield,
  Zap,
  BarChart3,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Target,
    title: "Smart Matching",
    description:
      "AI-powered job matching connects students with opportunities that align with their skills and aspirations.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description:
      "Comprehensive verification system ensures authentic profiles and trustworthy connections.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track applications, monitor progress, and gain insights with powerful analytics dashboards.",
  },
  {
    icon: Zap,
    title: "Instant Updates",
    description:
      "Stay informed with real-time notifications about applications, interviews, and opportunities.",
  },
];

const stats = [
  { value: "10,000+", label: "Active Students" },
  { value: "500+", label: "Partner Companies" },
  { value: "85%", label: "Placement Rate" },
  { value: "2,500+", label: "Success Stories" },
];

const roles = [
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Discover opportunities, track applications, and launch your career",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Building2,
    title: "Placement Cell",
    description: "Manage campus recruitment and student placements efficiently",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: UserCheck,
    title: "Mentors",
    description: "Guide students and help them achieve their career goals",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Users,
    title: "Supervisors",
    description:
      "Oversee placement activities and monitor institutional progress",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Briefcase,
    title: "Recruiters",
    description: "Find top talent and streamline your hiring process",
    color: "bg-pink-50 text-pink-600",
  },
];

const roleDeepLinks = [
  { key: "student", href: "/student" },
  { key: "placement", href: "/placementcell" },
  { key: "mentor", href: "/mentor" },
  { key: "supervisor", href: "/supervisor" },
  { key: "recruiter", href: "/recruiter" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
              <GraduationCap className="h-6 w-6 text-background" />
            </div>
            <span className="text-xl font-bold">SAARTHI</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#roles"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              For Teams
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
          </nav>
          <Link href="#choose-role">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Trusted by 100+ institutions nationwide
          </Badge>
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Connect Talent with Opportunity
          </h1>
          <p className="mb-10 text-balance text-lg text-muted-foreground md:text-xl">
            The complete platform for internships and placements. Streamline
            recruitment, empower students, and build successful careers with our
            industry-leading portal.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="#choose-role">
              <Button size="lg" className="w-full gap-2 sm:w-auto">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Role Selector */}
        <div className="mt-10">
          <RoleSelector />
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="mb-2 text-4xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome to SAARTHI Section */}
      <section id="choose-role" className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Welcome to SAARTHI
          </h2>
          <p className="text-muted-foreground">Choose your role to continue</p>
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <RoleSelector />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="text-balance text-lg text-muted-foreground">
              Powerful features designed to make placements seamless for
              everyone involved
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <div key={idx}>
                <Card className="border-none shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-foreground">
                      <feature.icon className="h-6 w-6 text-background" />
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
              Built for every stakeholder
            </h2>
            <p className="text-balance text-lg text-muted-foreground">
              Tailored experiences for students, institutions, and recruiters
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, idx) => {
              const link = roleDeepLinks[idx] ?? { href: "/login" };
              return (
                <div key={idx}>
                  <Card className="group border-none shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <div
                        className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${role.color}`}
                      >
                        <role.icon className="h-7 w-7" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        {role.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {role.description}
                      </p>
                      <Link
                        href={link.href}
                        className="inline-flex items-center"
                      >
                        <Button
                          variant="ghost"
                          className="group-hover:gap-2 p-0 transition-all"
                        >
                          Continue as {role.title}
                          <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-foreground py-20 text-background">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl">
              Ready to transform your placement process?
            </h2>
            <p className="mb-8 text-balance text-lg text-background/80">
              Join thousands of students and hundreds of institutions already
              using SAARTHI
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="#choose-role">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full gap-2 sm:w-auto"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-background/20 bg-transparent text-background hover:bg-background/10 sm:w-auto"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                  <GraduationCap className="h-5 w-5 text-background" />
                </div>
                <span className="font-bold">SAARTHI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting talent with opportunity across India&#39;s leading
                institutions.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2025 SAARTHI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
