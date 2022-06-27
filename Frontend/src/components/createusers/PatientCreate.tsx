import React from "react";
import image from "../../images/icontest.png";
import "../createusers/createform.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { createPatientFireBase, IUser } from "../slices/userSlice";
import { Navbar } from "../navbar/Navbar";

export const PatientCreate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerUser = async (values: Partial<IUser>) => {
    try {
      dispatch(createPatientFireBase(values));
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
          <label className="createform-main-label">
            Sign in to Patient Online services
          </label>
          <img src={image} className="create-image" />
          <form onSubmit={handleSubmit(registerUser)}>
            <label className="form-label">Email:</label>
            <br />
            <input
              className="form-input"
              type="email"
              placeholder="example@hotmail.com"
              {...register("email")}
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
