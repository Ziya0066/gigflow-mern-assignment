import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ManageGig = () => {
  const { id } = useParams();
  const [bids, setBids] = useState([]);
  const [gig, setGig] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gigRes = await axios.get(`http://localhost:5000/api/gigs/${id}`);
        setGig(gigRes.data);
        const bidsRes = await axios.get(`http://localhost:5000/api/bids/${id}`, { withCredentials: true });
        setBids(bidsRes.data);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };
    fetchData();
  }, [id]);

  const handleHire = async (bidId) => {
    if (!window.confirm("Are you sure? This will reject all other candidates.")) return;
    try {
      await axios.patch(`http://localhost:5000/api/bids/${bidId}/hire`, {}, { withCredentials: true });
      alert("Hiring Successful!");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Hiring failed");
    }
  };

  if (!gig) return <div className="flex justify-center items-center h-screen text-blue-600 font-bold text-xl">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="text-slate-500 hover:text-blue-600 font-medium mb-6 inline-block flex items-center gap-2">
            &larr; Back to Dashboard
        </Link>

        {/* Project Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{gig.title}</h1>
                    <p className="text-slate-500 max-w-2xl">{gig.description}</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 mb-1">${gig.budget}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                        ${gig.status === 'open' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                        {gig.status}
                    </span>
                </div>
            </div>
        </div>

        {/* Applicants List */}
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            Applicants <span className="bg-blue-100 text-blue-800 text-sm py-0.5 px-3 rounded-full">{bids.length}</span>
        </h3>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {bids.length === 0 ? (
                <div className="p-10 text-center text-slate-400">
                    <p className="text-lg">No bids received yet.</p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {bids.map((bid) => (
                        <div key={bid._id} className="p-6 hover:bg-slate-50 transition flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="font-bold text-lg text-slate-800">{bid.freelancerId.name}</h4>
                                    <span className="text-slate-400 text-sm">•</span>
                                    <span className="font-bold text-slate-600">${bid.price} Quote</span>
                                </div>
                                <p className="text-slate-500 text-sm italic bg-slate-100 p-3 rounded-lg border border-slate-200 inline-block">"{bid.message}"</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`font-bold px-4 py-2 rounded-lg text-sm
                                    ${bid.status === 'hired' ? 'bg-green-100 text-green-700 border border-green-200' : 
                                    bid.status === 'rejected' ? 'bg-red-50 text-red-400 border border-red-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                                    {bid.status.toUpperCase()}
                                </span>

                                {gig.status === 'open' && bid.status === 'pending' && (
                                    <button 
                                    onClick={() => handleHire(bid._id)}
                                    className="bg-slate-900 hover:bg-black text-white px-6 py-2 rounded-lg font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                                    >
                                    Hire Applicant
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ManageGig;