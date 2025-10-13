"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Upload,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Star,
  Share2,
  Copy,
  Download,
  QrCode,
  Award,
  Code,
  BookOpen,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
} from "lucide-react";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Tech Corp",
    location: "Remote",
    type: "Internship",
    match: 95,
    salary: "₹15-20k/month",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Data Inc",
    location: "Bangalore",
    type: "Full-time",
    match: 88,
    salary: "₹6-8 LPA",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Mumbai",
    type: "Internship",
    match: 82,
    salary: "₹12-18k/month",
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "StartupXYZ",
    location: "Pune",
    type: "Full-time",
    match: 78,
    salary: "₹7-9 LPA",
  },
];

const mockApplications = [
  {
    id: 1,
    company: "Tech Corp",
    position: "Frontend Developer",
    status: "Under Review",
    date: "2024-01-15",
    appliedOn: "2024-01-10",
  },
  {
    id: 2,
    company: "Data Inc",
    position: "Data Analyst",
    status: "Accepted",
    date: "2024-01-10",
    appliedOn: "2024-01-05",
  },
  {
    id: 3,
    company: "Creative Studio",
    position: "UI/UX Designer",
    status: "Rejected",
    date: "2024-01-08",
    appliedOn: "2024-01-02",
  },
  {
    id: 4,
    company: "StartupXYZ",
    position: "Backend Developer",
    status: "Interview",
    date: "2024-01-12",
    appliedOn: "2024-01-07",
    interviewDate: "2024-01-20",
  },
];

const mockSemesters = [
  { sem: "Sem 1", sgpa: 8.2, credits: 22, backlogs: 0 },
  { sem: "Sem 2", sgpa: 8.5, credits: 24, backlogs: 0 },
  { sem: "Sem 3", sgpa: 8.7, credits: 26, backlogs: 0 },
  { sem: "Sem 4", sgpa: 8.6, credits: 24, backlogs: 0 },
  { sem: "Sem 5", sgpa: 8.8, credits: 26, backlogs: 0 },
  { sem: "Sem 6", sgpa: 9.0, credits: 24, backlogs: 0 },
];

const mockProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    tech: "React, Node.js, MongoDB",
    description: "Full-stack web application with payment integration",
    link: "github.com/project1",
  },
  {
    id: 2,
    title: "Weather App",
    tech: "React Native, API Integration",
    description: "Cross-platform mobile weather application",
    link: "github.com/project2",
  },
  {
    id: 3,
    title: "Task Manager",
    tech: "Next.js, TypeScript, Prisma",
    description: "Real-time collaborative task management tool",
    link: "github.com/project3",
  },
];

const mockCertifications = [
  {
    id: 1,
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2024-01-15",
    verified: true,
  },
  {
    id: 2,
    name: "React Developer Certificate",
    issuer: "Meta",
    date: "2023-12-10",
    verified: true,
  },
  {
    id: 3,
    name: "Data Science Specialization",
    issuer: "Coursera",
    date: "2023-11-20",
    verified: false,
  },
];

const statusConfig = {
  "Under Review": {
    icon: Clock,
    color: "bg-amber-500",
    textColor: "text-amber-700",
    bgLight: "bg-amber-50",
  },
  Accepted: {
    icon: CheckCircle,
    color: "bg-green-500",
    textColor: "text-green-700",
    bgLight: "bg-green-50",
  },
  Rejected: {
    icon: XCircle,
    color: "bg-red-500",
    textColor: "text-red-700",
    bgLight: "bg-red-50",
  },
  Interview: {
    icon: Star,
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgLight: "bg-blue-50",
  },
};

export default function StudentDashboard() {
  const [copied, setCopied] = useState(false);
  const profileUrl = "https://portal.university.edu/profile/student123";
  // const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [projects, setProjects] = useState(mockProjects);
  const [certs, setCerts] = useState(mockCertifications);

  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [openCertDialog, setOpenCertDialog] = useState(false);

  const [projectForm, setProjectForm] = useState({
    title: "",
    tech: "",
    description: "",
    link: "",
  });

  const [certForm, setCertForm] = useState({
    name: "",
    issuer: "",
    date: "",
    verified: false,
  });

  const calculateCGPA = () => {
    const totalSGPA = mockSemesters.reduce((sum, sem) => sum + sem.sgpa, 0);
    return (totalSGPA / mockSemesters.length).toFixed(2);
  };

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const handleAddProject = () => {
    if (!projectForm.title.trim() || !projectForm.tech.trim()) return;
    setProjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: projectForm.title.trim(),
        tech: projectForm.tech.trim(),
        description: projectForm.description.trim(),
        link: projectForm.link.trim(),
      },
    ]);
    setProjectForm({ title: "", tech: "", description: "", link: "" });
    setOpenProjectDialog(false);
  };

  const handleAddCert = () => {
    if (!certForm.name.trim() || !certForm.issuer.trim()) return;
    setCerts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: certForm.name.trim(),
        issuer: certForm.issuer.trim(),
        date: certForm.date || new Date().toISOString().slice(0, 10),
        verified: !!certForm.verified,
      },
    ]);
    setCertForm({ name: "", issuer: "", date: "", verified: false });
    setOpenCertDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Welcome back, John Doe!
            </h1>
            <p className="text-muted-foreground text-balance">
              Track your applications and discover new opportunities
            </p>
          </div>
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

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Keep your profile up-to-date for better recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Basic Details
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        defaultValue="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNo">Roll Number *</Label>
                      <Input
                        id="rollNo"
                        placeholder="Enter roll number"
                        defaultValue="2021CS001"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Contact Information
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          placeholder="your.email@example.com"
                          defaultValue="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          className="pl-10"
                          placeholder="+91 98765 43210"
                          defaultValue="+91 98765 43210"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dob"
                          type="date"
                          className="pl-10"
                          defaultValue="2003-05-15"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          className="pl-10"
                          placeholder="City, State"
                          defaultValue="Mumbai, Maharashtra"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Academic Details
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Input
                        id="branch"
                        placeholder="Computer Science"
                        defaultValue="Computer Science Engineering"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Current Year</Label>
                      <Input
                        id="year"
                        placeholder="3rd Year"
                        defaultValue="3rd Year"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Professional Profile
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Write a brief bio about yourself..."
                      rows={4}
                      defaultValue="Passionate computer science student with strong problem-solving skills and experience in full-stack development."
                      className="resize-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub Profile</Label>
                      <div className="relative">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="github"
                          className="pl-10"
                          placeholder="github.com/username"
                          defaultValue="github.com/johndoe"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="linkedin"
                          className="pl-10"
                          placeholder="linkedin.com/in/username"
                          defaultValue="linkedin.com/in/johndoe"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma-separated) *</Label>
                    <Input
                      id="skills"
                      placeholder="React, Node.js, Python"
                      defaultValue="React, JavaScript, TypeScript, Node.js, MongoDB, Python, Git"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume *</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="resume"
                        type="file"
                        className="flex-1"
                        accept=".pdf,.doc,.docx"
                      />
                      <Button size="icon" variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Current: resume_john_doe.pdf (Uploaded on Jan 10, 2024)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button size="lg" className="w-full sm:w-auto">
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academics Tab */}
          <TabsContent value="academics" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Academic Performance</CardTitle>
                    <CardDescription>
                      Semester-wise SGPA & Overall CGPA
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-lg px-4 py-2 w-fit"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    CGPA: {calculateCGPA()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mobile hint to indicate horizontal scroll */}
                <p className="sm:hidden text-xs text-muted-foreground">
                  Tip: swipe left/right to see all columns
                </p>

                {/* Full-bleed scroll container on mobile so only the table scrolls */}
                <div className="relative -mx-4 sm:mx-0">
                  <div
                    className="overflow-x-auto rounded-lg border bg-background"
                    role="region"
                    aria-label="Academic performance table"
                    tabIndex={0}
                  >
                    <table className="min-w-[640px] w-full text-sm">
                      <thead className="sticky top-0 z-10 bg-muted/50">
                        <tr className="border-b">
                          <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">
                            Semester
                          </th>
                          <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">
                            SGPA
                          </th>
                          <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">
                            Credits
                          </th>
                          <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">
                            Backlogs
                          </th>
                          <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockSemesters.map((s, idx) => (
                          <tr
                            key={s.sem}
                            className={`border-b last:border-0 transition-colors hover:bg-muted/30 ${
                              idx % 2 === 0 ? "bg-background" : "bg-muted/10"
                            }`}
                          >
                            <td className="whitespace-nowrap px-4 py-3 font-medium">
                              {s.sem}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 font-semibold">
                              {s.sgpa}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">
                              {s.credits}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">
                              {s.backlogs === 0 ? (
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200"
                                >
                                  0
                                </Badge>
                              ) : (
                                <Badge variant="destructive">
                                  {s.backlogs}
                                </Badge>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">
                              <Badge
                                variant={
                                  s.sgpa >= 8.5
                                    ? "default"
                                    : s.sgpa >= 7.5
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {s.sgpa >= 8.5
                                  ? "Excellent"
                                  : s.sgpa >= 7.5
                                  ? "Good"
                                  : "Average"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Card className="border-none bg-blue-50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <BookOpen className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                        <p className="text-3xl font-bold text-blue-900">
                          {mockSemesters.reduce((sum, s) => sum + s.credits, 0)}
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          Total Credits
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-green-50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
                        <p className="text-3xl font-bold text-green-900">0</p>
                        <p className="text-sm text-green-700 mt-1">
                          Active Backlogs
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-amber-50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Award className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                        <p className="text-3xl font-bold text-amber-900">85%</p>
                        <p className="text-sm text-amber-700 mt-1">
                          Attendance
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Projects & Work</CardTitle>
                    <CardDescription>
                      Showcase your technical projects
                    </CardDescription>
                  </div>
                  <Dialog
                    open={openProjectDialog}
                    onOpenChange={setOpenProjectDialog}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto">Add Project</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Add Project</DialogTitle>
                        <CardDescription>
                          Provide details about your project
                        </CardDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="proj-title">Title *</Label>
                          <Input
                            id="proj-title"
                            placeholder="E.g., E-commerce Platform"
                            value={projectForm.title}
                            onChange={(e) =>
                              setProjectForm((p) => ({
                                ...p,
                                title: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="proj-tech">Tech Stack *</Label>
                          <Input
                            id="proj-tech"
                            placeholder="E.g., Next.js, TypeScript, Prisma"
                            value={projectForm.tech}
                            onChange={(e) =>
                              setProjectForm((p) => ({
                                ...p,
                                tech: e.target.value,
                              }))
                            }
                          />
                          <p className="text-xs text-muted-foreground">
                            Comma-separated values recommended
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="proj-desc">Description</Label>
                          <Textarea
                            id="proj-desc"
                            placeholder="What did you build? What problems does it solve?"
                            rows={4}
                            className="resize-none"
                            value={projectForm.description}
                            onChange={(e) =>
                              setProjectForm((p) => ({
                                ...p,
                                description: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="proj-link">Link</Label>
                          <Input
                            id="proj-link"
                            placeholder="github.com/your-repo or live demo link"
                            value={projectForm.link}
                            onChange={(e) =>
                              setProjectForm((p) => ({
                                ...p,
                                link: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button
                            variant="outline"
                            onClick={() => setOpenProjectDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleAddProject}>
                            Add Project
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <Card
                      key={project.id}
                      className="border-l-4 border-l-primary shadow-sm transition-shadow hover:shadow-md"
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-primary/10 p-2">
                                <Code className="h-4 w-4 text-primary" />
                              </div>
                              <h3 className="font-semibold text-lg">
                                {project.title}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.split(", ").map((tech, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 w-full sm:w-auto bg-transparent"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Certifications & Achievements</CardTitle>
                    <CardDescription>
                      Your verified certifications and awards
                    </CardDescription>
                  </div>
                  <Dialog
                    open={openCertDialog}
                    onOpenChange={setOpenCertDialog}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto">
                        Add Certification
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Add Certification</DialogTitle>
                        <CardDescription>
                          Enter the details of your certification
                        </CardDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cert-name">
                            Certification Name *
                          </Label>
                          <Input
                            id="cert-name"
                            placeholder="E.g., AWS Certified Developer"
                            value={certForm.name}
                            onChange={(e) =>
                              setCertForm((c) => ({
                                ...c,
                                name: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cert-issuer">Issuer *</Label>
                          <Input
                            id="cert-issuer"
                            placeholder="Organization or Platform"
                            value={certForm.issuer}
                            onChange={(e) =>
                              setCertForm((c) => ({
                                ...c,
                                issuer: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cert-date">Date</Label>
                          <Input
                            id="cert-date"
                            type="date"
                            value={certForm.date}
                            onChange={(e) =>
                              setCertForm((c) => ({
                                ...c,
                                date: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <Label htmlFor="cert-verified" className="text-sm">
                            Verified
                          </Label>
                          <Switch
                            id="cert-verified"
                            checked={certForm.verified}
                            onCheckedChange={(v) =>
                              setCertForm((c) => ({ ...c, verified: v }))
                            }
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button
                            variant="outline"
                            onClick={() => setOpenCertDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleAddCert}>
                            Add Certification
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certs.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-start"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                          cert.verified ? "bg-green-100" : "bg-muted"
                        }`}
                      >
                        <Award
                          className={`h-6 w-6 ${
                            cert.verified
                              ? "text-green-600"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h4 className="font-semibold">{cert.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {cert.issuer}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Issued: {cert.date}
                            </p>
                          </div>
                          {cert.verified && (
                            <Badge className="bg-green-500 w-fit">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {mockJobs.map((job) => (
                <Card
                  key={job.id}
                  className="border-none shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={job.match >= 90 ? "default" : "secondary"}
                        className="shrink-0"
                      >
                        {job.match}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {job.location}
                        </span>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between border-t pt-4">
                        <span className="font-semibold">{job.salary}</span>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Application Tracker</CardTitle>
                <CardDescription>
                  Monitor the status of your applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.map((app) => {
                    const config =
                      statusConfig[app.status as keyof typeof statusConfig];
                    const StatusIcon = config.icon;
                    return (
                      <div
                        key={app.id}
                        className="flex flex-col gap-4 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${config.bgLight}`}
                          >
                            <StatusIcon
                              className={`h-6 w-6 ${config.textColor}`}
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-semibold">{app.position}</p>
                            <p className="text-sm text-muted-foreground">
                              {app.company}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Applied: {app.appliedOn}
                            </p>
                            {app.interviewDate && (
                              <p className="text-xs font-medium text-blue-600">
                                Interview: {app.interviewDate}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 sm:items-end">
                          <Badge className={config.color}>{app.status}</Badge>
                          <p className="text-xs text-muted-foreground">
                            Updated: {app.date}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
