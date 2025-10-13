"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Users, Briefcase } from "lucide-react";

interface JobDetailsModalProps {
  job: {
    id: number;
    title: string;
    status: string;
    applicants: number;
    selected: number;
    shortlisted: number;
    interviewed: number;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobDetailsModal({
  job,
  open,
  onOpenChange,
}: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {job.title}
          </DialogTitle>
          <DialogDescription>
            Detailed overview of job applications and progress.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="flex items-center justify-between">
            <Badge
              variant={job.status === "Active" ? "default" : "secondary"}
              className="text-xs"
            >
              {job.status}
            </Badge>
            <p className="text-sm text-muted-foreground">
              ID: {job.id.toString().padStart(3, "0")}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Applicants: </span>
              <strong>{job.applicants}</strong>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>Selected: </span>
              <strong>{job.selected}</strong>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Shortlisted: </span>
              <strong>{job.shortlisted}</strong>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Interviewed: </span>
              <strong>{job.interviewed}</strong>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Description / Notes
            </p>
            <p className="text-sm leading-relaxed">
              This position involves hands-on work with frontend technologies,
              collaborating with cross-functional teams, and delivering
              high-quality UI experiences. Shortlisted candidates will be
              contacted via email for interviews.
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>View Applicants</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
