import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import { Login, Signup } from "./pages/Auth";
import BookRoom from "./pages/BookRoom";
import Bookings from "./pages/Bookings";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/rooms" element={<Rooms/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/book/:id" element={<ProtectedRoute><BookRoom/></ProtectedRoute>}/>
      <Route path="/bookings" element={<ProtectedRoute><Bookings/></ProtectedRoute>}/>
      <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
    </Routes>
  </AuthProvider>;
}
