import express from 'express';
import { createDepartment,getDepartments } from '../controllers/DepartmentController.js';

const DepartmentRouter = express.Router();


DepartmentRouter.post('/add', createDepartment);
DepartmentRouter.get('/', getDepartments);

export default DepartmentRouter;