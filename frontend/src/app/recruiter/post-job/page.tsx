"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, Plus, DollarSign, MapPin } from "lucide-react";

export default function PostJob() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Post New Job/Internship
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Create a new job or internship opportunity
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Briefcase className="h-5 w-5" />
            Job Details
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Fill in the details for the position
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="job-title" className="text-sm">
                Job Title *
              </Label>
              <Input
                id="job-title"
                placeholder="e.g., Frontend Developer Intern"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-type" className="text-sm">
                Job Type *
              </Label>
              <Select>
                <SelectTrigger id="job-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="fulltime">Full-time</SelectItem>
                  <SelectItem value="parttime">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm">
                Department *
              </Label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm">
                <MapPin className="h-4 w-4 inline mr-1" />
                Location *
              </Label>
              <Input id="location" placeholder="e.g., Remote / Bangalore" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm">
                Duration (months)
              </Label>
              <Input id="duration" type="number" placeholder="e.g., 6" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stipend" className="text-sm">
                <DollarSign className="h-4 w-4 inline mr-1" />
                Stipend/Salary *
              </Label>
              <Input id="stipend" placeholder="e.g., 20000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="openings" className="text-sm">
                Openings *
              </Label>
              <Input id="openings" type="number" placeholder="e.g., 5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm">
              Job Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={6}
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-sm">
              Requirements & Qualifications *
            </Label>
            <Textarea
              id="requirements"
              placeholder="List the required skills, qualifications, and experience..."
              rows={5}
              className="text-sm"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-sm">
                Required Skills (comma separated)
              </Label>
              <Input
                id="skills"
                placeholder="e.g., React, TypeScript, Node.js"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm">
                Application Deadline
              </Label>
              <Input id="deadline" type="date" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Post Job
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
            >
              Save as Draft
            </Button>
            <Button variant="ghost" className="w-full sm:w-auto">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
