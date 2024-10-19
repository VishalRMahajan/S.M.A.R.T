import express from "express"
import { createSemester,getSemester } from "../controllers/SemesterController.js"

const SemesterRouter = express.Router();


SemesterRouter.post("/add",createSemester);
SemesterRouter.get("/",getSemester)

export default SemesterRouter