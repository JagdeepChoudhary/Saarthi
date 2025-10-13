"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Users,
  Star,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Share2,
  Copy,
  Download,
  QrCode,
  CheckCircle,
  AlertCircle,
  ArrowRight,
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
import { PostJobModal } from "@/components/recuiter/post-job";

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

// --- Line Chart Data ---
const applicationData = {
  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Applications",
      data: [45, 52, 48, 61, 55, 68],
      borderColor: "rgba(59,130,246,1)",
      backgroundColor: "rgba(59,130,246,0.2)",
      fill: true,
      tension: 0.4,
      borderWidth: 2.5,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: "Shortlisted",
      data: [12, 15, 14, 18, 16, 20],
      borderColor: "rgba(34,197,94,1)",
      backgroundColor: "rgba(34,197,94,0.2)",
      fill: true,
      tension: 0.4,
      borderWidth: 2.5,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: "Interviewed",
      data: [5, 8, 6, 10, 9, 12],
      borderColor: "rgba(251,146,60,1)",
      backgroundColor: "rgba(251,146,60,0.2)",
      fill: true,
      tension: 0.4,
      borderWidth: 2.5,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

// --- Bar Chart Data ---
const hiringFunnelData = {
  labels: [
    "Applied",
    "Screened",
    "Shortlisted",
    "Interviewed",
    "Offered",
    "Accepted",
  ],
  datasets: [
    {
      label: "Candidates",
      data: [163, 95, 45, 20, 8, 6],
      backgroundColor: [
        "rgba(59,130,246,0.8)",
        "rgba(99,102,241,0.8)",
        "rgba(139,92,246,0.8)",
        "rgba(168,85,247,0.8)",
        "rgba(192,132,252,0.8)",
        "rgba(216,180,254,0.8)",
      ],
      borderColor: [
        "rgb(59,130,246)",
        "rgb(99,102,241)",
        "rgb(139,92,246)",
        "rgb(168,85,247)",
        "rgb(192,132,252)",
        "rgb(216,180,254)",
      ],
      borderWidth: 1.5,
      borderRadius: 8,
    },
  ],
};

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
  const [copied, setCopied] = useState(false);
  const dashboardUrl = "https://portal.university.edu/recruiter/dashboard";

  const handleCopyDashboard = () => {
    navigator.clipboard.writeText(dashboardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareDashboard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Recruiter Dashboard",
          text: "Check out our recruitment statistics and opportunities!",
          url: dashboardUrl,
        });
      } catch (err) {
        console.log("Share cancelled:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Recruiter Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Manage job postings and find top talent
          </p>
        </div>

        {/* Share & New Job */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share Dashboard</DialogTitle>
                <DialogDescription>
                  Share recruitment stats with your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-center rounded-lg bg-muted p-8">
                  <QrCode className="h-32 w-32 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  <Input value={dashboardUrl} readOnly className="flex-1" />
                  <Button size="icon" onClick={handleCopyDashboard}>
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
          <PostJobModal />

          {/* <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Job
          </Button> */}
        </div>
      </div>

      {/* Alert */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <AlertCircle className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
          <div className="flex-1">
            <p className="font-medium text-blue-900 dark:text-blue-100">
              3 interviews scheduled for today
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Review candidate profiles before interviews
            </p>
          </div>
          <Button size="sm" variant="outline" className="bg-transparent">
            View Schedule
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          {
            title: "Active Openings",
            icon: Briefcase,
            value: 8,
            subtitle: "Currently hiring",
            color: "text-blue-600",
          },
          {
            title: "Total Applicants",
            icon: Users,
            value: 163,
            subtitle: "+23 this week",
            color: "text-green-600",
          },
          {
            title: "Shortlisted",
            icon: Star,
            value: 45,
            subtitle: "27.6% rate",
            color: "text-purple-600",
          },
          {
            title: "Interviews",
            icon: Calendar,
            value: 14,
            subtitle: "Scheduled",
            color: "text-orange-600",
          },
        ].map((card, i) => (
          <Card key={i} className="hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {card.subtitle === "+23 this week" && (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                )}
                {card.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
            <CardDescription>Monthly applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <Line
                data={applicationData}
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
            <CardTitle>Hiring Funnel</CardTitle>
            <CardDescription>Candidate stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <Bar
                data={hiringFunnelData}
                options={{
                  indexAxis: "y",
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs & Interviews */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Active Job Postings</CardTitle>
              <CardDescription>Your openings</CardDescription>
            </div>
            <Button size="sm" variant="outline" className="gap-1">
              <Plus className="h-4 w-4" /> New
            </Button>
          </CardHeader>
          <CardContent>
            {mockJobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-3 mb-2 flex justify-between items-center hover:shadow-sm transition-all"
              >
                <div>
                  <p className="font-medium text-sm">{job.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {job.applicants} applicants • Deadline: {job.deadline}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white border-0">
                    {job.status}
                  </Badge>
                  <Button size="sm" variant="ghost">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Next sessions</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingInterviews.map((int) => (
              <div
                key={int.id}
                className="border rounded-lg p-3 mb-2 flex justify-between hover:shadow-sm"
              >
                <div>
                  <p className="font-medium text-sm">{int.candidate}</p>
                  <p className="text-xs text-muted-foreground">
                    {int.position}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {int.date}, {int.time}
                  </p>
                </div>
                <Badge
                  className={
                    int.date === "Today"
                      ? "bg-blue-500 text-white border-0"
                      : "bg-slate-100 text-slate-700 border-0"
                  }
                >
                  {int.date}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
