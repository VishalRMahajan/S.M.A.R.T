import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Course } from '../models/Course.js';
import { Student } from '../models/Student.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const { year, department, semester, courseId, studentId } = req.body;

        try {
            const course = await Course.findById(courseId);
            const student = await Student.findById(studentId);

            if (!course || !student) {
                return cb(new Error('Course or Student not found'), null);
            }

            const courseCode = course.code;
            const pidNumber = student.pidNumber;

            const dir = path.join(__dirname, `../uploads/assigned/${year}/${department}/${semester}/${courseCode}`);
            fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        } catch (error) {
            cb(error, null);
        }
    },
    filename: async (req, file, cb) => {
        const { studentId } = req.body;

        try {
            const student = await Student.findById(studentId);

            if (!student) {
                return cb(new Error('Student not found'), null);
            }

            const pidNumber = student.pidNumber;
            cb(null, `${pidNumber}${path.extname(file.originalname)}`);
        } catch (error) {
            cb(error, null);
        }
    }
});

export const upload = multer({ storage });