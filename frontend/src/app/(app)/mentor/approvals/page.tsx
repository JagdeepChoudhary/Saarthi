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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { useState } from "react";

const mockApprovals = [
  {
    id: 1,
    student: "John Doe",
    company: "Tech Corp",
    position: "Frontend Developer",
    appliedDate: "2024-01-10",
    status: "Pending",
    cgpa: 8.5,
  },
  {
    id: 2,
    student: "Jane Smith",
    company: "Data Inc",
    position: "Data Analyst",
    appliedDate: "2024-01-12",
    status: "Pending",
    cgpa: 9.0,
  },
  {
    id: 3,
    student: "Mike Johnson",
    company: "StartupXYZ",
    position: "Backend Developer",
    appliedDate: "2024-01-08",
    status: "Approved",
    cgpa: 7.8,
  },
  {
    id: 4,
    student: "Sarah Williams",
    company: "CloudTech",
    position: "DevOps Intern",
    appliedDate: "2024-01-14",
    status: "Pending",
    cgpa: 8.8,
  },
  {
    id: 5,
    student: "Raj Patel",
    company: "Mobile Solutions",
    position: "Mobile Developer",
    appliedDate: "2024-01-09",
    status: "Rejected",
    cgpa: 8.2,
  },
];

export default function Approvals() {
  const [approvals, setApprovals] = useState(mockApprovals);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Application Approvals
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Review and approve student job applications
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Approved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Rejected
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="pending" className="text-xs sm:text-sm">
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved" className="text-xs sm:text-sm">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="text-xs sm:text-sm">
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {approvals
            .filter((a) => a.status === "Pending")
            .map((approval) => (
              <Card key={approval.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-base sm:text-lg">
                          {approval.student}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          CGPA: {approval.cgpa}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {approval.position} at {approval.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Applied on: {approval.appliedDate}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto text-xs bg-transparent"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start sm:border-l sm:pl-4">
                        <Label
                          htmlFor={`approve-${approval.id}`}
                          className="text-xs sm:text-sm cursor-pointer"
                        >
                          Approve
                        </Label>
                        <Switch id={`approve-${approval.id}`} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Approved Applications
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Applications you have approved
              </CardDescription>
            </CardHeader>
            <CardContent>
              {approvals
                .filter((a) => a.status === "Approved")
                .map((approval) => (
                  <div
                    key={approval.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b last:border-0 py-4 gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base">
                        {approval.student}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {approval.position} at {approval.company}
                      </p>
                    </div>
                    <Badge className="bg-green-500 w-fit text-xs">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approved
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Rejected Applications
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Applications that were not approved
              </CardDescription>
            </CardHeader>
            <CardContent>
              {approvals
                .filter((a) => a.status === "Rejected")
                .map((approval) => (
                  <div
                    key={approval.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b last:border-0 py-4 gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base">
                        {approval.student}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {approval.position} at {approval.company}
                      </p>
                    </div>
                    <Badge variant="destructive" className="w-fit text-xs">
                      <XCircle className="mr-1 h-3 w-3" />
                      Rejected
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
