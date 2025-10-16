"use client";

import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

const profileMock = {
  name: "John Doe",
  rollNo: "2021CS001",
  email: "john@example.com",
  phone: "+91 98765 43210",
  dob: "2003-05-15",
  location: "Mumbai, Maharashtra",
  branch: "Computer Science Engineering",
  year: "3rd Year",
  bio: "Passionate computer science student with strong problem-solving skills and experience in full-stack development.",
  github: "github.com/johndoe",
  linkedin: "linkedin.com/in/johndoe",
  skills: "React, Node.js, TypeScript, MongoDB",
  resume: "resume_john_doe.pdf",
};

export default function ProfileTab() {
  const [profile, setProfile] = useState(profileMock);
  const [loading, setLoading] = useState(true);

  // Fetch profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/student/profile");
        if (res.ok) {
          const data = await res.json();
          // If API returns profile, use it; otherwise keep mock
          if (data) {
            setProfile((prev) => ({ ...prev, ...data }));
            console.log("Fetched profile data:", data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile, using mock data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/student/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        const savedProfile = await res.json();
        setProfile(savedProfile);
        toast("Profile Saved", {
          description: "Your profile has been updated successfully.",
        });
      } else {
        throw new Error("Failed to save profile");
      }
    } catch (err) {
      toast("Error", {
        description: `Failed to save profile. Please try again. ${err}`,
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Keep your profile up-to-date for better recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Basic Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={profile.name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNo">Roll Number *</Label>
                <Input
                  id="rollNo"
                  value={profile.rollNo}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
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
                    value={profile.email}
                    onChange={handleChange}
                    disabled // Email comes from user model, not editable
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
                    value={profile.phone}
                    onChange={handleChange}
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
                    value={profile.dob}
                    onChange={handleChange}
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
                    value={profile.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Academic Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  value={profile.branch}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Current Year</Label>
                <Input id="year" value={profile.year} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Professional Profile */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Professional Profile
            </h3>
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                className="resize-none"
                value={profile.bio}
                onChange={handleChange}
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
                    value={profile.github}
                    onChange={handleChange}
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
                    value={profile.linkedin}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated) *</Label>
              <Input
                id="skills"
                value={profile.skills}
                onChange={handleChange}
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
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      resume: e.target.files?.[0]?.name || prev.resume,
                    }))
                  }
                />
                <Button size="icon" variant="outline">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Current: {profile.resume} (Uploaded on Jan 10, 2024)
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button size="lg" className="w-full sm:w-auto" onClick={handleSave}>
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
