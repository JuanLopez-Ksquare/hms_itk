import { Profile } from "../models/Profile.model";


//With this function you can create a generic profile for any user since the roles does not matter at this point
export const createProfile = async (name:string, lastName: string, phoneNumber:string, userId : string) =>
{
    try{
        const createdProfile = await Profile.create({
            name,
            lastName,
            phoneNumber,
            userId
        });
        return createdProfile;
    }catch(error)
    {
        return error;
    }
}

export const readProfile = async (uid: string) => {
    try {
        const profile = await Profile.findOne({where: {
            userId: uid
        }})
        return profile
    } catch (error) {
        return error
    }
}