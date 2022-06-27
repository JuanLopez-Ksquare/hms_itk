import React from "react";
import {
  getAdditionalUserInfo,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import image from "../../images/icontest.png";
import { initializeApp, registerVersion } from "firebase/app";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createDoctorFireBase, IUser } from "../slices/userSlice";
import { Navbar } from "../navbar/Navbar";

export const DoctorCreate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerUser = async (values: Partial<IUser>) => {
    try {
      dispatch(createDoctorFireBase(values));
      navigate("/home");
    } catch (error) {
      alert("Oops! Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="createform-container">
        <div className="create-form">
          <label className="createform-main-label">Register a Doctor</label>
          <img src={image} className="create-image" />
          <form onSubmit={handleSubmit(registerUser)}>
            <label className="form-label">Email:</label>
            <br />
            <input
              className="form-input"
              type="email"
              placeholder="example@hotmail.com"
              {...register("email", {
                required: { value: true, message: "Required field" },
              })}
              required={true}
            ></input>
            <br />
            <label className="form-label">Password:</label>
            <br />
            <input
              className="form-input"
              type="password"
              placeholder="********"
              {...register("password")}
              required={true}
            ></input>
            <br />
            <input
              type={"submit"}
              value="Submit"
              className="createform-input"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};
