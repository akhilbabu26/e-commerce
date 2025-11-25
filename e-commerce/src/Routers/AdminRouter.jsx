import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function AdminRouter() {
  const { currentUser } = useContext(AuthContext)

  // check admin
  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/login" replace />
  }

  return <Outlet /> // important!
}
