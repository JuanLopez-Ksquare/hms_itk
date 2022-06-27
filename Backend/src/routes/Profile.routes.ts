import {Router, Request, Response} from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createProfile, readProfile } from "../services/profile.services";

export const ProfileRouter = Router();

//Route to acces the create profile method, we need to be an admin or be the user logged in to the app
ProfileRouter.post("/create/:userId",
 isAuthenticated,
 hasRole({ roles: ["admin"], allowSameUser: true}),
  async (req: Request, res: Response) => {
    const {name, lastName, phoneNumber, userId} = req.body;
    const profileCreated = await createProfile(name, lastName, phoneNumber, userId);
    res.status(200).send(profileCreated);
})

ProfileRouter.get("/profile/:userId",
isAuthenticated,
hasRole({roles: ["admin"], allowSameUser: true}),
async (req:Request, res: Response) => {
  const {userId} = req.params

  const profile = await readProfile(userId);
  res.status(200).send(profile);
}
)