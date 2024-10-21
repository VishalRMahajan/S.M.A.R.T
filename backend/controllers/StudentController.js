import { Student } from "../models/Student.js";
import { Department } from "../models/Department.js";
import { Semester } from "../models/Semester.js";
import { AcademicYear } from "../models/AcademicYear.js"; // Ensure this import is present

export const createStudent = async (req, res) => {
  const { name, pidNumber, department, currentSemester, academicYear } = req.body;

  try {
    if (!name || !pidNumber || !department || !currentSemester || !academicYear) {
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

    const academicYearDoc = await AcademicYear.findOne({ year: academicYear });
    if (!academicYearDoc) {
      return res
        .status(404)
        .json({ success: false, error: "Academic Year not found" });
    }

    const departmentDoc = await Department.findOne({ code: department, academicYear: academicYearDoc._id });
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
    const { academicYear, department, semester, course } = req.query;

    if (!academicYear) {
      return res.status(400).json({ success: false, error: "Academic year is required" });
    }

    const query = {};

    const academicYearDoc = await AcademicYear.findOne({ year: academicYear });
    if (!academicYearDoc) {
      return res.status(404).json({ success: false, error: "Academic Year not found" });
    }
    query['department'] = { $in: await Department.find({ academicYear: academicYearDoc._id }).distinct('_id') };

    if (department) {
      const departmentDoc = await Department.findOne({ code: department, academicYear: academicYearDoc._id });
      if (!departmentDoc) {
        return res.status(404).json({ success: false, error: "Department not found" });
      }
      query['department'] = departmentDoc._id;
    }

    if (semester) {
      const semesterDoc = await Semester.findOne({ semester, department: query['department'] });
      if (!semesterDoc) {
        return res.status(404).json({ success: false, error: "Semester not found" });
      }
      query['currentSemester'] = semesterDoc._id;
    }

    const students = await Student.find(query)
      .populate({
        path: 'department',
        select: 'name code academicYear',
        populate: {
          path: 'academicYear',
          select: 'year',
        },
      })
      .populate({
        path: 'currentSemester',
        select: 'semester',
        populate: {
          path: 'courses',
          select: 'name code',
        },
      });

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};