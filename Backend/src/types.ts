export type Role = "patient" | "admin" | "doctor" | "";

export type FullPatient = {
    profileId : number,
    name : string,
    lastName: string,
    phoneNumber: string,
    uid:string,
    gender:string,
    age:number,
    medicalHistory:number
}