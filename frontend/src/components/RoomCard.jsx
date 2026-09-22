import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";

export default function RoomCard({ room }) {
  return (
    <article className="room-card">
      <img src={room.imageUrl} alt={room.roomType} />
      <div className="room-content">
        <div className="room-top">
          <span className="pill">{room.roomType}</span>
          <span className="room-number">Room {room.roomNumber}</span>
        </div>
        <h3>{room.roomType} Room</h3>
        <p>{room.description}</p>
        <div className="room-bottom">
          <div><strong>₹{Number(room.price).toLocaleString("en-IN")}</strong><small>/ night</small></div>
          <span className="capacity"><Users size={16}/> {room.capacity}</span>
        </div>
        <Link className="btn btn-primary full" to={`/book/${room.id}`}>
          Book now <ArrowRight size={16}/>
        </Link>
      </div>
    </article>
  );
}
