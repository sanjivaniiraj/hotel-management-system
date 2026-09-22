import { useEffect, useState } from "react";
import { CalendarDays, XCircle } from "lucide-react";
import api from "../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  const load = () => api.get("/bookings/my").then(r => setBookings(r.data));
  useEffect(load, []);

  const cancel = async id => {
    if (!confirm("Cancel this booking?")) return;
    await api.put(`/bookings/${id}/cancel`);
    load();
  };

  return <main className="container page">
    <div className="page-heading"><div><span className="eyebrow">YOUR ACCOUNT</span><h1>My bookings</h1></div></div>
    <div className="booking-list">
      {bookings.length === 0 ? <div className="empty"><CalendarDays size={40}/><h3>No bookings yet</h3><p>Book your first room to see it here.</p></div> :
      bookings.map(b => <div className="booking-row" key={b.id}>
        <img src={b.room.imageUrl} alt=""/>
        <div className="booking-info">
          <span className="pill">{b.status}</span>
          <h3>{b.room.roomType} — Room {b.room.roomNumber}</h3>
          <p>{b.checkIn} → {b.checkOut} · {b.guests} guest(s)</p>
        </div>
        <div className="booking-price"><strong>₹{Number(b.totalAmount).toLocaleString("en-IN")}</strong>
          {b.status === "CONFIRMED" && <button className="btn btn-danger" onClick={()=>cancel(b.id)}><XCircle size={15}/> Cancel</button>}
        </div>
      </div>)}
    </div>
  </main>;
}
