"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import RoleSelector from "@/components/role-selector";
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
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#roles"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For Teams
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
          <Link href="#choose-role">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 text-center">
        <Badge
          variant="secondary"
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full"
        >
          <div className="h-2 w-2 rounded-full bg-green-500" />
          Trusted by 100+ institutions nationwide
        </Badge>
        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
          Connect Talent with Opportunity
        </h1>
        <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
          The complete platform for internships and placements. Streamline
          recruitment, empower students, and build successful careers.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row justify-center">
          <Link href="#choose-role">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Start Your Journey <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-4xl mx-auto text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <h3 className="text-4xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles Section */}
      <section id="choose-role" className="bg-muted/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Welcome to SAARTHI
            </h2>
            <p className="text-muted-foreground">
              Choose your role to continue
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {roles.map((role, idx) => {
              const link = roleDeepLinks[idx] ?? { href: "/login" };
              return (
                <Card
                  key={idx}
                  className="group border-none shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                  <CardContent className="pt-6">
                    <div
                      className={`mb-4 h-14 w-14 flex items-center justify-center rounded-xl ${role.color}`}
                    >
                      <role.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{role.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {role.description}
                    </p>
                    <Link href={link.href} className="inline-flex items-center">
                      <Button
                        variant="ghost"
                        className="gap-2 p-0 group-hover:gap-2 transition-all"
                      >
                        Continue as {role.title}{" "}
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to make placements seamless for
              everyone involved
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="border-none shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 h-12 w-12 flex items-center justify-center rounded-lg bg-foreground mx-auto">
                    <feature.icon className="h-6 w-6 text-background" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-20 text-center">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your placement process?
          </h2>
          <p className="text-lg text-background/80 mb-8">
            Join thousands of students and hundreds of institutions already
            using SAARTHI
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#choose-role">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
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
      </footer>
    </div>
  );
}
