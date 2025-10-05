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
import {
  Briefcase,
  Users,
  Star,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Plus,
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
  Legend,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const applicationData = [
  { month: "Jul", applications: 45, shortlisted: 12, interviewed: 5 },
  { month: "Aug", applications: 52, shortlisted: 15, interviewed: 8 },
  { month: "Sep", applications: 48, shortlisted: 14, interviewed: 6 },
  { month: "Oct", applications: 61, shortlisted: 18, interviewed: 10 },
  { month: "Nov", applications: 55, shortlisted: 16, interviewed: 9 },
  { month: "Dec", applications: 68, shortlisted: 20, interviewed: 12 },
];

const hiringFunnelData = [
  { stage: "Applied", count: 163 },
  { stage: "Screened", count: 95 },
  { stage: "Shortlisted", count: 45 },
  { stage: "Interviewed", count: 20 },
  { stage: "Offered", count: 8 },
  { stage: "Accepted", count: 6 },
];

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    applicants: 45,
    deadline: "2024-02-15",
    status: "Active",
  },
  {
    id: 2,
    title: "Backend Developer",
    applicants: 38,
    deadline: "2024-02-20",
    status: "Active",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    applicants: 52,
    deadline: "2024-02-25",
    status: "Active",
  },
];

const upcomingInterviews = [
  {
    id: 1,
    candidate: "Rahul Sharma",
    position: "Frontend Developer",
    time: "10:00 AM",
    date: "Today",
  },
  {
    id: 2,
    candidate: "Priya Patel",
    position: "Backend Developer",
    time: "2:00 PM",
    date: "Today",
  },
  {
    id: 3,
    candidate: "Amit Kumar",
    position: "Full Stack Developer",
    time: "11:00 AM",
    date: "Tomorrow",
  },
];

export default function RecruiterDashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Recruiter Dashboard
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage job postings and find top talent
          </p>
        </div>
        <Link href="/recruiter/post-job">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              Active Openings
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently hiring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              Total Applicants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">163</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +23 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              Shortlisted
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">27.6% rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              Interviews
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Application Trends
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Monthly application statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                applications: {
                  label: "Applications",
                  color: "hsl(var(--chart-1))",
                },
                shortlisted: {
                  label: "Shortlisted",
                  color: "hsl(var(--chart-2))",
                },
                interviewed: {
                  label: "Interviewed",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px] md:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="var(--color-applications)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="shortlisted"
                    stroke="var(--color-shortlisted)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="interviewed"
                    stroke="var(--color-interviewed)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Hiring Funnel
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Candidate progression through stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Candidates",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px] md:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hiringFunnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis
                    dataKey="stage"
                    type="category"
                    width={80}
                    tick={{ fontSize: 12 }}
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
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base md:text-lg">
                Active Job Postings
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Your current openings
              </CardDescription>
            </div>
            <Link href="/recruiter/post-job">
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">New Job</span>
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm md:text-base">
                      {job.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{job.applicants} applicants</span>
                      <span>•</span>
                      <span>Deadline: {job.deadline}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white">
                      {job.status}
                    </Badge>
                    <Link href="/recruiter/applications">
                      <Button size="sm" variant="ghost">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base md:text-lg">
                Upcoming Interviews
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Scheduled interview sessions
              </CardDescription>
            </div>
            <Link href="/recruiter/interviews">
              <Button size="sm" variant="outline">
                <span className="hidden sm:inline">View All</span>
                <ArrowUpRight className="h-4 w-4 sm:ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-start justify-between p-3 rounded-lg border"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm md:text-base">
                      {interview.candidate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {interview.position}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {interview.date} at {interview.time}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={interview.date === "Today" ? "default" : "outline"}
                  >
                    {interview.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
