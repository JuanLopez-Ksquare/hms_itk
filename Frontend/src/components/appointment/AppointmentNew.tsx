import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navbar } from "../navbar/Navbar";
import {
  createNewAppointment,
  fetchUserAppointments,
} from "../slices/appointmentSlice";
import { selectDoctors } from "../slices/doctorSlice";
import { selectPatientDetails, selectPatients } from "../slices/patientSlice";

export const AppointmentNew = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const doctors = useAppSelector(selectDoctors);
  const patient = useAppSelector(selectPatientDetails);

  const list = doctors.map((value) => (
    <option key={value.id} value={Number(value.id)}>
      {value.Profile.name} {" " + value.Profile.lastName}{" "}
      {" - " + value.especialization}
    </option>
  ));

  const createAppointment = async (values: any) => {
    try {
      await dispatch(
        createNewAppointment({
          date: values.date,
          hour: String(values.time),
          motive: values.motive,
          DoctorId: Number(values.doctor),
          PatientId: Number(patient?.id),
        })
      );
      await dispatch(fetchUserAppointments());
      alert("Succces!");

      navigate("/dashboard/appointments");
    } catch (error) {
      alert("Oops! Something went wrong");
    }
  };
  //date:Date,time:string,motive:string,doctorId:number,patientId:number
  return (
    <div>
      <Navbar />
      <div className="createform-container">
        <div className="create-form">
          <label className="createform-main-label">Create an Appointment</label>
          <form onSubmit={handleSubmit(createAppointment)}>
            <label className="form-label">Date:</label>
            <br />
            <input
              className="form-input"
              type="date"
              placeholder="example@hotmail.com"
              {...register("date")}
              required={true}
            ></input>
            <br />
            <label className="form-label">Hour:</label>
            <br />
            <input
              className="form-input"
              type="time"
              {...register("time")}
              required={true}
            ></input>
            <br />
            <label className="form-label">Motive:</label>
            <br />
            <input
              className="form-input"
              type="text"
              placeholder="Appointment motive"
              {...register("motive")}
              required={true}
            ></input>
            <br />
            <label className="form-label">Doctor:</label>
            <br />
            <select className="form-input" {...register("doctor")}>
              {list}
            </select>
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
