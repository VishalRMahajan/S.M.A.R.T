import { AcademicYear } from '../models/AcademicYear.js';

// Create a new Academic Year
export const createAcademicYear = async (req, res) => {
    const { year } = req.body;
    try {
        const newYear = new AcademicYear({ year });
        await newYear.save();
        res.status(201).json({ success: true, data: newYear });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all Academic Years
export const getAcademicYears = async (req, res) => {
    try {
        const years = await AcademicYear.find().populate('departments');
        res.status(200).json({ success: true, data: years });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

