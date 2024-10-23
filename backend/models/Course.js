import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true },
  allocated: [{
    evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
  }]
}, { timestamps: true });

courseSchema.index({ code: 1, semester: 1 }, { unique: true });

export const Course = mongoose.model('Course', courseSchema);