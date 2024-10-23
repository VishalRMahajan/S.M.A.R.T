import express from 'express';
import { connect } from 'mongoose';
import dotenv from "dotenv";
import { connectDB } from './database/connectDB.js';

import authRoutes from './routes/auth.js';
import AdminRouter from './routes/AdminDashboardRoutes.js';
import AcademicYearRouter from './routes/AcademicYearRoutes.js';
import DepartmentRouter from './routes/DepartmentRoutes.js';
import SemesterRouter from './routes/SemesterController.js';
import CourseRouter from './routes/CourseRoute.js';
import StudentRouter from './routes/StudentRoutes.js';
import PaperRouter from './routes/PaperRoutes.js';


import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/admin/",AdminRouter);
app.use("/api/academicYear",AcademicYearRouter);
app.use("/api/department",DepartmentRouter);
app.use("/api/semester",SemesterRouter)
app.use("/api/course",CourseRouter)
app.use("/api/student",StudentRouter)
app.use("/api/paper",PaperRouter)

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on ', { PORT });
});