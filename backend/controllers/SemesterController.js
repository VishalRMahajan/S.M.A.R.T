import { Semester } from "../models/Semester.js";
import { Department } from "../models/Department.js";
import { AcademicYear } from "../models/AcademicYear.js";

export const createSemester = async (req, res) => {
  const { semester, department, academicYear } = req.body;

  try {
    if (!semester || !department || !academicYear) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Semester, department, and academic year are required",
        });
    }

    const yeardoc = await AcademicYear.findOne({ year: academicYear });

    const departmentDoc = await Department.findOne({
      code: department,
      academicYear: yeardoc._id,
    });
    if (!departmentDoc) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    const existingSemester = await Semester.findOne({
      semester,
      department: departmentDoc._id,
    });
    if (existingSemester) {
      return res
        .status(409)
        .json({
          success: false,
          error: "Semester already exists for this department",
        });
    }

    const newSemester = new Semester({
      semester,
      department: departmentDoc._id,
    });
    await newSemester.save();

    departmentDoc.semesters.push(newSemester._id);
    await departmentDoc.save();

    res.status(201).json({ success: true, data: newSemester });
  } catch (error) {
    console.error("Error creating semester:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getSemester = async (req, res) => {
  try {
    const semesters = await Semester.find()
      .populate({
        path: "department",
        populate: {
          path: "academicYear",
          model: "AcademicYear"
        }
      })
      .populate("courses");

    res.status(200).json({ success: true, data: semesters });
  } catch (error) {
    console.error("Error fetching semesters:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};