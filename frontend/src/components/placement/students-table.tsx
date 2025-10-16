"use client";
import { UploadMarksModal } from "./upload-marks-modal";
import type { Student } from "@/lib/mock-students";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Props = {
  students: Student[];
};

export function StudentsTable({ students }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableCaption className="sr-only">Filtered students list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Roll No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Sem</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>CGPA</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((stu) => (
            <TableRow key={stu.rollNo}>
              <TableCell className="font-medium">{stu.rollNo}</TableCell>
              <TableCell>{stu.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">{stu.branch}</Badge>
              </TableCell>
              <TableCell>{stu.semester}</TableCell>
              <TableCell>{stu.year}</TableCell>
              <TableCell>{stu.cgpa.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <UploadMarksModal student={stu} />
              </TableCell>
            </TableRow>
          ))}
          {students.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No students found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
