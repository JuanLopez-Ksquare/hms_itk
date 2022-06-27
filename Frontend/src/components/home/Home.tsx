import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import "../home/home.css";
import hospitalIcon from "../../images/hospitalicon.png";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="home-iconsearchbar">
          <img src={hospitalIcon} className="home-hospitalicon" />
          <input
            type="search"
            placeholder="Search"
            className="home-input"
          ></input>
        </div>
        <div className="home-centerbanner">
          <h1>
            When you need <br />
            answers, you know <br />
            where to go.
          </h1>
        </div>
        <div className="home-cards">
          <h2>About Us</h2>
          <label className="home-h2-tula">|</label>
          <h2>Contact Information</h2>
          <label className="home-h2-tula">|</label>
          <h2>FAQ</h2>
        </div>
      </div>

      {/* <Link to="/login">Login</Link>
      <Link to="/signUp">SignUp</Link>
      <Link to={`/dashboard/admin`}>Dashboard</Link>
      <Link to="/appointments">AppointmentsAdmin</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/admin/dashboard/users">DashboardAdmin</Link>
      <Link to="/profile/createPatient">CreatePatient</Link>
      <Link to="/profile/createDoctor">CreateDoctor</Link>
      <Link to="/patient/appointments">PatientAppointments</Link> */}
    </div>
  );
};
