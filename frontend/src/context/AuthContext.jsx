import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hotel_user")) || null; }
    catch { return null; }
  });

  const login = (data) => {
    localStorage.setItem("hotel_token", data.token);
    const u = { id: data.id, name: data.name, email: data.email, role: data.role };
    localStorage.setItem("hotel_user", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("hotel_token");
    localStorage.removeItem("hotel_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>
    {children}
  </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
