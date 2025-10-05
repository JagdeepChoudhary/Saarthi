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
import { Video, Clock, CalendarIcon, Plus, Users } from "lucide-react";
import { useState } from "react";

const mockMeetings = [
  {
    id: 1,
    student: "John Doe",
    type: "One-on-One",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "30 min",
    status: "Scheduled",
  },
  {
    id: 2,
    student: "Group Session",
    type: "Group",
    date: "2024-01-16",
    time: "2:00 PM",
    duration: "60 min",
    status: "Scheduled",
    attendees: 5,
  },
  {
    id: 3,
    student: "Jane Smith",
    type: "Resume Review",
    date: "2024-01-17",
    time: "11:00 AM",
    duration: "30 min",
    status: "Scheduled",
  },
  {
    id: 4,
    student: "Mike Johnson",
    type: "One-on-One",
    date: "2024-01-12",
    time: "3:00 PM",
    duration: "30 min",
    status: "Completed",
  },
];

export default function Meetings() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Meetings
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Schedule and manage mentoring sessions
          </p>
        </div>
        <Button className="bg-primary w-full sm:w-auto text-sm">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Today&apos;s Meetings
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              1 individual, 1 group
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              This Week
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Scheduled sessions</p>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium">
              This Month
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Total meetings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="upcoming" className="text-xs sm:text-sm">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs sm:text-sm">
                Completed
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="text-xs sm:text-sm">
                Cancelled
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {mockMeetings
                .filter((m) => m.status === "Scheduled")
                .map((meeting) => (
                  <Card key={meeting.id}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-base sm:text-lg">
                              {meeting.student}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {meeting.type}
                            </Badge>
                            {meeting.attendees && (
                              <Badge variant="secondary" className="text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                {meeting.attendees} students
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {meeting.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {meeting.time} ({meeting.duration})
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs bg-transparent"
                          >
                            Reschedule
                          </Button>
                          <Button size="sm" className="bg-primary text-xs">
                            <Video className="h-3 w-3 mr-1" />
                            Join
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    Completed Meetings
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Past mentoring sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockMeetings
                    .filter((m) => m.status === "Completed")
                    .map((meeting) => (
                      <div
                        key={meeting.id}
                        className="border-b last:border-0 py-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm sm:text-base">
                              {meeting.student}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {meeting.date} at {meeting.time}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto text-xs bg-transparent"
                          >
                            View Notes
                          </Button>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cancelled">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    Cancelled Meetings
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Meetings that were cancelled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    No cancelled meetings
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Calendar</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Select a date
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

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-xs sm:text-sm bg-transparent"
              >
                <Plus className="mr-2 h-4 w-4" />
                One-on-One Session
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-xs sm:text-sm bg-transparent"
              >
                <Users className="mr-2 h-4 w-4" />
                Group Session
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-xs sm:text-sm bg-transparent"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                View Full Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
