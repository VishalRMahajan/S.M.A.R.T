import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { Department } from "../models/Department.js";
import { AcademicYear } from "../models/AcademicYear.js";

const getEvaluator = async (req, res) => {
  try {
    const evaluators = await User.find({ role: "evaluator" }).populate({
      path: "allocatedcourses",
      populate: {
        path: "semester",
        model: "Semester",
        select: "semester department",
        populate: {
          path: "department",
          model: "Department",
          select: "name code academicYear",
          populate: {
            path: "academicYear",
            model: "AcademicYear",
            select: "year",
          },
        },
      },
    });
    res.status(200).json({ success: true, data: evaluators });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateEvaluator = async (req, res) => {
  const { id, name, email, isVerified, approve } = req.body;
  try {
    const evaluator = await User.findByIdAndUpdate(
      id,
      { name, email, isVerified, approve },
      { new: true, runValidators: true }
    );

    if (!evaluator) {
      return res
        .status(404)
        .json({ success: false, error: "Evaluator not found" });
    }

    res.status(200).json({ success: true, data: evaluator });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const allocateCourseToEvaluator = async (req, res) => {
  const { evaluatorId, courseIds } = req.body;

  try {
    const evaluator = await User.findById(evaluatorId);
    if (!evaluator) {
      return res
        .status(404)
        .json({ success: false, error: "Evaluator not found" });
    }

    const courses = await Course.find({ _id: { $in: courseIds } }).populate({
      path: "semester",
      select: "semester department",
      populate: {
        path: "department",
        select: "name academicYear",
        populate: {
          path: "academicYear",
          select: "year",
        },
      },
    });
    if (courses.length !== courseIds.length) {
      return res
        .status(404)
        .json({ success: false, error: "Some courses not found" });
    }

    courses.forEach((course) => {
      if (!evaluator.allocatedcourses.some((c) => c._id.equals(course._id))) {
        evaluator.allocatedcourses.push(course);
      }
    });

    await evaluator.save();

    res.status(200).json({ success: true, data: evaluator });
  } catch (error) {
    console.error("Error allocating courses to evaluator:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getEvaluatorProfile = async (req, res) => {
    try {
      const evaluator = await User.findById(req.userId).populate({
        path: "allocatedcourses",
        populate: {
          path: "semester",
          model: "Semester",
          select: "semester department",
          populate: {
            path: "department",
            model: "Department",
            select: "name academicYear",
            populate: {
              path: "academicYear",
              model: "AcademicYear",
              select: "year",
            },
          },
        },
      });
  
      if (!evaluator) {
        return res.status(404).json({ success: false, error: "Evaluator not found" });
      }
  
      res.status(200).json({ success: true, data: evaluator });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

export { getEvaluator, updateEvaluator };