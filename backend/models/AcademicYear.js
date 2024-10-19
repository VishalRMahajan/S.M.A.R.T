import mongoose from 'mongoose';

const academicYearSchema = new mongoose.Schema({
    year: { type: String, required: true, unique: true },
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
});

export const AcademicYear = mongoose.model('AcademicYear', academicYearSchema);
