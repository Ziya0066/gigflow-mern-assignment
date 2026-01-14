import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddGig from "./pages/AddGig"; 
import ManageGig from "./pages/ManageGig"; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-gig" element={<AddGig />} />
          
          
          <Route path="/gig/:id" element={<ManageGig />} /> 
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;