import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import api from "../services/api";
import RoomCard from "../components/RoomCard";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  useEffect(() => {
    api.get("/rooms").then(r => setRooms(r.data)).catch(console.error);
  }, []);

  const types = ["All", ...new Set(rooms.map(r => r.roomType))];
  const filtered = rooms.filter(r =>
    (type === "All" || r.roomType === type) &&
    (`${r.roomType} ${r.description} ${r.roomNumber}`).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container page">
      <div className="page-heading">
        <div><span className="eyebrow">OUR ROOMS</span><h1>Find your perfect stay</h1></div>
        <span>{filtered.length} rooms</span>
      </div>

      <div className="filters">
        <div className="search-box"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rooms..." /></div>
        <div className="select-box"><SlidersHorizontal size={17}/><select value={type} onChange={e => setType(e.target.value)}>{types.map(t => <option key={t}>{t}</option>)}</select></div>
      </div>

      <div className="room-grid">
        {filtered.map(room => <RoomCard key={room.id} room={room}/>)}
      </div>
    </main>
  );
}
