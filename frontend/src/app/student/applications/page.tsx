"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const mockApplications = [
  {
    id: 1,
    company: "Tech Corp",
    position: "Software Engineering Intern",
    appliedDate: "2024-02-10",
    status: "Under Review",
  },
  {
    id: 2,
    company: "StartupXYZ",
    position: "Full Stack Developer",
    appliedDate: "2024-02-15",
    status: "Interview Scheduled",
  },
  {
    id: 3,
    company: "Analytics Inc",
    position: "Data Science Intern",
    appliedDate: "2024-02-18",
    status: "Accepted",
  },
  {
    id: 4,
    company: "CloudTech",
    position: "DevOps Intern",
    appliedDate: "2024-02-05",
    status: "Rejected",
  },
];

export default function Applications() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Accepted":
        return "default";
      case "Interview Scheduled":
        return "secondary";
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const filterByStatus = (status: string) => {
    if (status === "all") return mockApplications;
    return mockApplications.filter((app) => app.status === status);
  };

  const MobileList = ({ status }: { status: string }) => {
    const list = filterByStatus(status);
    return (
      <div className="grid gap-3 md:hidden">
        {list.map((app) => (
          <div
            key={app.id}
            className="rounded-lg border p-4 shadow-sm bg-background"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{app.position}</p>
                <p className="text-sm text-muted-foreground">{app.company}</p>
              </div>
              <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>Applied: {app.appliedDate}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-muted-foreground">Track your application status</p>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="Under Review">Pending</TabsTrigger>
            <TabsTrigger value="Interview Scheduled">Interviews</TabsTrigger>
            <TabsTrigger value="Accepted">Accepted</TabsTrigger>
            <TabsTrigger value="Rejected">Rejected</TabsTrigger>
          </TabsList>

          {[
            "all",
            "Under Review",
            "Interview Scheduled",
            "Accepted",
            "Rejected",
          ].map((status) => (
            <TabsContent key={status} value={status} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {status === "all" ? "All" : status} (
                    {filterByStatus(status).length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Mobile cards */}
                  <MobileList status={status} />

                  {/* Desktop table */}
                  <div className="hidden md:block w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterByStatus(status).map((app) => (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">
                              {app.company}
                            </TableCell>
                            <TableCell>{app.position}</TableCell>
                            <TableCell>{app.appliedDate}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusVariant(app.status)}>
                                {app.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
