import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Hotel } from "lucide-react";

export function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault(); setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate(data.role === "ADMIN" ? "/admin" : "/rooms");
    } catch (err) { setError(err.response?.data?.message || "Login failed"); }
  };

  return <AuthLayout title="Welcome back" subtitle="Sign in to manage your stay.">
    <form onSubmit={submit} className="auth-form">
      <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
      <label>Password<input type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
      {error && <div className="error">{error}</div>}
      <button className="btn btn-primary full">Sign in</button>
      <p className="auth-switch">Don't have an account? <Link to="/signup">Create one</Link></p>
    </form>
  </AuthLayout>;
}

export function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault(); setError("");
    try {
      const { data } = await api.post("/auth/signup", form);
      login(data); navigate("/rooms");
    } catch (err) { setError(err.response?.data?.message || "Signup failed"); }
  };

  return <AuthLayout title="Create your account" subtitle="Start planning your next stay.">
    <form onSubmit={submit} className="auth-form">
      <label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
      <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
      <label>Password<input type="password" minLength="6" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
      {error && <div className="error">{error}</div>}
      <button className="btn btn-primary full">Create account</button>
      <p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p>
    </form>
  </AuthLayout>;
}

function AuthLayout({ title, subtitle, children }) {
  return <main className="auth-page">
    <div className="auth-brand"><Hotel size={24}/> GrandStay</div>
    <div className="auth-card"><h1>{title}</h1><p>{subtitle}</p>{children}</div>
  </main>;
}
