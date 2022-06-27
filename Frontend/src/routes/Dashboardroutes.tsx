import { Route, Routes } from "react-router-dom";
import { Appointment } from "../components/appointment/Appointment";
import { AppointmentHistory } from "../components/appointment/AppointmentHistory";
import { AppointmentNew } from "../components/appointment/AppointmentNew";
import { AppointmentUpdate } from "../components/appointment/AppointmentUpdate";
import { DoctorCreate } from "../components/createusers/DoctorCreate";
import { Dashboard } from "../components/dashboard/Dashboard";
import { Users } from "../components/patientanddoctors/Users";

export const DashboardRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/users" element={<Users />} />
        <Route path="admin/users/doctor" element={<DoctorCreate />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/appointments/new" element={<AppointmentNew />} />
        <Route path="/appointments/history" element={<AppointmentHistory />} />
        <Route path="/appointments/update" element={<AppointmentUpdate />} />
      </Routes>
    </>
  );
};
