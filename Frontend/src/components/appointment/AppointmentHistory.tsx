import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import "../patientanddoctors/users.css";
import "../appointment/appointment.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthComponent, Navbar } from "../navbar/Navbar";
import {
  cancelAppointment,
  fetchAdminAppointments,
  fetchDoctorAppointments,
  fetchUserAppointments,
  selectAppointments,
  selectAppointmentsStatus,
} from "../slices/appointmentSlice";
import { selectRole } from "../slices/authSlice";
import { fetchDoctors, selectDoctors } from "../slices/doctorSlice";
import { fetchPatients, selectPatients } from "../slices/patientSlice";

export const AppointmentHistory = () => {
  const dispatch = useAppDispatch();
  const appointmentStatus = useAppSelector(selectAppointmentsStatus);
  const role = useAppSelector(selectRole);
  const appointments = useAppSelector(selectAppointments);

  useEffect(() => {
    if (appointmentStatus === "idle") {
      if (role === "admin") {
        dispatch(fetchAdminAppointments());
        dispatch(fetchDoctors());
        dispatch(fetchPatients());
      } else if (role === "patient") {
        dispatch(fetchUserAppointments());
        dispatch(fetchDoctors());
      } else if (role === "doctor") {
        dispatch(fetchDoctorAppointments());
      }
    }
  }, [appointmentStatus, dispatch]);

  let trueAppointments: any[] = [];
  let allAppointments: any;

  for (let i = 0; i < appointments.length; i++) {
    if (appointments[i].status !== "Pending") {
      trueAppointments.push(appointments[i]);
    }
  }

  if (AuthComponent()?.role === "admin") {
    allAppointments = trueAppointments.map((value) => ({
      id: value.id,
      Motive: value.motive,
      Date: value.date,
      Hour: value.hour,
      Status: value.status,
      Doctor: value.Doctor.Profile.name + " " + value.Doctor.Profile.lastName,
      Patient:
        value.Patient.Profile.name + " " + value.Patient.Profile.lastName,
    }));
  } else if (AuthComponent()?.role === "patient") {
    allAppointments = trueAppointments.map((value) => ({
      id: value.id,
      Motive: value.motive,
      Date: value.date,
      Hour: value.hour,
      Status: value.status,
      Doctor: value.Doctor.Profile.name + " " + value.Doctor.Profile.lastName,
    }));
  } else if (AuthComponent()?.role === "doctor") {
    allAppointments = trueAppointments.map((value) => ({
      id: value.id,
      Motive: value.motive,
      Date: value.date,
      Hour: value.hour,
      Status: value.status,
      Patient:
        value.Patient.Profile.name + " " + value.Patient.Profile.lastName,
    }));
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "Motive",
      headerName: "Motive",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "Hour",
      headerName: "Hour",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
  ];

  if (AuthComponent()?.role === "admin") {
    columns.push(
      {
        field: "Doctor",
        headerName: "Doctor",
        flex: 1,
        editable: false,
        sortable: true,
        minWidth: 100,
      },
      {
        field: "Patient",
        headerName: "Patient",
        flex: 1,
        editable: false,
        sortable: true,
        minWidth: 100,
      }
    );
  } else if (AuthComponent()?.role === "patient") {
    columns.push({
      field: "Doctor",
      headerName: "Doctor",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    });
  } else if (AuthComponent()?.role === "doctor") {
    columns.push({
      field: "Patient",
      headerName: "Patient",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    });
  }

  return (
    <div>
      <Navbar />
      <div className="users-container">
        <label className="appointments-label">Appointments History</label>
        <div className="users-table">
          <DataGrid
            sx={{ bgcolor: "#95D1CC", border: 3 }}
            rows={allAppointments}
            columns={columns}
            style={{ height: "400px" }}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
};
