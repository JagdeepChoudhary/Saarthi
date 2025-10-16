/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Student } from "@/lib/mock-students";
import { BRANCHES } from "@/lib/mock-students";

export type FilterState = {
  name?: string;
  rollNo?: string;
  branch?: Student["branch"] | "all";
  semester?: number | "all";
  year?: number | "all";
};

type Props = {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
};

export function PlacementFilters({ value, onChange, onReset }: Props) {
  function set<K extends keyof FilterState>(key: K, val: FilterState[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <form className="grid gap-4 md:grid-cols-5" aria-label="Placement filters">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Search name"
          value={value.name ?? ""}
          onChange={(e) => set("name", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="rollNo">Roll No</Label>
        <Input
          id="rollNo"
          placeholder="e.g., CSE23-001"
          value={value.rollNo ?? ""}
          onChange={(e) => set("rollNo", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="branch">Branch</Label>
        <Select
          value={value.branch ?? "all"}
          onValueChange={(v) => set("branch", v as any)}
        >
          <SelectTrigger id="branch">
            <SelectValue placeholder="All branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {BRANCHES.map((b: string) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="semester">Semester</Label>
        <Select
          value={
            value.semester === "all" || value.semester == null
              ? "all"
              : String(value.semester)
          }
          onValueChange={(v) =>
            set("semester", v === "all" ? "all" : Number(v))
          }
        >
          <SelectTrigger id="semester">
            <SelectValue placeholder="All sems" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <SelectItem key={s} value={String(s)}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-end gap-2">
        <div className="grid gap-2 flex-1">
          <Label htmlFor="year">Year</Label>
          <Select
            value={
              value.year === "all" || value.year == null
                ? "all"
                : String(value.year)
            }
            onValueChange={(v) => set("year", v === "all" ? "all" : Number(v))}
          >
            <SelectTrigger id="year">
              <SelectValue placeholder="All years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {[1, 2, 3, 4].map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          className="self-end bg-transparent"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
