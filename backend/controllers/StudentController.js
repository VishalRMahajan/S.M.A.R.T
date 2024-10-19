import { Student } from "../models/Student.js";
import { Department } from "../models/Department.js";
import { Semester } from "../models/Semester.js";

export const createStudent = async (req, res) => {
  const { name, pidNumber, department, currentSemester } = req.body;

  try {
    if (!name || !pidNumber || !department || !currentSemester) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const existingStudent = await Student.findOne({ pidNumber });
    if (existingStudent) {
      return res
        .status(409)
        .json({
          success: false,
          error: "Student with this PID number already exists",
        });
    }

    const departmentDoc = await Department.findOne({ code: department });
    if (!departmentDoc) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    const semesterDoc = await Semester.findOne({
      semester: currentSemester,
      department: departmentDoc._id,
    });
    if (!semesterDoc) {
      return res
        .status(404)
        .json({ success: false, error: "Semester not found" });
    }

    const newStudent = new Student({
      name,
      pidNumber,
      department: departmentDoc._id,
      currentSemester: semesterDoc._id,
    });
    await newStudent.save();

    res.status(201).json({ success: true, data: newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("department", "name code")
      .populate("currentSemester", "semester");

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
