import express from 'express';
import { getStudents, createStudent } from '../controllers/StudentController.js';

const StudentRouter = express.Router();

StudentRouter.post("/add",createStudent)
StudentRouter.get("/",getStudents)

export default StudentRouter