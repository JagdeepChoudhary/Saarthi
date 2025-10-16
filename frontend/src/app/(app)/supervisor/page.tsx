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
  Download,
  MessageSquare,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

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

// Mock Data
const performanceData = {
  labels: ["Alice", "Bob", "Carol", "David", "Emma"],
  datasets: [
    {
      label: "Rating",
      data: [4.5, 4.0, 4.8, 4.2, 4.6],
      backgroundColor: "rgba(99, 102, 241, 0.7)",
      borderRadius: 6,
    },
  ],
};

const progressTrendData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  datasets: [
    {
      label: "Progress (%)",
      data: [40, 55, 65, 75, 85],
      borderColor: "rgba(16, 185, 129, 1)",
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 5,
    },
  ],
};

const departmentData = {
  labels: ["CSE", "Data Science", "IT", "ECE"],
  datasets: [
    {
      label: "Interns",
      data: [8, 5, 4, 3],
      backgroundColor: [
        "rgba(99, 102, 241, 0.7)",
        "rgba(16, 185, 129, 0.7)",
        "rgba(234, 179, 8, 0.7)",
        "rgba(239, 68, 68, 0.7)",
      ],
      borderRadius: 6,
    },
  ],
};

const statusData = {
  labels: ["Active", "Completed", "On Hold"],
  datasets: [
    {
      data: [15, 8, 2],
      backgroundColor: [
        "rgba(59,130,246,0.7)",
        "rgba(34,197,94,0.7)",
        "rgba(234,179,8,0.7)",
      ],
      borderWidth: 1,
    },
  ],
};

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

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            title: "Active Interns",
            value: 15,
            icon: Users,
            subtitle: "Under supervision",
          },
          {
            title: "Pending Reviews",
            value: 8,
            icon: ClipboardCheck,
            subtitle: "Need attention",
          },
          {
            title: "Avg Performance",
            value: "4.4/5",
            icon: TrendingUp,
            subtitle: "Overall rating",
          },
          {
            title: "Certificates",
            value: 45,
            icon: Award,
            subtitle: "Issued this year",
          },
        ].map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Performance Ratings */}
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
            <div className="h-[250px] sm:h-[300px]">
              <Bar
                data={performanceData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "bottom" } },
                  scales: {
                    y: { beginAtZero: true, max: 5 },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Progress Trend */}
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
            <div className="h-[250px] sm:h-[300px]">
              <Line
                data={progressTrendData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "bottom" } },
                  scales: {
                    y: { beginAtZero: true, max: 100 },
                  },
                }}
              />
            </div>
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
            <div className="h-[250px] sm:h-[300px]">
              <Bar
                data={departmentData}
                options={{
                  indexAxis: "y",
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { beginAtZero: true },
                  },
                }}
              />
            </div>
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
            <div className="h-[250px] sm:h-[300px] flex items-center justify-center">
              <Pie
                data={statusData}
                options={{
                  plugins: {
                    legend: { position: "bottom" },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
