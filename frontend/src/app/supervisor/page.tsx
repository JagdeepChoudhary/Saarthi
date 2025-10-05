"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Award,
  TrendingUp,
  ClipboardCheck,
  FileText,
  MessageSquare,
  Download,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
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
import Link from "next/link";

const performanceData = [
  { name: "Alice Johnson", rating: 4.5 },
  { name: "Bob Williams", rating: 4.0 },
  { name: "Carol Davis", rating: 4.8 },
  { name: "David Lee", rating: 4.2 },
  { name: "Emma Wilson", rating: 4.6 },
];

const progressTrendData = [
  { week: "Week 1", progress: 40 },
  { week: "Week 2", progress: 55 },
  { week: "Week 3", progress: 65 },
  { week: "Week 4", progress: 75 },
  { week: "Week 5", progress: 85 },
];

const departmentData = [
  { department: "Computer Science", count: 8 },
  { department: "Data Science", count: 5 },
  { department: "IT", count: 4 },
  { department: "Electronics", count: 3 },
];

const statusData = [
  { name: "Active", value: 15, color: "hsl(var(--chart-1))" },
  { name: "Completed", value: 8, color: "hsl(var(--chart-2))" },
  { name: "On Hold", value: 2, color: "hsl(var(--chart-3))" },
];

const recentActivity = [
  {
    id: 1,
    intern: "Alice Johnson",
    action: "Submitted weekly report",
    time: "2 hours ago",
  },
  {
    id: 2,
    intern: "Bob Williams",
    action: "Completed milestone 3",
    time: "5 hours ago",
  },
  {
    id: 3,
    intern: "Carol Davis",
    action: "Requested evaluation",
    time: "1 day ago",
  },
  {
    id: 4,
    intern: "David Lee",
    action: "Updated project status",
    time: "2 days ago",
  },
];

export default function SupervisorDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Supervisor Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Monitor intern progress and manage evaluations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none bg-transparent"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      {/* Stats Cards - 2 per row on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Active Interns
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground mt-1">
              Under supervision
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Pending Reviews
              </CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Avg Performance
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">4.4/5</div>
            <p className="text-xs text-muted-foreground mt-1">Overall rating</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Certificates
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground mt-1">
              Issued this year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Performance Ratings Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Performance Ratings
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Current intern performance overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rating: {
                  label: "Rating",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="rating"
                    fill="var(--color-rating)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Progress Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Progress Trend
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Average progress over 5 weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                progress: {
                  label: "Progress %",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="var(--color-progress)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Department Distribution
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Interns by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Interns",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis
                    dataKey="department"
                    type="category"
                    width={100}
                    tick={{ fontSize: 10 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="var(--color-count)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Internship Status
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Current status breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                active: {
                  label: "Active",
                  color: "hsl(var(--chart-1))",
                },
                completed: {
                  label: "Completed",
                  color: "hsl(var(--chart-2))",
                },
                onHold: {
                  label: "On Hold",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/supervisor/interns">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Users className="h-4 w-4 mr-2" />
                View All Interns
              </Button>
            </Link>
            <Link href="/supervisor/evaluations">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Pending Evaluations
              </Button>
            </Link>
            <Link href="/supervisor/certificates">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Award className="h-4 w-4 mr-2" />
                Issue Certificates
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Latest updates from interns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3 border-b last:border-0"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.intern}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
