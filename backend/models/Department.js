import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true},
    semesters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Semester' }],
});

export const Department = mongoose.model('Department', departmentSchema);
