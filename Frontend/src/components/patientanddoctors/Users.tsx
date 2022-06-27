import React, { useEffect } from "react";
import "../patientanddoctors/users.css";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchDoctors,
  selectDoctors,
  selectDoctorStatus,
} from "../slices/doctorSlice";
import {
  fetchPatients,
  selectPatients,
  selectPatientStatus,
} from "../slices/patientSlice";
import { IProfile } from "../slices/profileSlice";
import { Navbar } from "../navbar/Navbar";

export const Users = () => {
  const dispatch = useAppDispatch();
  const patientStatus = useAppSelector(selectPatientStatus);
  const doctorStatus = useAppSelector(selectDoctorStatus);

  type ModifiedProfile = {
    id: number;
    name: string;
    lastName: string;
    phoneNumber: string;
    userId: string;
    role: string;
  };

  let profiles: ModifiedProfile[] = [];

  useEffect(() => {
    if (patientStatus === "idle") {
      dispatch(fetchPatients());
    }
  }, [patientStatus, dispatch]);

  useEffect(() => {
    if (doctorStatus === "idle") {
      dispatch(fetchDoctors());
    }
  }, [doctorStatus, dispatch]);

  const patient = useAppSelector(selectPatients);
  const doctor = useAppSelector(selectDoctors);

  patient.forEach((patient) => {
    const tempProfile: ModifiedProfile = {
      id: patient.ProfileId,
      name: patient.Profile.name,
      lastName: patient.Profile.lastName,
      phoneNumber: patient.Profile.phoneNumber,
      userId: patient.Profile.userId,
      role: "patient",
    };
    profiles.push(tempProfile);
  });
  doctor.forEach((doctor) => {
    const tempProfile: ModifiedProfile = {
      id: doctor.ProfileId,
      name: doctor.Profile.name,
      lastName: doctor.Profile.lastName,
      phoneNumber: doctor.Profile.phoneNumber,
      userId: doctor.Profile.userId,
      role: "doctor",
    };
    profiles.push(tempProfile);
  });

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
      field: "Name",
      headerName: "Name",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "LastName",
      headerName: "Last Name",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "PhoneNumber",
      headerName: "Phone Number",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "UserId",
      headerName: "UserId",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "Role",
      headerName: "Role",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
  ];

  profiles.sort(function (a, b) {
    return a.id - b.id;
  });

  const allProfiles = profiles.map((value) => ({
    id: value.id,
    Name: value.name,
    LastName: value.lastName,
    PhoneNumber: value.phoneNumber,
    UserId: value.userId,
    Role: value.role,
  }));

  /*   const list = patient.map((value) => (
    <div key={value.id}>
      Name: {value.Profile.name}
      {value.Profile.lastName}
      <br />
      userid: {value.Profile.userId}
      <br />
      age:{value.age}
      <br />
      Role: Patient
      <br />
      <br />
    </div>
  ));

  const listDoctors = doctor.map((value) => (
    <div key={value.id}>
      Name: {value.Profile.name}
      {value.Profile.lastName}
      <br />
      userId: {value.Profile.userId}
      <br />
      Especialization: {value.especialization}
      <br />
      Profesional Licence: {value.profesionalLicence}
      <br />
      Role: Doctor
      <br />
      <br />
    </div>
  )); */

  return (
    <div>
      <Navbar />
      {/*       {list}
      {listDoctors} */}
      <div className="users-container">
        <label className="users-label">All Users</label>
        <div className="users-table">
          <DataGrid
            sx={{ bgcolor: "#A1E3D8", border: 3 }}
            style={{ height: "400px" }}
            rows={allProfiles}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
        <button className="users-button" type="submit">
          <Link to="doctor">Create new doctor</Link>
        </button>
      </div>
    </div>
  );
};
