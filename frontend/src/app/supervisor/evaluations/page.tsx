"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Star, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const mockEvaluations = [
  {
    id: 1,
    internName: "Alice Johnson",
    project: "Web Application Development",
    rating: 4.5,
    evaluatedDate: "2024-02-15",
    status: "Completed",
    technical: 4.5,
    communication: 4.0,
    workEthic: 5.0,
  },
  {
    id: 2,
    internName: "Bob Williams",
    project: "ML Model Development",
    rating: 4.0,
    evaluatedDate: "2024-02-18",
    status: "Completed",
    technical: 4.0,
    communication: 4.5,
    workEthic: 3.5,
  },
  {
    id: 3,
    internName: "Carol Davis",
    project: "Mobile App Development",
    rating: null,
    evaluatedDate: null,
    status: "Pending",
    technical: 0,
    communication: 0,
    workEthic: 0,
  },
];

export default function Evaluations() {
  const [technicalSkills, setTechnicalSkills] = useState([4]);
  const [communication, setCommunication] = useState([4]);
  const [workEthic, setWorkEthic] = useState([4]);
  const [problemSolving, setProblemSolving] = useState([4]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-primary text-primary"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout role="supervisor">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Intern Evaluations
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Evaluate intern performance and provide feedback
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Evaluation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Submit Evaluation</DialogTitle>
                <DialogDescription>
                  Evaluate intern performance and provide detailed feedback
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Intern</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an intern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alice">Alice Johnson</SelectItem>
                      <SelectItem value="bob">Bob Williams</SelectItem>
                      <SelectItem value="carol">Carol Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating Sliders */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Technical Skills</Label>
                      <span className="text-sm font-medium">
                        {technicalSkills[0]}/5
                      </span>
                    </div>
                    <Slider
                      value={technicalSkills}
                      onValueChange={setTechnicalSkills}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Communication & Teamwork</Label>
                      <span className="text-sm font-medium">
                        {communication[0]}/5
                      </span>
                    </div>
                    <Slider
                      value={communication}
                      onValueChange={setCommunication}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Work Ethic</Label>
                      <span className="text-sm font-medium">
                        {workEthic[0]}/5
                      </span>
                    </div>
                    <Slider
                      value={workEthic}
                      onValueChange={setWorkEthic}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Problem Solving</Label>
                      <span className="text-sm font-medium">
                        {problemSolving[0]}/5
                      </span>
                    </div>
                    <Slider
                      value={problemSolving}
                      onValueChange={setProblemSolving}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Strengths</Label>
                  <Textarea placeholder="Highlight key strengths..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Areas for Improvement</Label>
                  <Textarea
                    placeholder="Suggest areas for growth..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Overall Feedback</Label>
                  <Textarea
                    placeholder="Provide general feedback..."
                    rows={3}
                  />
                </div>
                <Button className="w-full">Submit Evaluation</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards - 2 per row on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Total
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {mockEvaluations.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Completed
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {mockEvaluations.filter((e) => e.status === "Completed").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Pending
                </CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {mockEvaluations.filter((e) => e.status === "Pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Avg Rating
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {(
                  mockEvaluations
                    .filter((e) => e.rating)
                    .reduce((sum, e) => sum + (e.rating || 0), 0) /
                  mockEvaluations.filter((e) => e.rating).length
                ).toFixed(1)}
                /5
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Evaluation Cards - Mobile View */}
        <div className="lg:hidden space-y-3">
          {mockEvaluations.map((evaluation) => (
            <Card key={evaluation.id}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{evaluation.internName}</p>
                      <p className="text-sm text-muted-foreground">
                        {evaluation.project}
                      </p>
                    </div>
                    <Badge
                      variant={
                        evaluation.status === "Completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {evaluation.status}
                    </Badge>
                  </div>
                  {evaluation.rating && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Rating</p>
                      {renderStars(evaluation.rating)}
                    </div>
                  )}
                  {evaluation.evaluatedDate && (
                    <p className="text-sm text-muted-foreground">
                      Evaluated: {evaluation.evaluatedDate}
                    </p>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table - Desktop View */}
        <Card className="hidden lg:block">
          <CardHeader>
            <CardTitle>Evaluation History</CardTitle>
            <CardDescription>View all submitted evaluations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Intern Name</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Evaluated Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEvaluations.map((evaluation) => (
                  <TableRow key={evaluation.id}>
                    <TableCell className="font-medium">
                      {evaluation.internName}
                    </TableCell>
                    <TableCell>{evaluation.project}</TableCell>
                    <TableCell>
                      {evaluation.rating ? renderStars(evaluation.rating) : "-"}
                    </TableCell>
                    <TableCell>{evaluation.evaluatedDate || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          evaluation.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {evaluation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
