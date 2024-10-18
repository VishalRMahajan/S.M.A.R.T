import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/AdminStore";
import toast from "react-hot-toast";

const EvaluatorData = () => {
  const { evaluators, getEvaluators, error, updateEvaluator } = useAdminStore();
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isVerified: false,
    approve: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getEvaluators();
        toast.success("Evaluators fetched successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch evaluators");
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (evaluator) => {
    setSelectedEvaluator(evaluator);
    setFormData({
      name: evaluator.name,
      email: evaluator.email,
      isVerified: evaluator.isVerified,
      approve: evaluator.approve,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvaluator(selectedEvaluator._id, formData);
      toast.success("Evaluator updated successfully");
      setIsModalOpen(false);
      await getEvaluators();
    } catch (error) {
      toast.error("Failed to update evaluator");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Evaluator Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 justify-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Verified</th>
              <th className="py-2 px-4 border-b">Approved</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {evaluators.map((evaluator) => (
              <tr key={evaluator._id}>
                <td className="py-2 px-4 border-b">{evaluator.name}</td>
                <td className="py-2 px-4 border-b">{evaluator.email}</td>
                <td className="py-2 px-4 border-b">
                  {evaluator.isVerified ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b">
                  {evaluator.approve ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleUpdate(evaluator)}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Evaluator</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4 flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-gray-700">Verified</label>
                  <select
                    name="isVerified"
                    value={formData.isVerified}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700">Approved</label>
                  <select
                    name="approve"
                    value={formData.approve}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluatorData;