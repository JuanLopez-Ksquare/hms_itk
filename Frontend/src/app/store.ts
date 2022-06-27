import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../components/slices/authSlice'
import appointmentReducer  from '../components/slices/appointmentSlice';
import profileReducer from '../components/slices/profileSlice';
import patientReducer from '../components/slices/patientSlice';
import  doctorReducer  from '../components/slices/doctorSlice';
import userReducer from '../components/slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointment : appointmentReducer,
    profile: profileReducer,
    patient: patientReducer,
    doctor: doctorReducer,
    user: userReducer 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
