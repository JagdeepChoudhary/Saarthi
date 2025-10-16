/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  BookOpen,
  CheckCircle,
  Award,
  ChevronDown,
} from "lucide-react";

// Mock Data
const mockSemesters = [
  {
    sem: "Sem 1",
    sgpa: 8.2,
    credits: 22,
    backlogs: 0,
    subjects: [
      {
        subjectName: "CSE208C - DISCRETE MATHEMATICS",
        credits: 3,
        // internal (sessional) out of 25
        internalObtained: 18,
        internalMax: 25,
        // external (theory) out of 75
        externalObtained: 75,
        externalMax: 75,
        externalLabel: "Theory",
        grade: "C",
      },
      {
        subjectName: "CSE282C - WEB & INTERNET TECHNOLOGIES LAB",
        credits: 2,
        // internal (sessional) out of 25
        internalObtained: 23,
        internalMax: 25,
        // external (practical) out of 75
        externalObtained: 65,
        externalMax: 75,
        externalLabel: "Practical",
        grade: "A",
      },
      {
        subjectName: "Programming Fundamentals",
        credits: 4,
        internalObtained: 22,
        internalMax: 25,
        externalObtained: 66,
        externalMax: 75,
        externalLabel: "Theory",
        grade: "A",
      },
    ],
  },
  {
    sem: "Sem 2",
    sgpa: 8.5,
    credits: 24,
    backlogs: 0,
    subjects: [
      {
        subjectName: "Data Structures",
        credits: 4,
        internalObtained: 24,
        internalMax: 25,
        externalObtained: 70,
        externalMax: 75,
        externalLabel: "Theory",
        grade: "A+",
      },
      {
        subjectName: "Digital Logic",
        credits: 3,
        internalObtained: 21,
        internalMax: 25,
        externalObtained: 62,
        externalMax: 75,
        externalLabel: "Theory",
        grade: "A",
      },
    ],
  },
];

export default function AcademicsTab() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const calculateCGPA = () => {
    const totalCredits = mockSemesters.reduce((sum, s) => sum + s.credits, 0);
    const weightedSum = mockSemesters.reduce(
      (sum, s) => sum + s.sgpa * s.credits,
      0
    );
    return (weightedSum / totalCredits).toFixed(2);
  };

  const statusFor = (sgpa: number) =>
    sgpa >= 8.5 ? "Excellent" : sgpa >= 7.5 ? "Good" : "Average";

  const badgeVariantFor = (sgpa: number) =>
    sgpa >= 8.5 ? "default" : sgpa >= 7.5 ? "secondary" : "outline";

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>
                Semester-wise SGPA, subject grades, and CGPA
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2 w-fit">
              <TrendingUp className="mr-2 h-4 w-4" />
              CGPA: {calculateCGPA()}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left">Semester</th>
                  <th className="px-4 py-2 text-left">SGPA</th>
                  <th className="px-4 py-2 text-left">Credits</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left" aria-hidden />
                </tr>
              </thead>
              <tbody>
                {mockSemesters.map((sem, idx) => {
                  const isOpen = openIndex === idx;
                  const detailRowId = `sem-detail-${idx}`;
                  return (
                    <React.Fragment key={idx}>
                      <tr
                        className="border-b cursor-pointer hover:bg-muted/30"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        aria-controls={detailRowId}
                      >
                        <td className="px-4 py-3 font-medium">{sem.sem}</td>
                        <td className="px-4 py-3">{sem.sgpa}</td>
                        <td className="px-4 py-3">{sem.credits}</td>
                        <td className="px-4 py-3">
                          <Badge variant={badgeVariantFor(sem.sgpa)}>
                            {statusFor(sem.sgpa)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </td>
                      </tr>

                      {isOpen && (
                        <tr id={detailRowId} className="bg-muted/20">
                          <td className="px-0 py-0" colSpan={5}>
                            <div className="p-4">
                              <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                  <thead className="bg-muted/40">
                                    <tr>
                                      <th className="px-4 py-2 text-left">
                                        Subject
                                      </th>
                                      <th className="px-4 py-2 text-left">
                                        Credits
                                      </th>
                                      <th className="px-4 py-2 text-left">
                                        Internal (Sessional)
                                      </th>
                                      <th className="px-4 py-2 text-left">
                                        External
                                      </th>
                                      <th className="px-4 py-2 text-left">
                                        Total
                                      </th>
                                      <th className="px-4 py-2 text-left">
                                        Grade
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sem.subjects.map((sub: any, i: number) => {
                                      const totalObtained =
                                        (sub.internalObtained ?? 0) +
                                        (sub.externalObtained ?? 0);
                                      const totalMax =
                                        (sub.internalMax ?? 0) +
                                        (sub.externalMax ?? 0);
                                      return (
                                        <tr key={i} className="border-b">
                                          <td className="px-4 py-2">
                                            {sub.subjectName}
                                          </td>
                                          <td className="px-4 py-2">
                                            {sub.credits}
                                          </td>
                                          <td className="px-4 py-2">
                                            {sub.internalObtained}/
                                            {sub.internalMax}
                                          </td>
                                          <td className="px-4 py-2">
                                            {sub.externalObtained}/
                                            {sub.externalMax}
                                            <span className="ml-2 text-xs text-muted-foreground">
                                              ({sub.externalLabel || "External"}
                                              )
                                            </span>
                                          </td>
                                          <td className="px-4 py-2">
                                            {totalObtained}/{totalMax}
                                          </td>
                                          <td className="px-4 py-2">
                                            {sub.grade}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-3 mt-6">
            <Card className="border-none bg-blue-50">
              <CardContent className="pt-6 text-center">
                <BookOpen className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                <p className="text-3xl font-bold text-blue-900">
                  {mockSemesters.reduce((sum, s) => sum + s.credits, 0)}
                </p>
                <p className="text-sm text-blue-700 mt-1">Total Credits</p>
              </CardContent>
            </Card>

            <Card className="border-none bg-green-50">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <p className="text-3xl font-bold text-green-900">0</p>
                <p className="text-sm text-green-700 mt-1">Active Backlogs</p>
              </CardContent>
            </Card>

            <Card className="border-none bg-amber-50">
              <CardContent className="pt-6 text-center">
                <Award className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                <p className="text-3xl font-bold text-amber-900">85%</p>
                <p className="text-sm text-amber-700 mt-1">Attendance</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
