import { Doctor } from "../models/Doctor.model";

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