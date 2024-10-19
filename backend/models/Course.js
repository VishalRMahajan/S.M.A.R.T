import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true },
}, {timestamps: true});

courseSchema.index({ code: 1, semester: 1 }, { unique: true });

export const Course = mongoose.model('Course', courseSchema);
