import { Course } from "../models/Course.js";
import { Semester } from "../models/Semester.js";
import { Department } from "../models/Department.js";
import { User } from "../models/User.js";

export const createCourse = async (req, res) => {
  const { name, code, semester, department } = req.body;

  try {
    if (!name || !code || !semester || !department) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const departmentDoc = await Department.findOne({ code: department });
    if (!departmentDoc) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    const semesterDoc = await Semester.findOne({ semester, department: departmentDoc._id }).populate("department");
    if (!semesterDoc) {
      return res
        .status(404)
        .json({ success: false, error: "Semester not found" });
    }

    const existingCourse = await Course.findOne({
      code,
      semester: semesterDoc._id,
    });
    if (existingCourse) {
      return res.status(409).json({
        success: false,
        error: "Course code already exists for this semester",
      });
    }

    const newCourse = new Course({
      name,
      code,
      semester: semesterDoc._id,
      department: semesterDoc.department._id,
    });
    await newCourse.save();

    semesterDoc.courses.push(newCourse._id);
    await semesterDoc.save();

    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getCourse = async (req, res) => {
  try {
    const courses = await Course.find().populate({
      path: "semester",
      populate: {
        path: "department",
        populate: {
          path: "academicYear",
        },
      },
    });
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getEvaluatorbycourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const courseDoc = await Course.findById(courseId).populate({
      path: 'allocated.evaluator',
      select: 'name email'
    }).populate({
      path: 'allocated.students',
      select: 'name pidNumber'
    });

    if (!courseDoc) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }

    res.status(200).json({ success: true, data: courseDoc.allocated });
  } catch (error) {
    console.error("Error fetching evaluators by course:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};