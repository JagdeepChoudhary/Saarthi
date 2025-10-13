"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  TrendingUp,
  FileText,
  ClipboardCheck,
  MessageSquare,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    cgpa: 8.5,
    applications: 12,
    progress: 75,
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    cgpa: 9.0,
    applications: 8,
    progress: 90,
    status: "Placed",
  },
  {
    id: 3,
    name: "Mike Johnson",
    cgpa: 7.8,
    applications: 15,
    progress: 60,
    status: "Active",
  },
  {
    id: 4,
    name: "Sarah Williams",
    cgpa: 8.8,
    applications: 10,
    progress: 80,
    status: "Active",
  },
];

const progressData = [
  { month: "Jan", progress: 45 },
  { month: "Feb", progress: 52 },
  { month: "Mar", progress: 61 },
  { month: "Apr", progress: 68 },
  { month: "May", progress: 73 },
];

const studentPerformanceData = [
  { category: "Applications", count: 45 },
  { category: "Interviews", count: 18 },
  { category: "Offers", count: 8 },
  { category: "Placed", count: 8 },
];

// Chart Configurations
const lineData = {
  labels: progressData.map((d) => d.month),
  datasets: [
    {
      label: "Average Progress (%)",
      data: progressData.map((d) => d.progress),
      borderColor: "hsl(217.2 91.2% 59.8%)",
      backgroundColor: "rgba(59,130,246,0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: "hsl(217.2 91.2% 59.8%)",
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { grid: { color: "rgba(200,200,200,0.1)" } },
    y: { beginAtZero: true, grid: { color: "rgba(200,200,200,0.1)" } },
  },
};

const barData = {
  labels: studentPerformanceData.map((d) => d.category),
  datasets: [
    {
      label: "Count",
      data: studentPerformanceData.map((d) => d.count),
      backgroundColor: [
        "rgba(59,130,246,0.8)",
        "rgba(34,197,94,0.8)",
        "rgba(234,179,8,0.8)",
        "rgba(239,68,68,0.8)",
      ],
      borderRadius: 8,
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { grid: { color: "rgba(200,200,200,0.1)" } },
    y: { beginAtZero: true, grid: { color: "rgba(200,200,200,0.1)" } },
  },
};

export default function MentorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Mentor Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Guide and support your mentees
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          {
            title: "Total Mentees",
            value: 24,
            icon: Users,
            desc: "Active students",
          },
          {
            title: "Pending Approvals",
            value: 7,
            icon: ClipboardCheck,
            desc: "Awaiting review",
          },
          {
            title: "Avg Progress",
            value: "73%",
            icon: TrendingUp,
            desc: "Overall",
          },
          {
            title: "Feedback Given",
            value: 156,
            icon: FileText,
            desc: "This semester",
          },
        ].map(({ title, value, icon: Icon, desc }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                {title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Student Progress Trend
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Average progress over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[250px]">
              <Line data={lineData} options={lineOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Student Performance
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Applications to placements funnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[250px]">
              <Bar data={barData} options={barOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student List + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base sm:text-lg">
                  Recent Student Activity
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Monitor your mentees&#39; progress
                </CardDescription>
              </div>
              <Link href="/mentor/students">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  View All
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudents.map((student) => (
                <div key={student.id} className="rounded-lg border p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm sm:text-base truncate">
                          {student.name}
                        </p>
                        <Badge
                          variant={
                            student.status === "Placed"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {student.status}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        CGPA: {student.cgpa}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs whitespace-nowrap ml-2"
                    >
                      {student.applications} apps
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                {
                  href: "/mentor/approvals",
                  icon: ClipboardCheck,
                  text: "Review Approvals",
                },
                {
                  href: "/mentor/meetings",
                  icon: Calendar,
                  text: "Schedule Meeting",
                },
                { href: "#", icon: MessageSquare, text: "Send Feedback" },
                {
                  href: "/mentor/students",
                  icon: Users,
                  text: "View All Students",
                },
              ].map(({ href, icon: Icon, text }) => (
                <Link href={href} key={text}>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs sm:text-sm bg-transparent"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {text}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Upcoming Meetings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium">
                  John Doe - One-on-One
                </p>
                <p className="text-xs text-muted-foreground">Today, 10:00 AM</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium">Group Session</p>
                <p className="text-xs text-muted-foreground">
                  Tomorrow, 2:00 PM
                </p>
              </div>
              <Link href="/mentor/meetings">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View All Meetings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
