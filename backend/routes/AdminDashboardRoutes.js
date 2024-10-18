import express from "express"
import { getEvaluator,updateEvaluator } from "../controllers/AdminDashboardController.js"
import { verifyToken } from "../Middleware/verifyToken.js"

const AdminRouter = express.Router()

AdminRouter.get("/getEvaluator",getEvaluator)
AdminRouter.put("/updateEvaluator",updateEvaluator)

export default AdminRouter