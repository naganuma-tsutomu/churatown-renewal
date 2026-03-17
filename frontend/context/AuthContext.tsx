"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  role: "admin" | "owner";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("chura_token");
    const savedRole = localStorage.getItem("chura_role");
    if (savedToken && savedRole) {
      setToken(savedToken);
      fetchUserProfile(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const res = await fetch(`${apiBaseUrl}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newToken: string, role: string) => {
    setToken(newToken);
    localStorage.setItem("chura_token", newToken);
    localStorage.setItem("chura_role", role);
    fetchUserProfile(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("chura_token");
    localStorage.removeItem("chura_role");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
