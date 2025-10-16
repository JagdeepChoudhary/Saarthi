"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Tech Corp",
    location: "Remote",
    type: "Internship",
    match: 95,
    salary: "₹15-20k/month",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Data Inc",
    location: "Bangalore",
    type: "Full-time",
    match: 88,
    salary: "₹6-8 LPA",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Mumbai",
    type: "Internship",
    match: 82,
    salary: "₹12-18k/month",
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "StartupXYZ",
    location: "Pune",
    type: "Full-time",
    match: 78,
    salary: "₹7-9 LPA",
  },
];

export function JobsTab() {
  const [jobs] = useState(mockJobs);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {jobs.map((job) => (
        <Card
          key={job.id}
          className="border-none shadow-sm transition-shadow hover:shadow-md"
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription className="mt-1">
                  {job.company}
                </CardDescription>
              </div>
              <Badge
                variant={job.match >= 90 ? "default" : "secondary"}
                className="shrink-0"
              >
                {job.match}% Match
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {job.location}
                </span>
                <Badge variant="outline">{job.type}</Badge>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-semibold">{job.salary}</span>
                <Button size="sm">Apply Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
