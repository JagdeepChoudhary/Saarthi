"use client";

import { useState } from "react";
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Search } from "lucide-react";
import { ApplyJobModal } from "@/components/apply-job-modal";

// Mock job data (similar to your second version)
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Tech Corp",
    location: "Remote",
    type: "Internship",
    match: 95,
    salary: 20000,
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Data Inc",
    location: "Bangalore",
    type: "Full-time",
    match: 88,
    salary: 700000,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Mumbai",
    type: "Internship",
    match: 82,
    salary: 18000,
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "StartupXYZ",
    location: "Pune",
    type: "Full-time",
    match: 78,
    salary: 900000,
  },
];

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<
    "All" | "Internship" | "Full-time"
  >("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [salaryRange, setSalaryRange] = useState<number[]>([0, 1000000]);
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<
    (typeof mockJobs)[number] | null
  >(null);

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || job.type === filterType;
    const matchesLocation =
      filterLocation === "All" || job.location === filterLocation;
    const matchesSalary =
      job.salary >= salaryRange[0] && job.salary <= salaryRange[1];
    return matchesSearch && matchesType && matchesLocation && matchesSalary;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Job Recommendations</h1>
        <p className="text-muted-foreground">
          AI-matched opportunities based on your skills and preferences
        </p>
      </div>

      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {/* Search */}
        <div className="relative col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs or companies..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Job Type */}
        <Select
          value={filterType}
          onValueChange={(value: "All" | "Internship" | "Full-time") =>
            setFilterType(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
          </SelectContent>
        </Select>

        {/* Location */}
        <Select value={filterLocation} onValueChange={setFilterLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Locations</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Bangalore">Bangalore</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Pune">Pune</SelectItem>
          </SelectContent>
        </Select>

        {/* Stipend/CTC Range */}
        <div className="space-y-2 col-span-2">
          <label className="text-sm font-medium">Salary / Stipend Range</label>
          <Slider
            min={0}
            max={1000000}
            step={10000}
            value={salaryRange}
            onValueChange={setSalaryRange}
          />
          <p className="text-xs text-muted-foreground">
            ₹{salaryRange[0].toLocaleString()} - ₹
            {salaryRange[1].toLocaleString()}
          </p>
        </div>
      </div>

      {/* Job List */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredJobs.length === 0 && (
          <p className="text-muted-foreground">No jobs found.</p>
        )}

        {filteredJobs.map((job) => (
          <Card
            key={job.id}
            className="border-none shadow-sm transition hover:shadow-md"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </div>
                <Badge variant={job.match >= 90 ? "default" : "secondary"}>
                  {job.match}% Match
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {job.location}
                  </span>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="font-semibold">
                    {job.type === "Internship"
                      ? `₹${job.salary.toLocaleString()}/month`
                      : `₹${(job.salary / 100000).toFixed(1)} LPA`}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedJob(job);
                      setApplyOpen(true);
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Apply Modal */}
      <ApplyJobModal
        open={applyOpen}
        onOpenChange={setApplyOpen}
        job={selectedJob}
        onSubmitted={() =>
          toast.success("Application Submitted", {
            description: `You applied for ${selectedJob?.title} at ${selectedJob?.company}`,
          })
        }
      />
    </div>
  );
}
