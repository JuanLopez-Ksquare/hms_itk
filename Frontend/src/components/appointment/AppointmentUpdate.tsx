import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navbar } from "../navbar/Navbar";
import {
  fetchDoctorAppointments,
  IAppointments,
  selectAppointmentDetails,
  updateAppointment,
} from "../slices/appointmentSlice";

export const AppointmentUpdate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const appointment = useAppSelector(selectAppointmentDetails);

  const updateAppointmentComponent = async (values: any) => {
    try {
      await dispatch(
        updateAppointment({
          id: Number(appointment?.id),
          date: values.date,
          hour: values.time,
        })
      );
      await dispatch(fetchDoctorAppointments());

      alert("Succes!");
      navigate("/dashboard/appointments");
    } catch (error) {
      alert("Oops! Something went wrong");
    }
  };

  /*   await dispatch(
    createNewAppointment({
      date: values.date,
      hour: String(values.time),
      motive: values.motive,
      DoctorId: Number(values.doctor),
      PatientId: Number(patient?.id),
    })
  ); */

  //id:number,date:Date,hour:string

  return (
    <div>
      <Navbar />
      <div className="createform-container">
        <div className="create-form">
          <label className="createform-main-label">Update an Appointment</label>
          <form onSubmit={handleSubmit(updateAppointmentComponent)}>
            <label className="form-label">
              {"Current date: " + String(appointment?.date)}
            </label>
            <br />
            <input
              className="form-input"
              type="date"
              placeholder="example@hotmail.com"
              {...register("date")}
              required={true}
            ></input>
            <br />
            <label className="form-label">
              {"Current hour: " + String(appointment?.hour)}
            </label>
            <br />
            <input
              className="form-input"
              type="time"
              {...register("time")}
              required={true}
            ></input>
            <br />
            <input
              type={"submit"}
              value="Update"
              className="createform-input"
            ></input>
            <Link to="/dashboard/appointments">
              <button>Cancel</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
