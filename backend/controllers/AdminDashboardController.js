import { User } from "../models/User.js";


const getEvaluator = async (req, res) => {
    try {
        const evaluators = await User.find({ role: 'evaluator' });
        res.status(200).json({ success: true, data: evaluators });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const updateEvaluator = async (req, res) => {
    const { id, name, email, isVerified,approve } = req.body;
    try {
        const evaluator = await User.findByIdAndUpdate(
            id,
            { name, email, isVerified,approve },
            { new: true, runValidators: true }
        );

        if (!evaluator) {
            return res.status(404).json({ success: false, error: "Evaluator not found" });
        }

        res.status(200).json({ success: true, data: evaluator });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export { getEvaluator, updateEvaluator };