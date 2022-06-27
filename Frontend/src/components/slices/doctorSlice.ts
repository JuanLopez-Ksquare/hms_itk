import { ActionCreatorWithPayload, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios"
import { IProfile } from "./profileSlice";
import { profile } from "console";

export interface IDoctor {
    id:number,
    Profile: IProfile,
    especialization: string,
    profesionalLicence: string,
    ProfileId: number
}

export interface DoctorState {
    doctors: IDoctor[],
    status: "idle" | "loading" | "completed" | "failed",
    doctorDetails: IDoctor | null
}

const initialState : DoctorState = {
    doctors : [],
    status : "idle",
    doctorDetails: null
}

export const fetchDoctors = createAsyncThunk('doctorsFetch', async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };

    const doctorList = await axios.get("http://localhost:5000/admin/doctors", {headers})

    return doctorList.data;
})

export const fetchDoctor = createAsyncThunk('doctorFetch', async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };

    const doctor = await axios.get("http://localhost:5000/doctor/doctor/"
    +state.profile.profileDetails?.id
    +"/"
    +state.auth.authDetails?.uid, {headers})

    return doctor.data;
})

export const createProfileDoctor = createAsyncThunk('profileDoctorCreate', async (profile: Partial<IDoctor>, thunkApi) => {
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
    profile.ProfileId = idProfile.data.id;
 
    const req = await axios({
        method:"POST",
        url:"http://localhost:5000/doctor/create/"+ state.auth.authDetails?.uid,
        data: profile,
        headers: headers
    })

    const lamo = idProfile;
    const lmao = req;

    return "created"
})

export const doctorSlice = createSlice({
    name : 'patient',
    initialState,
    reducers:{
        clearStateDoctor: (state) =>{
            state.doctorDetails = null;
            state.doctors  = [];
            state.status = "idle";

        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchDoctors.fulfilled, (state, action) => {
            state.doctors = action.payload;
            state.status = "completed"
        })
        builder.addCase(fetchDoctor.fulfilled, (state, action) => {
            state.doctorDetails = action.payload;
            state.status = "completed"
        })
    }
})

export const selectDoctors = (state: RootState) => state.doctor.doctors;

export const selectDoctorStatus = (state: RootState) => state.doctor.status;

export const {clearStateDoctor} = doctorSlice.actions;

export default doctorSlice.reducer;