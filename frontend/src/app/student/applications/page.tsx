"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Star } from "lucide-react";

const mockApplications = [
  {
    id: 1,
    company: "Tech Corp",
    position: "Frontend Developer",
    status: "Under Review",
    date: "2024-01-15",
    appliedOn: "2024-01-10",
  },
  {
    id: 2,
    company: "Data Inc",
    position: "Data Analyst",
    status: "Accepted",
    date: "2024-01-10",
    appliedOn: "2024-01-05",
  },
  {
    id: 3,
    company: "Creative Studio",
    position: "UI/UX Designer",
    status: "Rejected",
    date: "2024-01-08",
    appliedOn: "2024-01-02",
  },
  {
    id: 4,
    company: "StartupXYZ",
    position: "Backend Developer",
    status: "Interview",
    date: "2024-01-12",
    appliedOn: "2024-01-07",
    interviewDate: "2024-01-20",
  },
];

const statusConfig = {
  "Under Review": {
    icon: Clock,
    color: "bg-amber-500",
    textColor: "text-amber-700",
    bgLight: "bg-amber-50",
  },
  Accepted: {
    icon: CheckCircle,
    color: "bg-green-500",
    textColor: "text-green-700",
    bgLight: "bg-green-50",
  },
  Rejected: {
    icon: XCircle,
    color: "bg-red-500",
    textColor: "text-red-700",
    bgLight: "bg-red-50",
  },
  Interview: {
    icon: Star,
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgLight: "bg-blue-50",
  },
};

export default function Applications() {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">Track your application status</p>
      </div>

      {/* Card list like provided config */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Application Tracker</CardTitle>
          <CardDescription>
            Monitor the status of your applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockApplications.map((app) => {
              const config =
                statusConfig[app.status as keyof typeof statusConfig];
              const StatusIcon = config.icon;
              return (
                <div
                  key={app.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${config.bgLight}`}
                    >
                      <StatusIcon className={`h-6 w-6 ${config.textColor}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-semibold">{app.position}</p>
                      <p className="text-sm text-muted-foreground">
                        {app.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Applied: {app.appliedOn}
                      </p>
                      {app.interviewDate && (
                        <p className="text-xs font-medium text-blue-600">
                          Interview: {app.interviewDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <Badge className={config.color}>{app.status}</Badge>
                    <p className="text-xs text-muted-foreground">
                      Updated: {app.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
