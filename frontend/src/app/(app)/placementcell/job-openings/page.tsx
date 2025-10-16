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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Briefcase,
  Eye,
  Search,
  Filter,
  Calendar,
  MapPin,
  Building2,
  Users,
} from "lucide-react";

const mockOpenings = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Tech Corp",
    type: "Internship",
    location: "Bangalore",
    applicants: 45,
    deadline: "2024-03-15",
    status: "Active",
    salary: "₹25,000/month",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    type: "Full-time",
    location: "Remote",
    applicants: 28,
    deadline: "2024-03-20",
    status: "Active",
    salary: "₹8-12 LPA",
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "Analytics Inc",
    type: "Internship",
    location: "Hyderabad",
    applicants: 62,
    deadline: "2024-03-18",
    status: "Active",
    salary: "₹30,000/month",
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "Design Studio",
    type: "Full-time",
    location: "Mumbai",
    applicants: 34,
    deadline: "2024-03-10",
    status: "Closed",
    salary: "₹6-9 LPA",
  },
];

export default function JobOpenings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOpenings = mockOpenings.filter((opening) => {
    const matchesSearch =
      opening.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opening.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || opening.type === filterType;
    const matchesStatus =
      filterStatus === "all" || opening.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Openings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage all job postings and internships
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Post New Opening
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post New Job Opening</DialogTitle>
              <DialogDescription>
                Fill in the details for the new job posting
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input id="title" placeholder="e.g., Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input id="company" placeholder="Company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type *</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" placeholder="e.g., Bangalore, Remote" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary/Stipend *</Label>
                  <Input id="salary" placeholder="e.g., ₹25,000/month" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline *</Label>
                  <Input id="deadline" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter job description..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Enter job requirements..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Input id="skills" placeholder="e.g., React, Node.js, Python" />
              </div>
              <Button className="w-full">Post Opening</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Openings
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOpenings.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Briefcase className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockOpenings.filter((o) => o.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently accepting applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockOpenings.reduce((sum, o) => sum + o.applicants, 0)}
            </div>
            <p className="text-xs text-muted-foreground">From all students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Applications
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockOpenings.reduce((sum, o) => sum + o.applicants, 0) /
                  mockOpenings.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">Per opening</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredOpenings.map((opening) => (
          <Card key={opening.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{opening.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {opening.company}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    opening.status === "Active" ? "default" : "secondary"
                  }
                >
                  {opening.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {opening.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Deadline: {opening.deadline}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {opening.applicants} applicants
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <Badge variant="outline">{opening.type}</Badge>
                  <p className="text-sm font-medium mt-1">{opening.salary}</p>
                </div>
                <Button size="sm" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOpenings.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No job openings found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
