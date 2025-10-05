"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Eye, Mail, Search, Download } from "lucide-react";
import { useState } from "react";

const mockInterns = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@student.edu",
    department: "Computer Science",
    project: "Web Application Development",
    company: "Tech Corp",
    progress: 75,
    performance: 4.5,
    status: "Active",
    startDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@student.edu",
    department: "Data Science",
    project: "ML Model Development",
    company: "Data Inc",
    progress: 45,
    performance: 4.0,
    status: "Active",
    startDate: "2024-01-20",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@student.edu",
    department: "Computer Science",
    project: "Mobile App Development",
    company: "StartupXYZ",
    progress: 90,
    performance: 4.8,
    status: "Active",
    startDate: "2024-01-10",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david@student.edu",
    department: "IT",
    project: "Cloud Infrastructure",
    company: "Cloud Systems",
    progress: 60,
    performance: 4.2,
    status: "Active",
    startDate: "2024-01-25",
  },
];

export default function Interns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInterns = mockInterns.filter((intern) => {
    const matchesSearch =
      intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || intern.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" || intern.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Interns</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Monitor and manage your interns
          </p>
        </div>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export List
        </Button>
      </div>

      {/* Stats Cards - 2 per row on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Total Interns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {mockInterns.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {mockInterns.filter((i) => i.status === "Active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Avg Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {Math.round(
                mockInterns.reduce((sum, i) => sum + i.progress, 0) /
                  mockInterns.length
              )}
              %
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Avg Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {(
                mockInterns.reduce((sum, i) => sum + i.performance, 0) /
                mockInterns.length
              ).toFixed(1)}
              /5
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search interns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">
                  Computer Science
                </SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Intern Cards - Mobile View */}
      <div className="lg:hidden space-y-3">
        {filteredInterns.map((intern) => (
          <Card key={intern.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{intern.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {intern.email}
                    </p>
                  </div>
                  <Badge variant="outline">{intern.status}</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Department:</span>{" "}
                    {intern.department}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Project:</span>{" "}
                    {intern.project}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Company:</span>{" "}
                    {intern.company}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Performance:</span>{" "}
                    {intern.performance}/5
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{intern.progress}%</span>
                  </div>
                  <Progress value={intern.progress} className="h-2" />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table - Desktop View */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Intern List</CardTitle>
          <CardDescription>
            Track your interns&#39; progress and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{intern.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {intern.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{intern.department}</TableCell>
                  <TableCell>{intern.project}</TableCell>
                  <TableCell>{intern.company}</TableCell>
                  <TableCell>
                    <div className="space-y-1 min-w-[100px]">
                      <Progress value={intern.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">
                        {intern.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{intern.performance}/5</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{intern.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
