import { Link } from "react-router-dom";
import { Search, ShieldCheck, Sparkles, Clock3 } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15}/> Comfortable stays. Simple booking.</span>
            <h1>Stay somewhere<br/><em>worth remembering.</em></h1>
            <p>Discover beautifully designed rooms, effortless booking and a stay experience managed in one place.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-large" to="/rooms"><Search size={18}/> Explore rooms</Link>
              <Link className="btn btn-light btn-large" to="/signup">Create account</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features container">
        <div><ShieldCheck/><h3>Secure booking</h3><p>Your bookings are linked to your account.</p></div>
        <div><Clock3/><h3>Easy management</h3><p>View and manage your reservations anytime.</p></div>
        <div><Sparkles/><h3>Curated rooms</h3><p>Choose a room that fits your stay and budget.</p></div>
      </section>
    </div>
  );
}
