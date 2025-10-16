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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  TrendingUp,
  Users,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { JobDetailsModal } from "@/components/recuiter/view-applications-details";
import { useState } from "react";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    applicants: 45,
    shortlisted: 12,
    interviewed: 5,
    selected: 2,
    status: "Active",
  },
  {
    id: 2,
    title: "Backend Developer",
    applicants: 38,
    shortlisted: 10,
    interviewed: 4,
    selected: 1,
    status: "Active",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    applicants: 52,
    shortlisted: 15,
    interviewed: 8,
    selected: 0,
    status: "Active",
  },
  {
    id: 4,
    title: "Mobile Developer Intern",
    applicants: 28,
    shortlisted: 8,
    interviewed: 3,
    selected: 1,
    status: "Closed",
  },
];

type Job = {
  id: number;
  title: string;
  applicants: number;
  shortlisted: number;
  interviewed: number;
  selected: number;
  status: string;
};

export default function Applications() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Job Applications
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Track applications across all your job postings
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              Total Applications
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">163</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              Shortlisted
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              27.6% shortlist rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              Interviewed
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              Offers Made
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 accepted</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Application Overview
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Summary of applications for each job posting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead className="text-center">Applicants</TableHead>
                      <TableHead className="text-center">Shortlisted</TableHead>
                      <TableHead className="text-center">Interviewed</TableHead>
                      <TableHead className="text-center">Selected</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                        <TableCell className="text-center">
                          {job.applicants}
                        </TableCell>
                        <TableCell className="text-center">
                          {job.shortlisted}
                        </TableCell>
                        <TableCell className="text-center">
                          {job.interviewed}
                        </TableCell>
                        <TableCell className="text-center">
                          {job.selected}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              job.status === "Active" ? "default" : "secondary"
                            }
                          >
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedJob(job);
                              setModalOpen(true);
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="md:hidden space-y-3">
                {mockJobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-sm">{job.title}</p>
                          <Badge
                            variant={
                              job.status === "Active" ? "default" : "secondary"
                            }
                            className="mt-1"
                          >
                            {job.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div>
                          <p className="text-muted-foreground">Applicants</p>
                          <p className="font-semibold">{job.applicants}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Shortlisted</p>
                          <p className="font-semibold">{job.shortlisted}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Interviewed</p>
                          <p className="font-semibold">{job.interviewed}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Selected</p>
                          <p className="font-semibold">{job.selected}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        View Details
                        <ArrowUpRight className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
              <CardDescription>
                Currently accepting applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                3 active job postings
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closed">
          <Card>
            <CardHeader>
              <CardTitle>Closed Positions</CardTitle>
              <CardDescription>
                No longer accepting applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">1 closed position</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <JobDetailsModal
        job={selectedJob}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
