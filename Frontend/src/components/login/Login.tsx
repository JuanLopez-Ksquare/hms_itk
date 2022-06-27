import React, { useState } from "react";
import "../login/login.css";
import image from "../../images/icontest.png";
import {
  getAdditionalUserInfo,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { initializeApp, registerVersion } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useForm } from "react-hook-form";
import { loginSuccess, selectRole } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchProfile, selectProfiles } from "../slices/profileSlice";
import { fetchPatient } from "../slices/patientSlice";
import { fetchDoctor } from "../slices/doctorSlice";
import { Navbar } from "../navbar/Navbar";
import { IUser } from "../slices/userSlice";
import { Alert } from "@mui/material";

export const Login = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginFirebase = async (values: Partial<IUser>) => {
    try {
      const login = await signInWithEmailAndPassword(
        firebaseAuth,
        String(values.email),
        String(values.password)
      );

      const token = await login.user.getIdToken();
      const role = login.user.getIdTokenResult();

      let userRole: string = String((await role).claims.role);

      if (userRole === "undefined") {
        userRole = "";
      }

      await dispatch(
        loginSuccess({
          uid: String(login.user.uid),
          accessToken: token,
          email: String(login.user.email),
          role: userRole,
        })
      );

      const profile = await dispatch(fetchProfile());

      if (userRole === "patient" && profile.payload.length !== 0) {
        await dispatch(fetchPatient());
      } else if (userRole === "doctor" && profile.payload.length !== 0) {
        await dispatch(fetchDoctor());
      }

      navigate("/dashboard");
    } catch (error) {
      alert("Oops! Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <label className="login-main-label">Log In</label>
          <img src={image} className="login-image" />
          <form onSubmit={handleSubmit(loginFirebase)}>
            <label className="form-label">Email</label>
            <br />
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="example@example.com"
              {...register("email")}
              required={true}
            ></input>
            <br />
            <br />
            <label className="form-label">Password</label>
            <br />
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
              className="form-input"
              required={true}
            ></input>
            <br />
            <input type="submit" className="form-button" value="Log In"></input>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};
