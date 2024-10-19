import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
    semester: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
}, {timestamps: true});

semesterSchema.index({ department: 1, semester: 1 }, { unique: true });


export const Semester = mongoose.model('Semester', semesterSchema);
