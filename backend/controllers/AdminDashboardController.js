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
    const evaluator = await User.findById(evaluatorId).populate('allocatedcourses');
    if (!evaluator) {
      return res
        .status(404)
        .json({ success: false, error: "Evaluator not found" });
    }

    // Remove courses that are no longer allocated
    const currentCourseIds = evaluator.allocatedcourses.map(course => course._id.toString());
    const coursesToRemove = currentCourseIds.filter(courseId => !courseIds.includes(courseId));

    for (const courseId of coursesToRemove) {
      const course = await Course.findById(courseId);
      if (course) {
        // Remove evaluator from course's allocated evaluators
        course.allocated = course.allocated.filter(allocation => !allocation.evaluator.equals(evaluatorId));
        await course.save();
      }
    }

    // Update evaluator's allocated courses
    evaluator.allocatedcourses = courseIds;

    // Add evaluator to new courses
    for (const courseId of courseIds) {
      const course = await Course.findById(courseId).populate({
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
      if (!course) {
        return res
          .status(404)
          .json({ success: false, error: `Course not found: ${courseId}` });
      }

      // Add evaluator to course's allocated evaluators if not already present
      if (!course.allocated.some((a) => a.evaluator.equals(evaluatorId))) {
        course.allocated.push({ evaluator: evaluatorId, students: [] });
      }

      await course.save();
    }

    await evaluator.save();

    console.log("Successfully allocated courses to evaluator:", {
      evaluator,
      courseIds,
    });

    res.status(200).json({ success: true, data: { evaluator, courseIds } });
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
      return res
        .status(404)
        .json({ success: false, error: "Evaluator not found" });
    }

    res.status(200).json({ success: true, data: evaluator });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { getEvaluator, updateEvaluator };
