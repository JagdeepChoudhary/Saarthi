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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Mail,
  Phone,
  Building2,
  Briefcase,
} from "lucide-react";

const mockRecruiters = [
  {
    id: 1,
    name: "John Doe",
    company: "Tech Corp",
    email: "john@techcorp.com",
    phone: "+91 98765 43210",
    status: "Verified",
    joinedDate: "2024-01-10",
    openings: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "StartupXYZ",
    email: "jane@startupxyz.com",
    phone: "+91 98765 43211",
    status: "Pending",
    joinedDate: "2024-02-15",
    openings: 1,
  },
  {
    id: 3,
    name: "Robert Johnson",
    company: "Analytics Inc",
    email: "robert@analytics.com",
    phone: "+91 98765 43212",
    status: "Verified",
    joinedDate: "2024-01-20",
    openings: 2,
  },
  {
    id: 4,
    name: "Sarah Williams",
    company: "Design Studio",
    email: "sarah@designstudio.com",
    phone: "+91 98765 43213",
    status: "Pending",
    joinedDate: "2024-02-20",
    openings: 0,
  },
  {
    id: 5,
    name: "Michael Brown",
    company: "Cloud Systems",
    email: "michael@cloudsystems.com",
    phone: "+91 98765 43214",
    status: "Rejected",
    joinedDate: "2024-02-18",
    openings: 0,
  },
];

export default function Recruiters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRecruiters, setSelectedRecruiters] = useState<number[]>([]);

  const filteredRecruiters = mockRecruiters.filter((recruiter) => {
    const matchesSearch =
      recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || recruiter.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedRecruiters.length === filteredRecruiters.length) {
      setSelectedRecruiters([]);
    } else {
      setSelectedRecruiters(filteredRecruiters.map((r) => r.id));
    }
  };

  const handleSelectRecruiter = (id: number) => {
    setSelectedRecruiters((prev) =>
      prev.includes(id)
        ? prev.filter((recruiterId) => recruiterId !== id)
        : [...prev, id]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Verified
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "Rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Recruiters Management</h1>
        <p className="mt-2 text-muted-foreground">
          Verify and manage recruiter accounts
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Recruiters
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRecruiters.length}</div>
            <p className="text-xs text-muted-foreground">
              All registered recruiters
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockRecruiters.filter((r) => r.status === "Verified").length}
            </div>
            <p className="text-xs text-muted-foreground">Active recruiters</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approval
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockRecruiters.filter((r) => r.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting verification
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Openings
            </CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockRecruiters.reduce((sum, r) => sum + r.openings, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              From verified recruiters
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, company, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedRecruiters.length > 0 && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">
                  {selectedRecruiters.length} selected
                </p>
                <div className="flex gap-2 ml-auto">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Approve Selected
                  </Button>
                  <Button size="sm" variant="destructive">
                    <XCircle className="mr-1 h-3 w-3" />
                    Reject Selected
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recruiter List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recruiter List</CardTitle>
              <CardDescription>
                Showing {filteredRecruiters.length} of {mockRecruiters.length}{" "}
                recruiters
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={
                  selectedRecruiters.length === filteredRecruiters.length
                }
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-muted-foreground">Select All</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredRecruiters.map((recruiter) => (
              <div
                key={recruiter.id}
                className="flex flex-col gap-4 rounded-lg border p-4 transition-all hover:shadow-sm lg:flex-row lg:items-center"
              >
                <Checkbox
                  checked={selectedRecruiters.includes(recruiter.id)}
                  onCheckedChange={() => handleSelectRecruiter(recruiter.id)}
                />
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{recruiter.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        {recruiter.company}
                      </div>
                    </div>
                    {getStatusBadge(recruiter.status)}
                  </div>
                  <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {recruiter.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {recruiter.phone}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-3 w-3" />
                      {recruiter.openings} openings
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {recruiter.status === "Pending" ? (
                    <>
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700 sm:flex-none"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1 sm:flex-none"
                      >
                        <XCircle className="mr-1 h-3 w-3" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full sm:w-auto bg-transparent"
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredRecruiters.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No recruiters found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
