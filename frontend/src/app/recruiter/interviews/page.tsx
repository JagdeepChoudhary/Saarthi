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
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Clock, MapPin, CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";

const mockInterviews = [
  {
    id: 1,
    candidate: "Amit Kumar",
    position: "Full Stack Developer",
    date: "2024-01-15",
    time: "10:00 AM",
    mode: "Virtual",
    status: "Scheduled",
  },
  {
    id: 2,
    candidate: "Rahul Sharma",
    position: "Frontend Developer",
    date: "2024-01-16",
    time: "2:00 PM",
    mode: "In-person",
    status: "Scheduled",
  },
  {
    id: 3,
    candidate: "Priya Patel",
    position: "Backend Developer",
    date: "2024-01-17",
    time: "11:00 AM",
    mode: "Virtual",
    status: "Pending Confirmation",
  },
  {
    id: 4,
    candidate: "Sneha Reddy",
    position: "Mobile Developer",
    date: "2024-01-12",
    time: "3:00 PM",
    mode: "Virtual",
    status: "Completed",
  },
];

export default function Interviews() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Interviews
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Schedule and manage interviews
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              Today&#39;s Interviews
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 virtual, 1 in-person
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              This Week
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Scheduled interviews
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs md:text-sm font-medium">
              Completed
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="upcoming" className="text-xs md:text-sm">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs md:text-sm">
                Completed
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs md:text-sm">
                Pending
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-3 md:space-y-4">
              {mockInterviews
                .filter((i) => i.status === "Scheduled")
                .map((interview) => (
                  <Card key={interview.id}>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-base md:text-lg">
                            {interview.candidate}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {interview.position}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {interview.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {interview.time}
                            </span>
                            <span className="flex items-center gap-1">
                              {interview.mode === "Virtual" ? (
                                <Video className="h-3 w-3" />
                              ) : (
                                <MapPin className="h-3 w-3" />
                              )}
                              {interview.mode}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className="bg-green-500 w-fit">
                            Confirmed
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            {interview.mode === "Virtual" && (
                              <Button size="sm">
                                <Video className="h-3 w-3 mr-1" />
                                Join
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">
                    Completed Interviews
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Past interviews and feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockInterviews
                    .filter((i) => i.status === "Completed")
                    .map((interview) => (
                      <div
                        key={interview.id}
                        className="border-b last:border-0 py-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm md:text-base">
                              {interview.candidate}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {interview.position}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            View Feedback
                          </Button>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">
                    Pending Confirmation
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Awaiting candidate response
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockInterviews
                    .filter((i) => i.status === "Pending Confirmation")
                    .map((interview) => (
                      <div
                        key={interview.id}
                        className="border-b last:border-0 py-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm md:text-base">
                              {interview.candidate}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {interview.date} at {interview.time}
                            </p>
                          </div>
                          <Badge variant="outline">Pending</Badge>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Select a date to view interviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
