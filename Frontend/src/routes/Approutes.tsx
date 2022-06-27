import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import { Home } from "../components/home/Home";
import { Login } from "../components/login/Login";
import { Dashboard } from "../components/dashboard/Dashboard";
import { Appointment } from "../components/appointment/Appointment";
import { Profile } from "../components/profile/Profile";
import ProtectedRoutes from "../protectedRoutes";
import { DashboardRoutes } from "./Dashboardroutes";
import { CreateProfilePatient } from "../components/profile/CreateProfilePatient";
import { CreateProfileDoctor } from "../components/profile/CreateProfileDoctor";
import { PatientCreate } from "../components/createusers/PatientCreate";

export const Approutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<PatientCreate />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/profile/createDoctor"
            element={<CreateProfileDoctor />}
          />
          <Route
            path="/profile/createPatient"
            element={<CreateProfilePatient />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
