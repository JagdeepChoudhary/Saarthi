"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Student } from "@/lib/mock-students";
import { toast } from "sonner";
type Props = {
  student: Student;
};

export function UploadMarksModal({ student }: Props) {
  const [open, setOpen] = React.useState(false);
  const [semester, setSemester] = React.useState<number>(student.semester);
  const [subject, setSubject] = React.useState("");
  const [examType, setExamType] = React.useState<"Theory" | "Practical">(
    "Theory"
  );
  const [internal, setInternal] = React.useState<number | "">("");
  const [external, setExternal] = React.useState<number | "">("");
  const [remarks, setRemarks] = React.useState("");

  const total =
    (typeof internal === "number" ? internal : 0) +
    (typeof external === "number" ? external : 0);

  function resetForm() {
    setSemester(student.semester);
    setSubject("");
    setExamType("Theory");
    setInternal("");
    setExternal("");
    setRemarks("");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // UI-only: just log and show toast
    console.log("[v0] Uploading marks:", {
      rollNo: student.rollNo,
      name: student.name,
      semester,
      subject,
      examType,
      internal,
      external,
      total,
      remarks,
    });
    toast.success("Marks uploaded (UI only)", {
      description: `${student.name} • ${subject} • Total ${total}`,
    });
    setOpen(false);
    resetForm();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Upload Marks
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload Marks</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-muted-foreground">Student</Label>
            <div className="text-sm">
              {student.name} • {student.rollNo}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={String(semester)}
                onValueChange={(v) => setSemester(Number(v))}
              >
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <SelectItem key={s} value={String(s)}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="examType">Exam Type</Label>
              <Select
                value={examType}
                onValueChange={(v: "Theory" | "Practical") => setExamType(v)}
              >
                <SelectTrigger id="examType">
                  <SelectValue placeholder="Exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Theory">Theory</SelectItem>
                  <SelectItem value="Practical">Practical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g., CSE208C - Discrete Mathematics"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="internal">Internal (Sessional)</Label>
              <Input
                id="internal"
                type="number"
                min={0}
                max={50}
                inputMode="numeric"
                value={internal}
                onChange={(e) =>
                  setInternal(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                placeholder="e.g., 25"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="external">External ({examType})</Label>
              <Input
                id="external"
                type="number"
                min={0}
                max={100}
                inputMode="numeric"
                value={external}
                onChange={(e) =>
                  setExternal(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                placeholder={examType === "Theory" ? "e.g., 75" : "e.g., 75"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="total">Total</Label>
              <Input id="total" value={total} readOnly />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              placeholder="Optional notes..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
