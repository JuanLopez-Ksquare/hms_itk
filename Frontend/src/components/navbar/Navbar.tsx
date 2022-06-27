import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearStateAuth, selectAuth, selectUID } from "../slices/authSlice";
import "../navbar/navbar.css";
import { clearStateAppointments } from "../slices/appointmentSlice";
import { clearStateDoctor } from "../slices/doctorSlice";
import { clearStatePatient } from "../slices/patientSlice";
import { clearStateProfile } from "../slices/profileSlice";
import { clearStateUser } from "../slices/userSlice";

export const AuthComponent = () => {
  const userAuth = useAppSelector(selectAuth);

  return userAuth;
};

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const page = useLocation();

  const logOut = () => {
    dispatch(clearStateAuth());
    dispatch(clearStateAppointments());
    dispatch(clearStateDoctor());
    dispatch(clearStatePatient());
    dispatch(clearStateProfile());
    dispatch(clearStateUser());

    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="navbar-home-button">
        <Link to="/home">
          <button className="navbar-button">Home</button>
        </Link>
      </div>
      {AuthComponent()?.uid === undefined && (
        <div className="navbar-logup">
          <Link to="/login">
            <button className="navbar-button-logup">Login</button>
          </Link>
          <label className="navbar-button-logup-tula">|</label>
          <Link to="/signUp">
            <button className="navbar-button-logup">SignUp</button>
          </Link>
        </div>
      )}
      {AuthComponent()?.uid !== undefined && (
        <div>
          <label className="navbar-button-logup-tula">|</label>
          <>
            {page.pathname !== "/dashboard" && (
              <>
                <Link to="/dashboard">
                  <button className="navbar-button-dashout">Dashboard</button>
                </Link>
                <label className="navbar-button-logup-tula">|</label>
              </>
            )}
          </>

          <Link to="/home">
            <button className="navbar-button-dashout" onClick={logOut}>
              LogOut
            </button>
          </Link>
          <label className="navbar-button-logup-tula">|</label>
        </div>
      )}
    </nav>
  );
};
