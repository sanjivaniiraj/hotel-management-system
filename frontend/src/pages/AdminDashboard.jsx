import { useEffect, useState } from "react";
import { BarChart3, BedDouble, CalendarCheck, IndianRupee, Users, Plus, Trash2, RefreshCw } from "lucide-react";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ roomNumber:"", roomType:"Deluxe", price:"", capacity:2, description:"", imageUrl:"" });
  const [error, setError] = useState("");

  const load = async () => {
    const [s, r, b, u] = await Promise.all([
      api.get("/admin/stats"), api.get("/rooms"), api.get("/admin/bookings"), api.get("/admin/users")
    ]);
    setStats(s.data); setRooms(r.data); setBookings(b.data); setUsers(u.data);
  };

  useEffect(() => { load().catch(console.error); }, []);

  const addRoom = async e => {
    e.preventDefault(); setError("");
    try {
      await api.post("/rooms", {...form, price:Number(form.price), capacity:Number(form.capacity)});
      setShowAdd(false); setForm({roomNumber:"",roomType:"Deluxe",price:"",capacity:2,description:"",imageUrl:""});
      load();
    } catch (err) { setError(err.response?.data?.message || "Could not add room"); }
  };

  const deleteRoom = async id => {
    if (!confirm("Delete this room?")) return;
    await api.delete(`/rooms/${id}`); load();
  };

  const cards = [
    ["Total users", stats.users, Users],
    ["Total rooms", stats.rooms, BedDouble],
    ["Bookings", stats.bookings, CalendarCheck],
    ["Revenue", `₹${Number(stats.revenue||0).toLocaleString("en-IN")}`, IndianRupee]
  ];

  return <main className="admin-page">
    <div className="admin-head container">
      <div><span className="eyebrow">MANAGEMENT CONSOLE</span><h1>Admin Dashboard</h1><p>Monitor your hotel from one place.</p></div>
      <button className="btn btn-primary" onClick={()=>setShowAdd(!showAdd)}><Plus size={17}/> Add room</button>
    </div>

    <section className="stats-grid container">
      {cards.map(([label,value,Icon])=><div className="stat-card" key={label}><div className="stat-icon"><Icon/></div><span>{label}</span><strong>{value}</strong></div>)}
    </section>

    {showAdd && <section className="admin-section container">
      <div className="section-title"><h2>Add new room</h2></div>
      <form className="room-form" onSubmit={addRoom}>
        <input placeholder="Room number" required value={form.roomNumber} onChange={e=>setForm({...form,roomNumber:e.target.value})}/>
        <select value={form.roomType} onChange={e=>setForm({...form,roomType:e.target.value})}><option>Deluxe</option><option>Premium</option><option>Suite</option><option>Standard</option></select>
        <input type="number" placeholder="Price/night" required value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
        <input type="number" min="1" placeholder="Capacity" required value={form.capacity} onChange={e=>setForm({...form,capacity:e.target.value})}/>
        <input placeholder="Image URL" value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})}/>
        <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <button className="btn btn-primary">Save room</button>
        {error && <span className="error">{error}</span>}
      </form>
    </section>}

    <section className="admin-section container">
      <div className="section-title"><h2>Rooms</h2><button className="icon-btn" onClick={load}><RefreshCw size={17}/></button></div>
      <div className="table-wrap"><table><thead><tr><th>Room</th><th>Type</th><th>Price</th><th>Capacity</th><th>Status</th><th></th></tr></thead>
      <tbody>{rooms.map(r=><tr key={r.id}><td>#{r.roomNumber}</td><td>{r.roomType}</td><td>₹{Number(r.price).toLocaleString("en-IN")}</td><td>{r.capacity}</td><td><span className="status">{r.status}</span></td><td><button className="delete-btn" onClick={()=>deleteRoom(r.id)}><Trash2 size={16}/></button></td></tr>)}</tbody></table></div>
    </section>

    <section className="admin-section container">
      <div className="section-title"><h2>Recent bookings</h2><BarChart3 size={20}/></div>
      <div className="table-wrap"><table><thead><tr><th>Guest</th><th>Room</th><th>Dates</th><th>Amount</th><th>Status</th></tr></thead>
      <tbody>{bookings.slice(0,10).map(b=><tr key={b.id}><td>{b.user.name}<small>{b.user.email}</small></td><td>{b.room.roomNumber} · {b.room.roomType}</td><td>{b.checkIn} → {b.checkOut}</td><td>₹{Number(b.totalAmount).toLocaleString("en-IN")}</td><td><span className="status">{b.status}</span></td></tr>)}</tbody></table></div>
    </section>

    <section className="admin-section container">
      <div className="section-title"><h2>Users</h2></div>
      <div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
      <tbody>{users.map(u=><tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td><span className="pill">{u.role}</span></td></tr>)}</tbody></table></div>
    </section>
  </main>;
}
