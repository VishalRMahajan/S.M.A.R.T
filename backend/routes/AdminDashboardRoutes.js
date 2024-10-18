import express from "express"
import { getEvaluator } from "../controllers/AdminDashboardController.js"
import { verifyToken } from "../Middleware/verifyToken.js"

const AdminRouter = express.Router()

AdminRouter.get("/getEvaluator",getEvaluator)

export default AdminRouter