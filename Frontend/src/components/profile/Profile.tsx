import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import userImage from "../../images/icontest.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthComponent, Navbar } from "../navbar/Navbar";
import {
  fetchProfile,
  selectProfiles,
  selectProfilesState,
} from "../slices/profileSlice";
import "./profile.css";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const profileStatus = useAppSelector(selectProfilesState);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [profileStatus, dispatch]);

  const profile = useAppSelector(selectProfiles);

  type Profile = {
    name: string;
    lastName: string;
    phoneNumber: string;
  };

  let userProfile: Profile = {
    name: String(profile?.name),
    lastName: String(profile?.lastName),
    phoneNumber: String(profile?.phoneNumber),
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-banner">
          <div className="profile-banner-items">
            <img src={userImage} className="profile-image" />
          </div>
          <div>
            <label className="profile-banner-name">
              {userProfile.name.toUpperCase() +
                " " +
                userProfile.lastName.toUpperCase()}
              <br />
            </label>
            <label className="profile-banner-role">
              {AuthComponent()?.role?.toUpperCase()}
            </label>
          </div>
        </div>
        <div className="profile-about">
          <label className="profile-about-title">About</label>
          <label className="profile-about-labels">Name:</label>
          <input
            className="profile-about-input"
            readOnly
            value={userProfile.name}
          ></input>
          <label className="profile-about-labels">Last Name:</label>
          <input
            className="profile-about-input"
            readOnly
            value={userProfile.lastName}
          ></input>
          <label className="profile-about-labels">Phone:</label>
          <input
            className="profile-about-input"
            readOnly
            value={userProfile.phoneNumber}
          ></input>
          <label className="profile-about-labels">Account type:</label>
          <input
            className="profile-about-input"
            readOnly
            value={String(AuthComponent()?.role)}
          ></input>
        </div>
      </div>
    </>
  );
};
