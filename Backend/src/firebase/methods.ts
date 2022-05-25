import * as admin from "firebase-admin";
import { Role } from "../types";

// admin@test.com / test123

// User.hasOne(Profile)
// User.belongsTo(Profile)

interface User {
  uid: string;
  email: string;
  role: Role;
  isDisabled: boolean;
}

const mapToUser = (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || { role: "" }) as { role?: string };
  const role = customClaims.role ? customClaims.role : "";

  return {
    uid: user.uid,
    email: user.email,
    role,
    isDisabled: user.disabled,
  };
};

//This methos is used to create a new user Patient
export const createUserPatient = async (
  email: string,
  password: string,
  role: Role,
  isDisabled: boolean
) => {
  const { uid } = await admin.auth().createUser({
    email,
    password
  });
  await admin.auth().setCustomUserClaims(uid, { role, isDisabled });

  const user = readUser(uid);

  return user;
};

export const createUserDoctor = async (
  email: string,
  password: string,
  role: Role,
  isDisabled: boolean
) => {
  const { uid } = await admin.auth().createUser({
    email,
    password
  });
  await admin.auth().setCustomUserClaims(uid, { role, isDisabled });

  const user = readUser(uid);
  return user;
};
// UserProfileModule -> CRU
// MedicalHistoryModule -> CRU
// ContactInfoModule -> CRU

export const readUser = async (userId: string) => {
  const user = await admin.auth().getUser(userId);

  return mapToUser(user);
};

export const getAllUsers = async () => {
  const listAllMyUsers = await admin.auth().listUsers(10);
  const users = listAllMyUsers.users.map(mapToUser);

  return users;
};

/* export const updateUser = async (uid: string, displayName: string) => {
  const user = await admin.auth().updateUser(uid, {
    displayName,
  });

  return mapToUser(user);
}; */

export const disableUser = async (uid: string, disabled: boolean) => {
  const user = await admin.auth().updateUser(uid, { disabled });

  return mapToUser(user);
};
