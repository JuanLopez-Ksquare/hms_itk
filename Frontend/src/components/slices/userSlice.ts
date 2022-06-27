import { ActionCreatorWithPayload, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

export interface IUser {
    email: string;
    password: string;
}

export interface UserState {
    users: IUser[]
    status : 'idle' | 'loading' | 'completed' | 'failed';
    userDetails : IUser | null

}

const initialState: UserState ={
    users: [],
    status: "idle",
    userDetails :null
    
}


export const createDoctorFireBase = createAsyncThunk('createDoctor', async(user: Partial<IUser>, thunkApi) =>{
    const state = thunkApi.getState() as RootState;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken
    };

    const req = await axios({
        method: "POST",
        url: "http://localhost:5000/users/createDoctor",
        data: user,
        headers: headers
    })

    return req.data;
})

export const createPatientFireBase = createAsyncThunk('createPatient', async(user: Partial<IUser>, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const headers = {
        'Content-Type': 'application/json'
    };
    try {
        const req = await axios({
            method: "POST",
            url: "http://localhost:5000/users/createPatient",
            data: user,
            headers: headers
        })
    
        return req.data;
    } catch (error) {
        throw error
    }

})

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearStateUser: (state) =>{
            state.userDetails = null;
            state.users  = [];
            state.status = "idle";

        }
    },
    extraReducers: (builder) =>{
        builder.addCase(createDoctorFireBase.fulfilled, (state,action) => {
            state.users = action.payload;
            state.status = "completed";
        })
    }

})


export const selectUsers = (state: RootState) => state.user.users;
export const selectUserStatus = (state:RootState) => state.user.status;

export const {clearStateUser} = userSlice.actions;

export default userSlice.reducer;