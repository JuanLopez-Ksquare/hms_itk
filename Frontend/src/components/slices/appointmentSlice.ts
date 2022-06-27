import { ActionCreatorWithPayload, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios"
import { IPatient } from "./patientSlice";
import { IDoctor } from "./doctorSlice";

export interface IAppointments {
    id: number,
    date: Date,
    hour: String,
    motive: String,
    status: String,
    createdAt: String,
    Patient: IPatient,
    Doctor: IDoctor
}

export interface AppointmentState {
    appointments: IAppointments[],
    status: "idle" | "loading" | "completed" | "failed",
    appointmentsDetails : IAppointments | null
}

const initialState: AppointmentState ={
    appointments: [],
    status: "idle",
    appointmentsDetails : null
}

export const fetchAdminAppointments = createAsyncThunk('appointmentAdminFetch',
async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };
    const appointmentList = await axios.get("http://localhost:5000/admin/appointments/all/",
    {headers})

    return appointmentList.data;
})

export const fetchUserAppointments = createAsyncThunk('appointmentUserFetch',
async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };
    const appointmentList = await axios.get("http://localhost:5000/patient/appointments/all/"
    + state.patient.patientDetails?.id
    + "/"
    + state.auth.authDetails?.uid,
    {headers})

    return appointmentList.data;
})

export const fetchDoctorAppointments = createAsyncThunk('appointmentDoctorFetch',
async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };
    const appointmentList = await axios.get("http://localhost:5000/doctor/appointments/all/"
    + state.doctor.doctorDetails?.id
    + "/"
    + state.auth.authDetails?.uid,
    {headers})

    return appointmentList.data;
})

export const cancelAppointment = createAsyncThunk('appointmentCancel',
async (appointmentid: number, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };
    const appointmentList = await axios.delete("http://localhost:5000/patient/cancelAppointment/"
    + appointmentid
    + "/"
    + state.auth.authDetails?.uid,
    {headers})

    const toUse = appointmentList;
})

export const createNewAppointment = createAsyncThunk('appointmentCreate',
async (body:{date:Date,hour:string,motive:string,DoctorId:number,PatientId:any}, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };
    const appointmentList = await axios({
        method: "POST",
        url: "http://localhost:5000/patient/createAppointment/"+ state.auth.authDetails?.uid,
        data: body,
        headers: headers
    })

    const toUse = appointmentList;
})

export const updateAppointment = createAsyncThunk('appointmentUpdate',
async (body:{id:number,date:Date,hour:string}, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };
    const appointmentList = await axios({
        method: "PATCH",
        url: "http://localhost:5000/doctor/updateAppointment/"
        +body.id
        + "/"
        + state.auth.authDetails?.uid,
        data: body,
        headers: headers
    })

    const toUse = appointmentList;
})

export const saveToStateAppointment = createAsyncThunk('appointmentSaveUpdate',
async (appointment: IAppointments, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    return appointment;
})

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers:{
        clearStateAppointments: (state) =>{
            state.appointmentsDetails = null;
            state.appointments  = [];
            state.status = "idle";
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchAdminAppointments.pending,(state) => {
            state.status = "loading";
        });
        builder.addCase(fetchAdminAppointments.fulfilled, (state, action) => {
            state.appointments = action.payload;
            state.status = "completed";
        })
        builder.addCase(fetchAdminAppointments.rejected,(state) => {
            state.status = "failed";
        })
        builder.addCase(fetchUserAppointments.fulfilled, (state, action) => {
            state.appointments = action.payload;
            state.status = "completed";
        })
        builder.addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
            state.appointments = action.payload;
            state.status = "completed";
        })
        builder.addCase(cancelAppointment.fulfilled, (state) => {
            state.status = "completed"
        })
        builder.addCase(createNewAppointment.fulfilled, (state) =>{
            state.status = "completed"
        })
        builder.addCase(saveToStateAppointment.fulfilled,(state, action) => {
            state.appointmentsDetails = action.payload
            state.status = "completed"
        })
    }
});

export const selectAppointments = (state: RootState) => state.appointment.appointments

export const selectAppointmentDetails = (state: RootState) => state.appointment.appointmentsDetails

export const selectAppointmentsStatus = (state : RootState) => state.appointment.status

export const {clearStateAppointments} = appointmentSlice.actions;

export default appointmentSlice.reducer;