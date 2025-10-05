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
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Total Mentees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Active students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Avg Progress
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">73%</div>
            <Progress value={73} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Feedback Given
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

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
            <ChartContainer
              config={{
                progress: {
                  label: "Progress",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[200px] sm:h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
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
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[200px] sm:h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

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
                  className="text-xs sm:text-sm bg-transparent"
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
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs bg-transparent"
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs bg-transparent"
                    >
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
              <Link href="/mentor/approvals">
                <Button
                  variant="outline"
                  className="w-full justify-start text-xs sm:text-sm bg-transparent"
                >
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Review Approvals
                </Button>
              </Link>
              <Link href="/mentor/meetings">
                <Button
                  variant="outline"
                  className="w-full justify-start text-xs sm:text-sm bg-transparent"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full justify-start text-xs sm:text-sm bg-transparent"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Feedback
              </Button>
              <Link href="/mentor/students">
                <Button
                  variant="outline"
                  className="w-full justify-start text-xs sm:text-sm bg-transparent"
                >
                  <Users className="mr-2 h-4 w-4" />
                  View All Students
                </Button>
              </Link>
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
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs bg-transparent"
                >
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
