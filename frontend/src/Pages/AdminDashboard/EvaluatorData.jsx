import React, { useEffect,useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const EvaluatorData = () => {

  const [data,setData] = useState([]);

  const getEvaluator = async()=>{
    try{
      const res = await axios.get('http://localhost:5000/api/admin/getEvaluator');
      setData(res.data);
      toast.success("Evaluators Fetched Successfully");
    }
    catch(err){
      console.log(err)
      toast.error("Failed to fetch Evaluators");
    }
  }

  useEffect(()=>{
    getEvaluator();
  },[])

  return (
    <div>EvaluatorData</div>
  )
}

export default EvaluatorData