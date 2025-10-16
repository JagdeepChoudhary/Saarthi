export type Student = {
  rollNo: string;
  name: string;
  branch: "CSE" | "ECE" | "ME" | "CE" | "EE";
  semester: number;
  year: number;
  cgpa: number;
};

export const BRANCHES: Student["branch"][] = ["CSE", "ECE", "ME", "CE", "EE"];

export const STUDENTS: Student[] = [
  {
    rollNo: "CSE23-001",
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 5,
    year: 3,
    cgpa: 8.2,
  },
  {
    rollNo: "CSE23-002",
    name: "Diya Patel",
    branch: "CSE",
    semester: 5,
    year: 3,
    cgpa: 8.8,
  },
  {
    rollNo: "ECE22-103",
    name: "Rohit Verma",
    branch: "ECE",
    semester: 7,
    year: 4,
    cgpa: 7.6,
  },
  {
    rollNo: "ME21-045",
    name: "Neha Gupta",
    branch: "ME",
    semester: 3,
    year: 2,
    cgpa: 7.9,
  },
  {
    rollNo: "CE21-067",
    name: "Karan Mehta",
    branch: "CE",
    semester: 3,
    year: 2,
    cgpa: 7.1,
  },
  {
    rollNo: "EE24-011",
    name: "Ishita Singh",
    branch: "EE",
    semester: 1,
    year: 1,
    cgpa: 0,
  },
  {
    rollNo: "CSE22-099",
    name: "Vikram Rao",
    branch: "CSE",
    semester: 7,
    year: 4,
    cgpa: 9.1,
  },
  {
    rollNo: "ECE24-015",
    name: "Pooja Nair",
    branch: "ECE",
    semester: 1,
    year: 1,
    cgpa: 0,
  },
  {
    rollNo: "ME22-020",
    name: "Aditya Jain",
    branch: "ME",
    semester: 5,
    year: 3,
    cgpa: 7.3,
  },
  {
    rollNo: "CE23-025",
    name: "Simran Kaur",
    branch: "CE",
    semester: 5,
    year: 3,
    cgpa: 8.0,
  },
  {
    rollNo: "EE22-078",
    name: "Arjun Yadav",
    branch: "EE",
    semester: 7,
    year: 4,
    cgpa: 7.8,
  },
  {
    rollNo: "CSE21-120",
    name: "Priya Das",
    branch: "CSE",
    semester: 3,
    year: 2,
    cgpa: 8.4,
  },
];
