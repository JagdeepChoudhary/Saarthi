"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  TrendingUp,
  Users,
  Briefcase,
  Building2,
  DollarSign,
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
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="mt-2 text-muted-foreground">
              Track placement statistics and trends
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20% from last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Placed Students
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">
                72.3% placement rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Openings
              </CardTitle>
              <Briefcase className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                12 added this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Package</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹8.5 LPA</div>
              <p className="text-xs text-muted-foreground">
                +15% from last year
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Student Stats</TabsTrigger>
            <TabsTrigger value="companies">Company Stats</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Placement Funnel</CardTitle>
                  <CardDescription>
                    Application to placement conversion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Total Applications",
                        value: 3456,
                        color: "bg-blue-600",
                      },
                      {
                        label: "Shortlisted",
                        value: 1234,
                        color: "bg-green-600",
                      },
                      {
                        label: "Interviews Scheduled",
                        value: 892,
                        color: "bg-yellow-600",
                      },
                      {
                        label: "Offers Received",
                        value: 456,
                        color: "bg-orange-600",
                      },
                      {
                        label: "Offers Accepted",
                        value: 389,
                        color: "bg-purple-600",
                      },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-muted-foreground">
                            {item.value}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full ${item.color}`}
                            style={{ width: `${(item.value / 3456) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                  <CardDescription>Placement by department</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px] flex items-center justify-center">
                    <Doughnut
                      data={departmentDistribution}
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

            <Card>
              <CardHeader>
                <CardTitle>Monthly Application Trend</CardTitle>
                <CardDescription>
                  Applications received over the past 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[300px]">
                  <Line
                    data={monthlyApplicationData}
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
          </TabsContent>

          {/* Student Stats Tab */}
          <TabsContent value="students" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Department-wise Placement</CardTitle>
                  <CardDescription>
                    Placement rate by department
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px]">
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
                  <CardTitle>CGPA vs Placement</CardTitle>
                  <CardDescription>
                    Correlation between CGPA and placement success
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px]">
                    <Bar
                      data={cgpaPlacementData}
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
          </TabsContent>

          {/* Company Stats Tab */}
          <TabsContent value="companies" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Hiring Companies</CardTitle>
                  <CardDescription>
                    Companies with most placements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { company: "Tech Corp", hires: 45, color: "bg-blue-600" },
                      {
                        company: "StartupXYZ",
                        hires: 38,
                        color: "bg-green-600",
                      },
                      {
                        company: "Analytics Inc",
                        hires: 32,
                        color: "bg-purple-600",
                      },
                      {
                        company: "Design Studio",
                        hires: 28,
                        color: "bg-orange-600",
                      },
                      {
                        company: "Cloud Systems",
                        hires: 24,
                        color: "bg-pink-600",
                      },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{item.company}</span>
                          </div>
                          <span className="text-muted-foreground">
                            {item.hires} hires
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full ${item.color}`}
                            style={{ width: `${(item.hires / 45) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Salary Distribution</CardTitle>
                  <CardDescription>Package ranges offered</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px]">
                    <Bar
                      data={salaryDistributionData}
                      options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Placement Trend</CardTitle>
                <CardDescription>
                  Historical placement data over the years
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[400px]">
                  <Line
                    data={yearlyTrendData}
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
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

// Chart Data
const departmentDistribution = {
  labels: ["CSE", "ECE", "MECH", "CIVIL", "EEE"],
  datasets: [
    {
      data: [320, 245, 180, 165, 182],
      backgroundColor: [
        "rgba(99, 102, 241, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(251, 146, 60, 0.8)",
        "rgba(236, 72, 153, 0.8)",
        "rgba(168, 85, 247, 0.8)",
      ],
    },
  ],
};

const monthlyApplicationData = {
  labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
  datasets: [
    {
      label: "Applications",
      data: [420, 580, 650, 720, 890, 1050],
      borderColor: "rgba(99, 102, 241, 1)",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      tension: 0.4,
    },
  ],
};

const departmentPlacementData = {
  labels: ["CSE", "ECE", "MECH", "CIVIL", "EEE"],
  datasets: [
    {
      label: "Placement Rate (%)",
      data: [85, 78, 65, 70, 75],
      backgroundColor: "rgba(99, 102, 241, 0.7)",
    },
  ],
};

const cgpaPlacementData = {
  labels: ["< 6.0", "6.0-7.0", "7.0-8.0", "8.0-9.0", "> 9.0"],
  datasets: [
    {
      label: "Placed Students",
      data: [45, 120, 280, 320, 127],
      backgroundColor: "rgba(16, 185, 129, 0.7)",
    },
  ],
};

const salaryDistributionData = {
  labels: ["< 4 LPA", "4-6 LPA", "6-8 LPA", "8-10 LPA", "> 10 LPA"],
  datasets: [
    {
      data: [85, 245, 320, 180, 62],
      backgroundColor: "rgba(168, 85, 247, 0.7)",
    },
  ],
};

const yearlyTrendData = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
  datasets: [
    {
      label: "Placement Rate (%)",
      data: [60, 65, 70, 72, 73, 78],
      borderColor: "rgba(99, 102, 241, 1)",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      tension: 0.4,
    },
    {
      label: "Avg Package (LPA)",
      data: [5.2, 5.8, 6.5, 7.2, 7.8, 8.5],
      borderColor: "rgba(16, 185, 129, 1)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
  ],
};
