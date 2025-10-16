"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Mail,
  Phone,
  Download,
  Star,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import { useState } from "react";

const mockCandidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    cgpa: 8.5,
    skills: ["React", "Node.js", "MongoDB"],
    position: "Frontend Developer",
    status: "Shortlisted",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    match: 95,
  },
  {
    id: 2,
    name: "Priya Patel",
    cgpa: 9.0,
    skills: ["Python", "Django", "ML"],
    position: "Backend Developer",
    status: "Applied",
    email: "priya@example.com",
    phone: "+91 9876543211",
    match: 88,
  },
  {
    id: 3,
    name: "Amit Kumar",
    cgpa: 8.2,
    skills: ["Java", "Spring", "AWS"],
    position: "Full Stack Developer",
    status: "Interview Scheduled",
    email: "amit@example.com",
    phone: "+91 9876543212",
    match: 92,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    cgpa: 8.8,
    skills: ["React Native", "Flutter", "Firebase"],
    position: "Mobile Developer",
    status: "Shortlisted",
    email: "sneha@example.com",
    phone: "+91 9876543213",
    match: 90,
  },
  {
    id: 5,
    name: "Vikram Singh",
    cgpa: 7.9,
    skills: ["UI/UX", "Figma", "Adobe XD"],
    position: "Design Intern",
    status: "Applied",
    email: "vikram@example.com",
    phone: "+91 9876543214",
    match: 85,
  },
];

export default function Candidates() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Candidates
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Review and manage job applicants
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export All
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="sm:w-auto bg-transparent"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="w-full grid grid-cols-4 h-auto">
          <TabsTrigger value="all" className="text-xs md:text-sm">
            All
          </TabsTrigger>
          <TabsTrigger value="shortlisted" className="text-xs md:text-sm">
            Shortlisted
          </TabsTrigger>
          <TabsTrigger value="interviewed" className="text-xs md:text-sm">
            Interviewed
          </TabsTrigger>
          <TabsTrigger value="selected" className="text-xs md:text-sm">
            Selected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 md:space-y-4">
          {mockCandidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm md:text-base">
                            {candidate.name}
                          </h3>
                          {candidate.status === "Shortlisted" && (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {candidate.position}
                        </p>
                      </div>
                      <Badge
                        className={
                          candidate.status === "Shortlisted"
                            ? "bg-blue-500"
                            : candidate.status === "Interview Scheduled"
                            ? "bg-purple-500"
                            : "bg-gray-500"
                        }
                      >
                        {candidate.status}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{candidate.email}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {candidate.phone}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        CGPA: {candidate.cgpa}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {candidate.match}% match
                      </Badge>
                      {candidate.skills.map((skill, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs bg-transparent"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Resume
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs bg-transparent"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Shortlist
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs bg-transparent"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="shortlisted">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                2 candidates shortlisted
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interviewed">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                No interviewed candidates yet
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selected">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                No selected candidates yet
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
