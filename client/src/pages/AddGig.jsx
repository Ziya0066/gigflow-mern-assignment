import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddGig = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://gigflow-mern-assignment.onrender.com/api/gigs",
        { title, description, budget },
        { withCredentials: true } // REQUIRED: Sends your login cookie to the server
      );
      alert("Job Posted Successfully!");
      navigate("/"); // Go back to Home
    } catch (err) {
      alert(err.response?.data?.message || "Could not post job");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Post a New Job</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Build a React Website"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            placeholder="Describe the work..."
            className="w-full p-2 border rounded h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Budget ($)</label>
          <input
            type="number"
            placeholder="500"
            className="w-full p-2 border rounded"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default AddGig;