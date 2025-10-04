"use client";

import { useState } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, Search } from "lucide-react";

const mockJobs = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Tech Corp",
    location: "Bangalore",
    type: "Internship",
    duration: "3 months",
    stipend: "₹25,000/month",
    deadline: "2024-03-15",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    duration: "Permanent",
    stipend: "₹8-12 LPA",
    deadline: "2024-03-20",
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "Analytics Inc",
    location: "Mumbai",
    type: "Internship",
    duration: "6 months",
    stipend: "₹30,000/month",
    deadline: "2024-03-18",
  },
];

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<
    "All" | "Internship" | "Full-time"
  >("All");

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || job.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Job Openings</h1>
        <p className="text-muted-foreground">
          Browse and apply to available opportunities
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 rounded-md border border-muted-foreground"
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as "All" | "Internship" | "Full-time")
          }
        >
          <option value="All">All Types</option>
          <option value="Internship">Internship</option>
          <option value="Full-time">Full-time</option>
        </select>
      </div>

      {/* Jobs */}
      <div className="grid gap-4">
        {filteredJobs.length === 0 && (
          <p className="text-muted-foreground">No jobs found.</p>
        )}
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={job.type === "Internship" ? "secondary" : "default"}
                >
                  {job.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {job.duration}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Stipend/CTC: {job.stipend}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Deadline: {job.deadline}
                    </p>
                  </div>
                  <Button>Apply Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
