"use client";

import * as React from "react";
import { STUDENTS } from "@/lib/mock-students";
import { PlacementFilters, type FilterState } from "./placement-filters";
import { StudentsTable } from "./students-table";

export default function PlacementPage() {
  const [filters, setFilters] = React.useState<FilterState>({
    name: "",
    rollNo: "",
    branch: undefined,
    semester: undefined,
    year: undefined,
  });

  const filtered = React.useMemo(() => {
    const name = (filters.name ?? "").trim().toLowerCase();
    const roll = (filters.rollNo ?? "").trim().toLowerCase();
    return STUDENTS.filter((s) => {
      if (name && !s.name.toLowerCase().includes(name)) return false;
      if (roll && !s.rollNo.toLowerCase().includes(roll)) return false;
      if (filters.branch && s.branch !== filters.branch) return false;
      if (filters.semester != null && s.semester !== filters.semester)
        return false;
      if (
        filters.year != null &&
        filters.year !== "all" &&
        s.year !== filters.year
      )
        return false;
      return true;
    });
  }, [filters]);

  function onReset() {
    setFilters({
      name: "",
      rollNo: "",
      branch: undefined,
      semester: undefined,
      year: undefined,
    });
  }

  return (
    <section className="grid gap-6">
      <div className="grid gap-2">
        <h2 className="text-2xl font-semibold text-pretty">Placement Cell</h2>
        <p className="text-sm text-muted-foreground">
          Browse students and filter by semester, year, branch, name, or roll
          number. Upload marks per student.
        </p>
      </div>

      <PlacementFilters
        value={filters}
        onChange={setFilters}
        onReset={onReset}
      />

      <StudentsTable students={filtered} />
    </section>
  );
}
