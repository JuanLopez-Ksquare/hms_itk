import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import userImage from "../../images/icontest.png";
import iconhistory from "../../images/iconhistory.png";
import iconwip from "../../images/iconwip.png";
import iconpending from "../../images/iconpending.png";
import { AuthComponent, Navbar } from "../navbar/Navbar";
import { selectProfiles } from "../slices/profileSlice";
import "./dashboard.css";

export const Dashboard = () => {
  const profile = useAppSelector(selectProfiles);
  return (
    <>
      <Navbar />
      <>
        {AuthComponent()?.role === "patient" && String(profile) === "" && (
          <>
            <div className="dashboard-container-one">
              <label className="dashboard-label">
                It seems you have not created a profile, clic on this button so
                you can start using everything we have to offer!
              </label>
              <div className="dashboard-alone-container">
                <Link to="/profile/createPatient">Create Profile</Link>
              </div>
            </div>
          </>
        )}
      </>
      <>
        {AuthComponent()?.role === "doctor" && String(profile) === "" && (
          <>
            <div className="dashboard-container-one">
              <label className="dashboard-label">
                It seems you have not created a profile, clic on this button so
                you can start using everything we have to offer!
              </label>
              <div className="dashboard-alone-container">
                <Link to="/profile/createDoctor">Create Profile</Link>
              </div>
            </div>
          </>
        )}
      </>
      {AuthComponent()?.role === "admin" && (
        <>
          <div className="dashboard-container">
            <div className="dashboard-left-container">
              <div className="dasboard-inner-cotainer">
                <Link to="admin/users">
                  <img src={userImage} className="dashboard-img" />
                </Link>
                <label>Users</label>
              </div>
              <div className="dasboard-inner-cotainer">
                <Link to="/dashboard">
                  <img src={iconwip} className="dashboard-img" />
                </Link>
                <label>WIP</label>
              </div>
            </div>
            <div className="dashboard-right-container">
              <div className="dasboard-inner-cotainer">
                <Link to="appointments">
                  <img src={iconhistory} className="dashboard-img" />
                </Link>
                <label>Appointments</label>
              </div>
              <div className="dasboard-inner-cotainer">
                <Link to="/dashboard">
                  <img src={iconwip} className="dashboard-img" />
                </Link>
                <label>WIP</label>
              </div>
            </div>
          </div>
        </>
      )}
      {AuthComponent()?.role === "patient" && String(profile) !== "" && (
        <>
          <div className="dashboard-container">
            <div className="dashboard-left-container">
              <div className="dasboard-inner-cotainer">
                <Link to="/profile">
                  <img src={userImage} className="dashboard-img" />
                </Link>
                <label>Profile</label>
              </div>
              <div className="dasboard-inner-cotainer">
                <Link to="/dashboard">
                  <img src={iconwip} className="dashboard-img" />
                </Link>
                <label>WIP</label>
              </div>
            </div>
            <div className="dashboard-right-container">
              <div className="dasboard-inner-cotainer">
                <Link to="appointments">
                  <img src={iconpending} className="dashboard-img" />
                </Link>
                <label>Appointments</label>
              </div>
              <div className="dasboard-inner-cotainer">
                <Link to="appointments/history">
                  <img src={iconhistory} className="dashboard-img" />
                </Link>
                <label>History</label>
              </div>
            </div>
          </div>
        </>
      )}
      {AuthComponent()?.role === "doctor" && String(profile) !== "" && (
        <>
          <div className="dashboard-container">
            <div className="dashboard-left-container">
              <div className="dasboard-inner-cotainer">
                <Link to="/profile">
                  <img src={userImage} className="dashboard-img" />
                </Link>
                <label>Profile</label>
              </div>
              <div className="dasboard-inner-cotainer">
                <Link to="/dashboard">
                  <img src={iconwip} className="dashboard-img" />
                </Link>
                <label>WIP</label>
              </div>
            </div>
            <div className="dashboard-right-container">
              <div className="dasboard-inner-cotainer">
                <Link to="appointments">
                  <img src={iconpending} className="dashboard-img" />
                </Link>
                <label>Appointments</label>
              </div>
              <div className="dasboard-inner-cotainer">
                <Link to="appointments/history">
                  <img src={iconhistory} className="dashboard-img" />
                </Link>
                <label>History</label>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
