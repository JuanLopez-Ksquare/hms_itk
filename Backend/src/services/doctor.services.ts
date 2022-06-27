import { Doctor } from "../models/Doctor.model";
import { Profile } from "../models/Profile.model";

export const createDoctor = async (
    especialization : string,
    profesionalLicence : string,
    ProfileId? : number
    ) => {
    try {
        const doctor = await Doctor.create({
            especialization,
            profesionalLicence,
            ProfileId
        })

        return doctor;
    } catch (error) {
        return error;
    }
}

export const getAllDoctors = async() => {
    try{
        const listDoctors = await Doctor.findAll({
            include: [{
                model: Profile,
                required: true
            }]  
        });
        return listDoctors
    }catch(error){
        return error;
    }
}

export const getOneDoctor = async(profileId: number) => {
    try {
        const doctor = await Doctor.findOne({where: {
            ProfileId: profileId
        },
        include: [{
            model: Profile,
            required: true
        }]})
        return doctor;
    } catch (error) {
        return error
    }
}