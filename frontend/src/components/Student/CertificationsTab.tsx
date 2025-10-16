"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type Certification = {
  id?: number;
  _id?: string;
  name: string;
  issuer: string;
  date: string;
  verified: boolean;
  mock?: boolean;
};

// 🧩 Mock data — shown only on frontend if no data in DB
const mockCertifications: Certification[] = [
  {
    id: 1,
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2024-01-15",
    verified: true,
    mock: true,
  },
  {
    id: 2,
    name: "React Developer Certificate",
    issuer: "Meta",
    date: "2023-12-10",
    verified: true,
    mock: true,
  },
];

export function CertificationsTab() {
  const [certs, setCerts] = useState<Certification[]>(mockCertifications);
  const [loading, setLoading] = useState(true);
  const [openCertDialog, setOpenCertDialog] = useState(false);
  const [certForm, setCertForm] = useState({
    name: "",
    issuer: "",
    date: "",
  });

  // ✅ Fetch certifications (mock fallback)
  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await axios.get("/api/student/certifications");
        const data = res.data;
        if (data?.certifications?.length > 0) {
          setCerts(data.certifications);
        } else {
          setCerts(mockCertifications);
        }
      } catch (error) {
        console.error("Fetch certifications error:", error);
        toast.error("Failed to load certifications");
        setCerts(mockCertifications);
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, []);

  // ✅ Add certification
  const handleAddCert = async () => {
    if (!certForm.name || !certForm.issuer) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post("/api/student/certifications", certForm);
      const newCert = res.data?.certification;

      if (newCert) {
        setCerts([...certs, { ...newCert, mock: false }]);
        setCertForm({ name: "", issuer: "", date: "" });
        setOpenCertDialog(false);
        toast.success("Certification added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding certification");
    }
  };

  if (loading)
    return <p className="text-center text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Certifications & Achievements</CardTitle>
            <CardDescription>
              Your certifications and awards (mentor verified)
            </CardDescription>
          </div>
          <Dialog open={openCertDialog} onOpenChange={setOpenCertDialog}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">Add Certification</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Certification</DialogTitle>
                <CardDescription>
                  Mentor will review and verify your certification.
                </CardDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-name">Certification Name *</Label>
                  <Input
                    id="cert-name"
                    placeholder="E.g., AWS Certified Developer"
                    value={certForm.name}
                    onChange={(e) =>
                      setCertForm({ ...certForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-issuer">Issuer *</Label>
                  <Input
                    id="cert-issuer"
                    placeholder="Organization or Platform"
                    value={certForm.issuer}
                    onChange={(e) =>
                      setCertForm({ ...certForm, issuer: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-date">Date</Label>
                  <Input
                    id="cert-date"
                    type="date"
                    value={certForm.date}
                    onChange={(e) =>
                      setCertForm({ ...certForm, date: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setOpenCertDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddCert}>Add Certification</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {certs.map((cert) => (
              <div
                key={cert._id || cert.id}
                className="flex flex-col gap-4 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-start"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                    cert.verified ? "bg-green-100" : "bg-muted"
                  }`}
                >
                  <Award
                    className={`h-6 w-6 ${
                      cert.verified ? "text-green-600" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Issued: {cert.date ? cert.date.split("T")[0] : "N/A"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {cert.verified ? (
                        <Badge className="bg-green-500 w-fit">
                          <CheckCircle className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" /> Pending
                        </Badge>
                      )}
                      {cert.mock && (
                        <Badge variant="outline" className="text-xs">
                          Mock
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
