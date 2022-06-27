import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navbar } from "../navbar/Navbar";
import { selectUID } from "../slices/authSlice";
import { createProfileDoctor, fetchDoctor } from "../slices/doctorSlice";
import { fetchProfile, IProfile } from "../slices/profileSlice";

export const CreateProfileDoctor = () => {
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

      await dispatch(createProfileDoctor(value));
      await dispatch(fetchProfile());
      await dispatch(fetchDoctor());
      alert("Success!");
      navigate("/dashboard");
    } catch (error) {
      alert("Oops! Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      Create Profile
      <form onSubmit={handleSubmit(registerProfile)}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          required={true}
        ></input>
        <label>LastName:</label>
        <input
          type="text"
          placeholder="LastName"
          {...register("lastName")}
          required={true}
        ></input>
        <label>Phone Number:</label>
        <input
          type="text"
          placeholder="Phone"
          {...register("phoneNumber")}
          required={true}
        ></input>
        <br />
        <br />
        <label>Especialization:</label>
        <input
          type="text"
          placeholder="Male/Female"
          {...register("especialization")}
          required={true}
        ></input>
        <label>ProfesionalLicence:</label>
        <input
          type="text"
          placeholder="1"
          {...register("profesionalLicence")}
          required={true}
        ></input>
        <input type={"submit"} value="Submit"></input>
      </form>
    </div>
  );
};
