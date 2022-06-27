import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import "../patientanddoctors/users.css";
import "../appointment/appointment.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthComponent, Navbar } from "../navbar/Navbar";
import {
  cancelAppointment,
  fetchAdminAppointments,
  fetchDoctorAppointments,
  fetchUserAppointments,
  saveToStateAppointment,
  selectAppointments,
  selectAppointmentsStatus,
  updateAppointment,
} from "../slices/appointmentSlice";
import { selectRole } from "../slices/authSlice";
import { fetchDoctors, selectDoctors } from "../slices/doctorSlice";
import { fetchPatients, selectPatients } from "../slices/patientSlice";

export const Appointment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const appointmentStatus = useAppSelector(selectAppointmentsStatus);
  const role = useAppSelector(selectRole);
  const appointments = useAppSelector(selectAppointments);

  type FullAppointment = {
    id: number;
    motive: String;
    date: Date;
    hour: String;
    status: String;
    doctor: String;
    patient: String;
  };

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

  if (role != "admin") {
    for (let i = 0; i < appointments.length; i++) {
      if (appointments[i].status === "Pending") {
        trueAppointments.push(appointments[i]);
      }
    }
  } else {
    trueAppointments = appointments;
  }

  if (AuthComponent()?.role === "admin") {
    allAppointments = trueAppointments.map((value) => ({
      id: value.id,
      motive: value.motive,
      date: value.date,
      hour: value.hour,
      status: value.status,
      doctor: value.Doctor.Profile.name + " " + value.Doctor.Profile.lastName,
      patient:
        value.Patient.Profile.name + " " + value.Patient.Profile.lastName,
    }));
  } else if (AuthComponent()?.role === "patient") {
    allAppointments = trueAppointments.map((value) => ({
      id: value.id,
      motive: value.motive,
      date: value.date,
      hour: value.hour,
      status: value.status,
      doctor: value.Doctor.Profile.name + " " + value.Doctor.Profile.lastName,
    }));
  } else if (AuthComponent()?.role === "doctor") {
    allAppointments = trueAppointments.map((value) => ({
      id: value.id,
      motive: value.motive,
      date: value.date,
      hour: value.hour,
      status: value.status,
      patient:
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
      field: "motive",
      headerName: "Motive",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "hour",
      headerName: "Hour",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "status",
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
        field: "doctor",
        headerName: "Doctor",
        flex: 1,
        editable: false,
        sortable: true,
        minWidth: 100,
      },
      {
        field: "patient",
        headerName: "Patient",
        flex: 1,
        editable: false,
        sortable: true,
        minWidth: 100,
      }
    );
  } else if (AuthComponent()?.role === "patient") {
    columns.push(
      {
        field: "doctor",
        headerName: "Doctor",
        flex: 1,
        editable: false,
        sortable: true,
        minWidth: 100,
      },
      {
        field: "cancel",
        headerName: "Cancel?",
        flex: 1,
        editable: false,
        sortable: false,
        minWidth: 100,
        renderCell: (cellValues) => {
          return (
            <div>
              {cellValues.row.status === "Pending" && (
                <button
                  onClick={(e: any) => {
                    e = Number(cellValues.row.id);
                    if (cellValues.row.Status !== "canceled") {
                      dispatch(cancelAppointment(e));
                      dispatch(fetchUserAppointments());
                    }
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          );
        },
      }
    );
  } else if (AuthComponent()?.role === "doctor") {
    columns.push(
      {
        field: "patient",
        headerName: "Patient",
        flex: 1,
        editable: false,
        sortable: true,
        minWidth: 100,
      },
      {
        field: "cancel",
        headerName: "",
        flex: 1,
        editable: false,
        sortable: false,
        minWidth: 100,
        renderCell: (cellValues) => {
          return (
            <div>
              {cellValues.row.status === "Pending" && (
                <button
                  onClick={(e: any) => {
                    e = Number(cellValues.row.id);
                    if (cellValues.row.status !== "canceled") {
                      dispatch(cancelAppointment(e));
                      dispatch(fetchDoctorAppointments());
                    }
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          );
        },
      },
      {
        field: "update",
        headerName: "",
        flex: 1,
        editable: false,
        sortable: false,
        minWidth: 100,
        renderCell: (cellValues) => {
          return (
            <div>
              {cellValues.row.status === "Pending" && (
                <button
                  onClick={async (e: any) => {
                    e = cellValues.row;
                    await dispatch(saveToStateAppointment(e));
                    navigate("/dashboard/appointments/update");
                  }}
                >
                  Update
                </button>
              )}
            </div>
          );
        },
      }
    );
  }

  return (
    <div>
      <Navbar />
      <div className="users-container">
        <label className="appointments-label">Appointments</label>
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
        {AuthComponent()?.role === "patient" && (
          <Link to="new">
            <button className="appointments-button">New Appointment</button>
          </Link>
        )}
      </div>
    </div>
  );
};
