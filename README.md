## Data Modeling Definition

### Type Role

The only 3 types of roles that can be assigned to a user

```ts
type Role = "Patient" | "Doctor" | "Administrator";
```

### User Model

This Model is gonna be the one used to get the information for the users to log in and to know which type of user we're dealing with so we can show him the correct info

```ts
interface User {
  id: number; //This is gonna be the primary key and its gonna be Auto Incremental
  email: string; //varchar(100)
  password: string; //varchar(20)
  createdOn: string; //TIMESTAMP
  lastLogin: string; //TIMESTAMP
  isDeleted: boolean;
  role: Role; //Varchar(20)
}
```

### Profile Model

In this model we're gonna be handling the data of the people in the system without having to get the login information

```ts
interface Profile {
  id: number; //Primary Key of the User table
  idUser: number; //Foreign Key of the user table
  name: string; //Identifier for the user
  lastName: string; // Idenfier for the user
  phoneNumber: string; // Contact info that we're probably gonna need in the system
}
```

### Patient Model

In this model we're handling the especific data of the patient so here we can get more especific info

```ts
interface Patient {
  id: number; //Primary key autoincremental
  idProfile: number; //ForeignKey from the profile model
  medicalHistory: MedicalHistory; //
}
```

### Doctor Model

In this model we're handling the especific data of the doctor so here we can get more especific info

```ts
interface Doctor {
  id: number; //Primary key autoincremental
  idProfile: number; //ForeignKey from the profile model
  especialization: string; //varchar(50)
  professionalLicence: string;
}
```

### Medical History

In this model we're handling the patient medical conditions that he can have, however i will not be listening this right now because i dont know the things that can be listed on a medical history

```ts
interface Medical History {
  id : number; //Primary key
  idPatient : number //Foreign Key
  conditions...,
}
```

### Apointment Model

This model is gonna be responsible for handling the information of the appointments and its gonna be dependant on a patient and a doctor

```ts
interface Appointments {
  id: number; //Primary key, autoincremental
  idPatient: number; //Foreign key of the User table
  idDoctor: number; //Foreign key of the User table
  createdOn: string; //TIMESTAMP
  date: string; //TIMESTAMP
  motive: string; //varchar(200)
  isActive: boolean; //boolean
}
```
