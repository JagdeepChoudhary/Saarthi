"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  Share2,
  Copy,
  Download,
  QrCode,
  CheckCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Input } from "@/components/ui/input";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const mockOpenings = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Corp",
    applicants: 45,
    status: "Active",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Analytics Ltd",
    applicants: 32,
    status: "Active",
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Design Studio",
    applicants: 28,
    status: "Closed",
  },
];

const mockRecruiters = [
  {
    id: 1,
    name: "Tech Corp",
    contact: "hr@techcorp.com",
    status: "Verified",
    openings: 3,
  },
  {
    id: 2,
    name: "StartupXYZ",
    contact: "jobs@startup.com",
    status: "Pending",
    openings: 1,
  },
  {
    id: 3,
    name: "Global Inc",
    contact: "recruit@global.com",
    status: "Verified",
    openings: 5,
  },
];

const departmentPlacementData = {
  labels: ["CSE", "ECE", "MECH", "CIVIL", "EEE"],
  datasets: [
    {
      label: "2024",
      data: [85, 78, 65, 70, 75],
      backgroundColor: "rgba(99, 102, 241, 0.7)",
    },
    {
      label: "2023",
      data: [80, 75, 60, 65, 72],
      backgroundColor: "rgba(16, 185, 129, 0.7)",
    },
  ],
};

const yearlyPlacementData = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
  datasets: [
    {
      label: "Placement Rate",
      data: [60, 65, 70, 72, 73, 78],
      borderColor: "rgba(99, 102, 241, 1)",
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      tension: 0.4,
    },
  ],
};

export default function PlacementDashboard() {
  const [copied, setCopied] = useState(false);
  const dashboardUrl = "https://portal.university.edu/placement/dashboard";

  const handleCopyDashboard = () => {
    navigator.clipboard.writeText(dashboardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareDashboard = () => {
    if (navigator.share) {
      navigator.share({
        title: "Placement Cell Dashboard",
        text: "Check out our placement statistics and opportunities!",
        url: dashboardUrl,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Overview
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Monitor placement activities and key metrics
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share Dashboard</span>
              <span className="sm:hidden">Share</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Dashboard</DialogTitle>
              <DialogDescription>
                Share placement statistics with stakeholders
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-center rounded-lg bg-muted p-8">
                <QrCode className="h-32 w-32 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <Input value={dashboardUrl} readOnly className="flex-1" />
                <Button
                  size="icon"
                  onClick={handleCopyDashboard}
                  variant="outline"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleShareDashboard}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Link
                </Button>
                <Button className="flex-1 bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pending Actions Alert */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <AlertCircle className="h-5 w-5 shrink-0 text-orange-600 dark:text-orange-400" />
          <div className="flex-1">
            <p className="font-medium text-orange-900 dark:text-orange-100">
              2 recruiters pending verification
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              Review and approve new recruiter accounts
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            asChild
            className="w-full sm:w-auto bg-transparent"
          >
            <Link href="/placement/recruiters">
              Review
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          {
            title: "Active Openings",
            icon: Briefcase,
            value: 24,
            subtitle: "+4 this month",
            color: "text-blue-600",
            href: "/placement/job-openings",
          },
          {
            title: "Total Applications",
            icon: Users,
            value: 342,
            subtitle: "Across all openings",
            color: "text-green-600",
            href: "/placement/job-openings",
          },
          {
            title: "Verified Recruiters",
            icon: Building2,
            value: 18,
            subtitle: "2 pending verification",
            color: "text-purple-600",
            href: "/placement/recruiters",
          },
          {
            title: "Placement Rate",
            icon: TrendingUp,
            value: "78%",
            subtitle: "+5% from last year",
            color: "text-orange-600",
            href: "/placement/reports",
          },
        ].map((card, i) => (
          <Link key={i} href={card.href}>
            <Card className="transition-all hover:shadow-md cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground sm:text-sm">
                  {card.title}
                </CardTitle>
                <card.icon
                  className={`h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${card.color}`}
                />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold sm:text-2xl">
                  {card.value}
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
                  {card.subtitle}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Department-wise Placement
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Compare placement rates across departments
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px] sm:h-[300px]">
              <Bar
                data={departmentPlacementData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: { position: "bottom" },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Yearly Placement Trend
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Overall placement rate over the years
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px] sm:h-[300px]">
              <Line
                data={yearlyPlacementData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: { position: "bottom" },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/placement/job-openings">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Briefcase className="h-5 w-5" />
                Manage Job Openings
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                View and post new job opportunities
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/placement/recruiters">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Users className="h-5 w-5" />
                Verify Recruiters
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Approve and manage recruiter accounts
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/placement/reports">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <TrendingUp className="h-5 w-5" />
                View Reports
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Analyze placement statistics and trends
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
