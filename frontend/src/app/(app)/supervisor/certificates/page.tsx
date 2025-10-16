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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Award, CheckCircle, Clock, Download, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const mockCertificates = [
  {
    id: 1,
    internName: "Alice Johnson",
    project: "Web Application Development",
    company: "Tech Corp",
    completionDate: "2024-02-28",
    status: "Issued",
    certificateId: "CERT-2024-001",
  },
  {
    id: 2,
    internName: "Bob Williams",
    project: "ML Model Development",
    company: "Data Inc",
    completionDate: "2024-03-05",
    status: "Pending Approval",
    certificateId: null,
  },
  {
    id: 3,
    internName: "Carol Davis",
    project: "Mobile App Development",
    company: "StartupXYZ",
    completionDate: "2024-02-25",
    status: "Issued",
    certificateId: "CERT-2024-002",
  },
  {
    id: 4,
    internName: "David Lee",
    project: "Cloud Infrastructure",
    company: "Cloud Systems",
    completionDate: "2024-03-01",
    status: "Pending Approval",
    certificateId: null,
  },
];

export default function Certificates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCertificates = mockCertificates.filter((cert) => {
    const matchesSearch =
      cert.internName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Certificates</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Issue completion certificates to interns
          </p>
        </div>
        <Button size="sm">
          <Award className="h-4 w-4 mr-2" />
          Issue Certificate
        </Button>
      </div>

      {/* Stats Cards - 2 per row on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Total
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {mockCertificates.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Issued
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {mockCertificates.filter((c) => c.status === "Issued").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Pending
              </CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {
                mockCertificates.filter((c) => c.status === "Pending Approval")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium">
                This Month
              </CardTitle>
              <Award className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Issued">Issued</SelectItem>
                <SelectItem value="Pending Approval">
                  Pending Approval
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Cards - Mobile View */}
      <div className="lg:hidden space-y-3">
        {filteredCertificates.map((cert) => (
          <Card key={cert.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{cert.internName}</p>
                    <p className="text-sm text-muted-foreground">
                      {cert.project}
                    </p>
                  </div>
                  <Badge
                    variant={cert.status === "Issued" ? "default" : "secondary"}
                  >
                    {cert.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Company:</span>{" "}
                    {cert.company}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Completed:</span>{" "}
                    {cert.completionDate}
                  </p>
                  {cert.certificateId && (
                    <p>
                      <span className="text-muted-foreground">ID:</span>{" "}
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {cert.certificateId}
                      </code>
                    </p>
                  )}
                </div>
                {cert.status === "Issued" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                ) : (
                  <Button size="sm" className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve & Issue
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table - Desktop View */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Certificate Management</CardTitle>
          <CardDescription>
            View and manage internship completion certificates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intern Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Completion Date</TableHead>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">
                    {cert.internName}
                  </TableCell>
                  <TableCell>{cert.project}</TableCell>
                  <TableCell>{cert.company}</TableCell>
                  <TableCell>{cert.completionDate}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {cert.certificateId || "-"}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cert.status === "Issued" ? "default" : "secondary"
                      }
                    >
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {cert.status === "Issued" ? (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    ) : (
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve & Issue
                      </Button>
                    )}
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
