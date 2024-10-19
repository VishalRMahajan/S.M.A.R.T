import { Department } from "../models/Department.js";
import { AcademicYear } from "../models/AcademicYear.js";

export const createDepartment = async (req, res) => {
    const { name, code, academicYear } = req.body;
    try {
        const academicYearDoc = await AcademicYear.findOne({ year: academicYear });

        if (!academicYearDoc) {
            return res.status(404).json({ success: false, error: "Academic Year not found" });
        }

        const newDepartment = new Department({ name, code, academicYear: academicYearDoc._id });
        await newDepartment.save();

        academicYearDoc.departments.push(newDepartment._id);
        await academicYearDoc.save();

        res.status(201).json({ success: true, data: newDepartment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get the departments
export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('academicYear');
        res.status(200).json({ success: true, data: departments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};