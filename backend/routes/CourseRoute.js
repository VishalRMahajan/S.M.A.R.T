import express from "express"
import { createCourse,getCourse } from "../controllers/CourseController.js"

const CourseRouter = express.Router();

CourseRouter.post("/add", createCourse);
CourseRouter.get("/", getCourse);

export default CourseRouter;