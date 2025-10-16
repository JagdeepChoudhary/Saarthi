"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code, ExternalLink } from "lucide-react";
import { Label } from "../ui/label";
import { toast } from "sonner";

type Project = {
  _id?: string;
  id?: string;
  title: string;
  techStack: string[];
  description?: string;
  githubLink?: string;
  demoLink?: string;
  isMock?: boolean;
};

const mockProjects: Project[] = [
  {
    id: "mock1",
    title: "E-commerce Platform",
    techStack: ["React", "Node.js", "MongoDB"],
    description: "Full-stack web app with payment integration",
    githubLink: "https://github.com/mock/project1",
    demoLink: "https://demo1.com",
    isMock: true,
  },
  {
    title: "Weather App",
    techStack: ["React Native", "API Integration"],
    description: "Cross-platform mobile weather app",
    githubLink: "https://github.com/mock/project2",
    demoLink: "",
    isMock: true,
  },
];

export function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    title: "",
    techStack: "",
    description: "",
    githubLink: "",
    demoLink: "",
  });

  // Fetch from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/student/projects");
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        setProjects(data.length ? data : mockProjects);
      } catch (err) {
        console.error(err);
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    if (!form.title || !form.techStack) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("/api/student/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          techStack: form.techStack.split(",").map((t) => t.trim()),
          githubLink: form.githubLink,
          demoLink: form.demoLink,
        }),
      });

      if (!res.ok) throw new Error("Failed to save project");

      const newProject = await res.json();
      setProjects((prev) => [...prev.filter((p) => !p.isMock), newProject]);
      setForm({
        title: "",
        techStack: "",
        description: "",
        githubLink: "",
        demoLink: "",
      });
      setOpenDialog(false);
      toast.success("Project added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Projects & Work</CardTitle>
              <CardDescription>
                Showcase your technical and academic projects
              </CardDescription>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">Add Project</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add Project</DialogTitle>
                  <CardDescription>
                    Provide details about your project
                  </CardDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="techStack">Tech Stack *</Label>
                    <Input
                      id="techStack"
                      placeholder="React, Node.js, MongoDB"
                      value={form.techStack}
                      onChange={(e) =>
                        setForm({ ...form, techStack: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="githubLink">GitHub Link</Label>
                    <Input
                      id="githubLink"
                      value={form.githubLink}
                      onChange={(e) =>
                        setForm({ ...form, githubLink: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="demoLink">Demo Link (optional)</Label>
                    <Input
                      id="demoLink"
                      value={form.demoLink}
                      onChange={(e) =>
                        setForm({ ...form, demoLink: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddProject}>Add Project</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {projects.map((p) => (
              <Card
                key={p._id || p.id}
                className="border-l-4 border-l-primary shadow-sm hover:shadow-md"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Code className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {p.title}
                          {p.isMock && (
                            <Badge variant="outline" className="text-xs">
                              Mock Project
                            </Badge>
                          )}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {p.description || "No description provided"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(p.techStack || []).map((tech: string, i: number) => (
                          <Badge key={i} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {(p.githubLink || p.demoLink) && (
                      <div className="flex gap-2">
                        {p.githubLink && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="gap-2"
                          >
                            <a
                              href={p.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" /> GitHub
                            </a>
                          </Button>
                        )}
                        {p.demoLink && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="gap-2"
                          >
                            <a
                              href={p.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" /> Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
