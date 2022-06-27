import { ActionCreatorWithPayload, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios"
import { IProfile } from "./profileSlice";

export interface IPatient {
    id: number,
    Profile: IProfile
    age: number,
    gender: string,
    medicalHistory : number,
    ProfileId: number
}

export interface PatientState {
    patients: IPatient[],
    status: "idle" | "loading" | "completed" | "failed",
    patientDetails: IPatient | null
}

const initialState : PatientState = {
    patients : [],
    status: "idle",
    patientDetails: null

}

export const fetchPatients = createAsyncThunk('patientsFetch',async (_,thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };

    const patientList = await axios.get("http://localhost:5000/admin/patients", {headers});

    return patientList.data;
});

export const fetchPatient = createAsyncThunk('patientFetch',async (_,thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };

    const patient = await axios.get("http://localhost:5000/patient/patient/"
    + state.profile.profileDetails?.id
    + "/"
    + state.auth.authDetails?.uid, {headers});

    return patient.data;
});

export const createProfilePatient = createAsyncThunk('profilePatientCreate',async (profile: Partial<IPatient>,thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };

    const idProfile = await axios({
        method: "POST",
        url: "http://localhost:5000/profile/create/"+ state.auth.authDetails?.uid,
        data: profile.Profile,
        headers: headers
    })

    profile.ProfileId = idProfile.data.id

    const req = await axios({
        method: "POST",
        url: "http://localhost:5000/patient/create/"+ state.auth.authDetails?.uid,
        data: profile,
        headers: headers
    })

    const lamo = idProfile;
    const lmao = req;
    return "created"
});

export const patientSlice = createSlice({
    name:'patient',
    initialState,
    reducers:{
        clearStatePatient: (state) =>{
            state.patientDetails = null;
            state.patients  = [];
            state.status = "idle";

        }
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchPatients.fulfilled, (state,action) => {
            state.patients = action.payload;
            state.status = "completed"
        })
        builder.addCase(fetchPatient.fulfilled, (state,action) => {
            state.patientDetails = action.payload;
            state.status = "completed"
        })
    }
})

export const selectPatients = (state: RootState) => state.patient.patients;

export const selectPatientDetails = (state: RootState) => state.patient.patientDetails;

export const selectPatientStatus = (state: RootState) => state.patient.status;

export const { clearStatePatient } = patientSlice.actions

export default patientSlice.reducer;