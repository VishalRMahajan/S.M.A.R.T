import express from "express"
import { getEvaluator,updateEvaluator, allocateCourseToEvaluator, getEvaluatorProfile } from "../controllers/AdminDashboardController.js"
import { verifyToken } from "../Middleware/verifyToken.js"

const AdminRouter = express.Router()

AdminRouter.get("/getEvaluator",getEvaluator)
AdminRouter.put("/updateEvaluator",updateEvaluator)
AdminRouter.get("/profile", verifyToken, getEvaluatorProfile);
AdminRouter.post("/allocatecourse",allocateCourseToEvaluator)

export default AdminRouter