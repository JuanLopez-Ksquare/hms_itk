import { query } from "express";
import { Patient } from "../models/Patient.model";
import { Profile } from "../models/Profile.model";
import { FullPatient } from "../types";


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

export const getAllPatients = async() => {
    try{
        const listPatients = await Patient.findAll({
            include: [{
                model: Profile,
                required: true
            }]
        });
        
        
        return listPatients
    }catch(error){
        return error;
    }
}

export const getOnePatient = async(profileId: number) => {
    try {
        const patient = await Patient.findOne({where: {
            ProfileId: profileId
        },
        include: [{
            model: Profile,
            required: true
        }]})
        return patient;
    } catch (error) {
        return error
    }
}

