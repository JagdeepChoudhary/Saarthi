"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  TrendingUp,
  CheckCircle,
  FileText,
  Star,
  Share2,
  Copy,
  Download,
  QrCode,
  Award,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
} from "lucide-react";
import ProfileTab from "@/components/Student/ProfileTab";
import AcademicsTab from "@/components/Student/AcademicsTab";
import { ProjectsTab } from "@/components/Student/ProjectsTab";
import { JobsTab } from "@/components/Student/JobsTab";
import { CertificationsTab } from "@/components/Student/CertificationsTab";
import { ApplicationsTab } from "@/components/Student/applicationsTab";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function StudentDashboard() {
  const { data: session } = useSession(); // fetch session
  const username = session?.user?.name || "John Doe"; // fallback if not logged in

  const [copied, setCopied] = useState(false);
  const profileUrl = "https://portal.university.edu/profile/student123";

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateCGPA = () => {
    const semesters = [
      { sem: "Sem 1", sgpa: 8.2, credits: 22, backlogs: 0 },
      { sem: "Sem 2", sgpa: 8.5, credits: 24, backlogs: 0 },
      { sem: "Sem 3", sgpa: 8.7, credits: 26, backlogs: 0 },
      { sem: "Sem 4", sgpa: 8.6, credits: 24, backlogs: 0 },
      { sem: "Sem 5", sgpa: 8.8, credits: 26, backlogs: 0 },
      { sem: "Sem 6", sgpa: 9.0, credits: 24, backlogs: 0 },
    ];
    const totalCredits = semesters.reduce((sum, sem) => sum + sem.credits, 0);
    const weightedSum = semesters.reduce(
      (sum, sem) => sum + sem.sgpa * sem.credits,
      0
    );
    return (weightedSum / totalCredits).toFixed(2);
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Student Profile",
        text: "Check out my student profile!",
        url: profileUrl,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Welcome back, {username}!
            </h1>
            <p className="text-muted-foreground text-balance">
              Track your applications and discover new opportunities
            </p>
          </div>

          {/* Share Profile Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 shadow-sm">
                <Share2 className="h-4 w-4" />
                Share Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share Your Profile</DialogTitle>
                <DialogDescription>
                  Share your verified profile with recruiters and mentors
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-center rounded-lg bg-muted p-8">
                  <QrCode className="h-32 w-32 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  <Input value={profileUrl} readOnly className="flex-1" />
                  <Button
                    size="icon"
                    onClick={handleCopyProfile}
                    variant="outline"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={handleShareProfile}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Link
                  </Button>
                  <Button className="flex-1 bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
                <div className="text-center text-xs text-muted-foreground">
                  Profile Verified ✓ | Last Updated: Jan 15, 2024
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Applications",
              icon: FileText,
              value: 12,
              subtitle: "+2 this week",
              color: "text-blue-600",
              bgColor: "bg-blue-50",
            },
            {
              title: "Interviews",
              icon: Star,
              value: 3,
              subtitle: "2 upcoming",
              color: "text-amber-600",
              bgColor: "bg-amber-50",
            },
            {
              title: "Profile Strength",
              icon: TrendingUp,
              value: "85%",
              subtitle: "Looking good",
              progress: 85,
              color: "text-green-600",
              bgColor: "bg-green-50",
            },
            {
              title: "CGPA",
              icon: GraduationCap,
              value: calculateCGPA(),
              subtitle: "Out of 10",
              color: "text-purple-600",
              bgColor: "bg-purple-50",
            },
          ].map((card, i) => (
            <Card
              key={i}
              className="border-none shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${card.bgColor}`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.value}</div>
                {card.progress ? (
                  <Progress value={card.progress} className="mt-3" />
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {card.subtitle}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex h-auto w-full min-w-max justify-start gap-2 bg-muted/50 p-1">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="academics" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Academics</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2">
                <FolderGit2 className="h-4 w-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="certifications" className="gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Certifications</span>
              </TabsTrigger>
              <TabsTrigger value="jobs" className="gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Jobs</span>
              </TabsTrigger>
              <TabsTrigger value="applications" className="gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Applications</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="academics">
            <AcademicsTab />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsTab />
          </TabsContent>
          <TabsContent value="certifications">
            <CertificationsTab />
          </TabsContent>
          <TabsContent value="jobs">
            <JobsTab />
          </TabsContent>
          <TabsContent value="applications">
            <ApplicationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
