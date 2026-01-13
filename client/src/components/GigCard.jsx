import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const GigCard = ({ gig }) => {
  const { user } = useContext(AuthContext);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [showBidForm, setShowBidForm] = useState(false);

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://gigflow-mern-assignment.onrender.com/api/bids",
        { gigId: gig._id, price: bidAmount, message },
        { withCredentials: true }
      );
      alert("Bid placed successfully!");
      setShowBidForm(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error placing bid");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
            ${gig.status === 'open' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
            {gig.status}
          </span>
          <span className="text-green-600 font-extrabold text-xl bg-green-50 px-3 py-1 rounded-lg">
            ${gig.budget}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">{gig.title}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">{gig.description}</p>
        
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                {gig.ownerId?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="text-sm text-slate-400 font-medium">Posted by {gig.ownerId?.name}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-100">
        {user && user.role === "freelancer" && gig.status === 'open' && (
          <div>
            <button 
              onClick={() => setShowBidForm(!showBidForm)}
              className={`w-full py-2.5 rounded-lg font-bold transition duration-200 
                ${showBidForm ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
            >
              {showBidForm ? "Cancel Bid" : "Apply Now"}
            </button>

            {showBidForm && (
              <form onSubmit={handleBid} className="mt-4 bg-white p-4 rounded-lg border border-blue-100 shadow-inner animate-fade-in">
                <div className="mb-3">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Price</label>
                    <input 
                        type="number" 
                        placeholder="$" 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cover Letter</label>
                    <textarea 
                        placeholder="I am the best fit because..." 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none h-20 text-sm"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-bold text-sm transition">
                  Submit Proposal
                </button>
              </form>
            )}
          </div>
        )}

        {user && user.role === "client" && user._id === gig.ownerId?._id && (
            <a href={`/gig/${gig._id}`} className="block w-full text-center bg-slate-800 text-white py-2.5 rounded-lg font-bold hover:bg-slate-900 transition shadow-md">
                Manage Applications
            </a>
        )}
      </div>
    </div>
  );
};

export default GigCard;