import { useEffect, useState, useContext } from "react";
import axios from "axios";
import GigCard from "../components/GigCard";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await axios.get(`https://gigflow-mern-assignment.onrender.com/api/gigs?search=${search}`);
        setGigs(res.data);
      } catch (err) {
        console.error("Error fetching gigs", err);
      }
    };
    fetchGigs();
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar with Gradient */}
      <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-extrabold tracking-tight hover:opacity-90 transition">
            Gig<span className="text-blue-300">Flow</span>
          </Link>
          <div>
            {user ? (
              <div className="flex items-center gap-6">
                <span className="hidden md:inline text-blue-100 font-medium">
                  Welcome, {user.name} <span className="text-xs bg-blue-900 px-2 py-1 rounded-full uppercase ml-1">{user.role}</span>
                </span>
                {user.role === 'client' && (
                   <Link to="/add-gig" className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-bold shadow-md transition transform hover:scale-105">
                     + Post Job
                   </Link>
                )}
                <button onClick={logout} className="text-blue-200 hover:text-white font-semibold transition">Logout</button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="text-blue-100 hover:text-white transition">Login</Link>
                <Link to="/register" className="bg-white text-blue-700 px-5 py-2 rounded-full font-bold hover:bg-blue-50 transition">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white py-16 shadow-sm border-b">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
            Find the perfect <span className="text-blue-600">freelance</span> services
          </h1>
          <p className="text-slate-500 text-lg mb-8 max-w-2xl mx-auto">
            From web development to design, find the talent you need to grow your business today.
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for 'React', 'Design', 'Writer'..."
              className="w-full p-4 pl-6 rounded-full border-2 border-slate-200 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-2 top-2 bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Gig List Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gigs.length > 0 ? (
            gigs.map((gig) => <GigCard key={gig._id} gig={gig} />)
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-slate-400 font-bold">No gigs found 😢</p>
              <p className="text-slate-500">Try searching for something else!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;