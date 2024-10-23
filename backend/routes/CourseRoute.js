import express from "express"
import { createCourse,getCourse, getEvaluatorbycourse } from "../controllers/CourseController.js"

const CourseRouter = express.Router();

CourseRouter.post("/add", createCourse);
CourseRouter.get("/", getCourse);
CourseRouter.get("/evaluator/:courseId", getEvaluatorbycourse);

export default CourseRouter;