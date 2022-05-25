import { Patient } from "../models/Patient.model";


//With this we create a patient on our local database
export const createPatient = async(
    age: number,
    gender: string,
    medicalHistory: number,
    ProfileId : number
) => {
    try {
        const patient = await Patient.create({
            age,
            gender,
            medicalHistory,
            ProfileId
        });

        return patient;
        
    } catch (error) {
        return error;
    }
}