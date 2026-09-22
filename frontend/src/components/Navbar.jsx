import { Link, useNavigate } from "react-router-dom";
import { Hotel, LogOut, LayoutDashboard, CalendarDays } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        <Hotel size={25} /> GrandStay
      </Link>

      <div className="navlinks">
        <Link to="/rooms">Rooms</Link>
        {user && <Link to="/bookings"><CalendarDays size={17}/> My Bookings</Link>}
        {user?.role === "ADMIN" && (
          <Link to="/admin"><LayoutDashboard size={17}/> Admin</Link>
        )}

        {user ? (
          <>
            <span className="welcome">Hi, {user.name.split(" ")[0]}</span>
            <button className="btn btn-outline" onClick={() => { logout(); navigate("/"); }}>
              <LogOut size={16}/> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link className="btn btn-primary" to="/signup">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}
