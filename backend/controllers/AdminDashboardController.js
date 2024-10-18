import { User } from "../models/User.js";

const getEvaluator = async (req, res) => {
    try {
        const evaluators = await User.find({role:'evaluator'})
        res.status(200).json({success:true,data:evaluators});
    } catch (error) {
        res.status(500).json({success:false,error:error})
    }
}

export {getEvaluator}