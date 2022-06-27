import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navbar } from "../navbar/Navbar";
import authSlice, { selectUID } from "../slices/authSlice";
import {
  createProfilePatient,
  fetchPatient,
  IPatient,
} from "../slices/patientSlice";
import { fetchProfile, IProfile } from "../slices/profileSlice";

export const CreateProfilePatient = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(selectUID);

  const registerProfile = async (value: any) => {
    try {
      const profile: IProfile = {
        id: 1,
        name: String(value.name),
        lastName: String(value.lastName),
        phoneNumber: String(value.phoneNumber),
        userId: String(auth),
      };

      value.Profile = profile;

      await dispatch(createProfilePatient(value));
      await dispatch(fetchProfile());
      await dispatch(fetchPatient());

      alert("Success!");
      navigate("/dashboard");
    } catch {
      alert("Oops! Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit(registerProfile)}>
        <div className="createprofile-all-container">
          <div className="createprofile-container">
            <div className="creaprofile-alone">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                required={true}
              ></input>
            </div>
            <div className="creaprofile-alone">
              <label>LastName:</label>
              <input
                type="text"
                placeholder="LastName"
                {...register("lastName")}
              ></input>
            </div>
            <div className="creaprofile-alone">
              <label>Phone Number:</label>
              <input
                type="text"
                placeholder="Phone"
                {...register("phoneNumber")}
                required={true}
              ></input>
            </div>
          </div>
          <div className="createprofile-container">
            <div className="creaprofile-alone">
              <label>Age</label>
              <input
                type="number"
                placeholder="25"
                {...register("age")}
                required={true}
              ></input>
            </div>
            <div className="creaprofile-alone">
              <label>Gender</label>
              <input
                type="text"
                placeholder="Male/Female"
                {...register("gender")}
                required={true}
              ></input>
            </div>
            <div className="creaprofile-alone">
              <label>Medical History</label>
              <input
                type="number"
                placeholder="1"
                {...register("medicalHistory")}
                required={true}
              ></input>
            </div>
          </div>
          <input
            type={"submit"}
            value="Submit"
            className="profile-submitinput"
          ></input>
        </div>
      </form>
    </div>
  );
};
