import express from "express"
import { createAcademicYear, getAcademicYears} from "../controllers/AcademicYearController.js"

const AcademicYearRouter = express.Router()

AcademicYearRouter.post("/add",createAcademicYear)
AcademicYearRouter.get("/get",getAcademicYears)

export default AcademicYearRouter