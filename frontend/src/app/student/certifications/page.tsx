"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, Download } from "lucide-react";

const mockCertifications = [
  {
    id: 1,
    title: "Software Engineering Internship",
    company: "Tech Corp",
    issueDate: "2024-01-15",
    type: "Internship",
    status: "Completed",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    company: "Online Academy",
    issueDate: "2023-12-20",
    type: "Course",
    status: "Completed",
  },
  {
    id: 3,
    title: "Data Science Internship",
    company: "Analytics Inc",
    issueDate: "2024-02-28",
    type: "Internship",
    status: "In Progress",
  },
];

export default function Certifications() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certifications</h1>
          <p className="text-muted-foreground">
            Your achievements and certificates
          </p>
        </div>
        <Button>Add Certificate</Button>
      </div>

      <div className="grid gap-4">
        {mockCertifications.map((cert) => (
          <Card key={cert.id} className="hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{cert.title}</CardTitle>
                    <CardDescription>{cert.company}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    cert.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {cert.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Issued: {cert.issueDate}
                  </div>
                  <Badge variant="outline">{cert.type}</Badge>
                </div>
                {cert.status === "Completed" && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
