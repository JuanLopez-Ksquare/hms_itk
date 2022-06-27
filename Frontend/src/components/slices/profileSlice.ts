import { ActionCreatorWithPayload, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios"

export interface IProfile {
    id: number,
    name: string,
    lastName: string,
    phoneNumber: string,
    userId: string

}

export interface ProfileState {
    profiles: IProfile[],
    status: "idle" | "loading" | "completed" | "failed",
    profileDetails : IProfile | null
}

const initialState: ProfileState = {
    profiles : [],
    status : "idle",
    profileDetails : null
}


export const fetchProfile = createAsyncThunk('profileFetch',async (_,thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };

    const profile = await axios.get("http://localhost:5000/profile/profile/" + state.auth.authDetails?.uid, {headers});

    return profile.data;
});



export const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
        clearStateProfile: (state) =>{
            state.profileDetails = null;
            state.profiles  = [];
            state.status = "idle";

        }
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchProfile.fulfilled, (state, action) =>{

            state.profileDetails = action.payload;
            state.status = "completed";
        });
    }
})

export const selectProfiles = (state:RootState) => state.profile.profileDetails;

export const selectProfilesState = (state: RootState) => state.profile.status;

export const {clearStateProfile} = profileSlice.actions

export default profileSlice.reducer;