import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function BookRoom() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({ checkIn: "", checkOut: "", guests: 1 });
  const [error, setError] = useState("");

  useEffect(() => { api.get("/rooms").then(r => setRoom(r.data.find(x => String(x.id) === id))); }, [id]);

  const submit = async e => {
    e.preventDefault(); setError("");
    try {
      await api.post("/bookings", { roomId: Number(id), ...form, guests: Number(form.guests) });
      navigate("/bookings");
    } catch (err) { setError(err.response?.data?.message || "Booking failed"); }
  };

  if (!room) return <main className="container page"><p>Loading room...</p></main>;

  return <main className="container page">
    <div className="booking-layout">
      <img className="booking-image" src={room.imageUrl} alt={room.roomType}/>
      <div className="booking-panel">
        <span className="pill">{room.roomType}</span>
        <h1>{room.roomType} Room</h1>
        <p>{room.description}</p>
        <h2>₹{Number(room.price).toLocaleString("en-IN")} <small>/ night</small></h2>
        <form className="auth-form" onSubmit={submit}>
          <label>Check-in<input type="date" required value={form.checkIn} onChange={e=>setForm({...form,checkIn:e.target.value})}/></label>
          <label>Check-out<input type="date" required value={form.checkOut} onChange={e=>setForm({...form,checkOut:e.target.value})}/></label>
          <label>Guests<input type="number" min="1" max={room.capacity} required value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})}/></label>
          {error && <div className="error">{error}</div>}
          <button className="btn btn-primary full">{user ? "Confirm booking" : "Login to book"}</button>
        </form>
      </div>
    </div>
  </main>;
}
