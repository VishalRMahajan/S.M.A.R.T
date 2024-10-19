import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pidNumber: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    currentSemester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true },
}, { timestamps: true });

export const Student = mongoose.model('Student', studentSchema);
