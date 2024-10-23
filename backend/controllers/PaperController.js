import { Paper } from '../models/Paper.js';
import { Student } from '../models/Student.js';
import { Course } from '../models/Course.js';
import { User } from '../models/User.js';
import { upload } from '../Middleware/upload.js';

export const uploadPaper = [
    upload.single('paper'),
    async (req, res) => {
        const { studentId, courseId, evaluatorId, year, department, semester } = req.body;

        try {
            if (!studentId || !courseId || !evaluatorId || !year || !department || !semester) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            const student = await Student.findById(studentId);
            if (!student) {
                return res.status(404).json({ success: false, message: 'Student not found' });
            }

            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ success: false, message: 'Course not found' });
            }

            const evaluator = await User.findById(evaluatorId);
            if (!evaluator || evaluator.role !== 'evaluator') {
                return res.status(404).json({ success: false, message: 'Evaluator not found or invalid role' });
            }

            const allocation = course.allocated.find(a => a.evaluator.equals(evaluatorId));
            if (allocation) {
                if (!allocation.students.some(s => s.equals(studentId))) {
                    allocation.students.push(studentId);
                }
            } else {
                course.allocated.push({ evaluator: evaluatorId, students: [studentId] });
            }

            await course.save();

            const paper = new Paper({
                filePath: req.file.path,
                student: studentId,
                course: courseId,
                evaluator: evaluatorId,
            });

            await paper.save();

            res.status(200).json({ success: true, data: paper });
        } catch (error) {
            console.error('Error uploading paper:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
];

export const getUploadedPaper = async (req, res) => {
    try {
        const papers = await Paper.find()
            .populate('student', 'name pidNumber')
            .populate('course', 'name code')
            .populate('evaluator', 'name email');

        res.status(200).json({ success: true, data: papers });
    } catch (error) {
        console.error('Error fetching uploaded papers:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};