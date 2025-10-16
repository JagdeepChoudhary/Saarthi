"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  TrendingUp,
  Users,
  Award,
  MessageSquare,
  Filter,
} from "lucide-react";
import { useState } from "react";

const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    rollNo: "CS2021001",
    cgpa: 8.5,
    applications: 12,
    interviews: 4,
    offers: 1,
    progress: 75,
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNo: "CS2021002",
    cgpa: 9.0,
    applications: 8,
    interviews: 3,
    offers: 2,
    progress: 90,
    status: "Placed",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rollNo: "CS2021003",
    cgpa: 7.8,
    applications: 15,
    interviews: 5,
    offers: 0,
    progress: 60,
    status: "Active",
  },
  {
    id: 4,
    name: "Sarah Williams",
    rollNo: "CS2021004",
    cgpa: 8.8,
    applications: 10,
    interviews: 4,
    offers: 1,
    progress: 80,
    status: "Active",
  },
  {
    id: 5,
    name: "Raj Patel",
    rollNo: "CS2021005",
    cgpa: 8.2,
    applications: 9,
    interviews: 2,
    offers: 0,
    progress: 50,
    status: "Active",
  },
];

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          My Students
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Monitor and guide your mentees
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Active mentees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Placed Students
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              33.3% placement rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Avg Progress
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">71%</div>
            <Progress value={71} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Needs Attention
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Low activity students
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name or roll number..."
            className="pl-10 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="default"
          className="text-sm bg-transparent"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {mockStudents.map((student) => (
          <Card key={student.id}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-base sm:text-lg">
                        {student.name}
                      </h3>
                      <Badge
                        variant={
                          student.status === "Placed" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {student.status}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {student.rollNo} • CGPA: {student.cgpa}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Applications
                      </p>
                      <p className="font-semibold">{student.applications}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Interviews
                      </p>
                      <p className="font-semibold">{student.interviews}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Offers</p>
                      <p className="font-semibold">{student.offers}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Progress</p>
                      <p className="font-semibold">{student.progress}%</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">
                        Overall Progress
                      </span>
                      <span className="font-medium">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs bg-transparent"
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs bg-transparent"
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
