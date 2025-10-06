"use client";

import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { toast } from "sonner";

type Job = {
  id: number;
  title: string;
  company: string;
  location?: string;
  type?: string;
  duration?: string;
  stipend?: string;
  salary?: string;
  deadline?: string;
  match?: number;
};

export function ApplyJobModal({
  open,
  onOpenChange,
  job,
  onSubmitted,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  job: Job | null;
  onSubmitted?: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submit
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Application submitted", {
        description: "Your application has been sent successfully.",
      });
      onOpenChange(false);
      onSubmitted?.();
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Apply for {job?.title}
          </DialogTitle>
          <DialogDescription>
            {job?.company
              ? `Company: ${job.company}`
              : "Complete the form to apply"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {job?.type && <Badge variant="secondary">{job.type}</Badge>}
          {job?.location && <Badge variant="outline">{job.location}</Badge>}
          {(job?.stipend || job?.salary) && (
            <Badge variant="outline">{job?.stipend || job?.salary}</Badge>
          )}
          {job?.deadline && (
            <Badge className="bg-primary/10 text-primary">
              Deadline: {job.deadline}
            </Badge>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio / LinkedIn (optional)</Label>
            <Input id="portfolio" name="portfolio" placeholder="https://..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume</Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Cover Letter</Label>
            <Textarea
              id="cover"
              name="cover"
              rows={4}
              placeholder="Briefly explain why you're a great fit"
            />
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
