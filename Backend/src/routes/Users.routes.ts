import { Router, Request, Response } from "express";
import {
    createUserDoctor,
  createUserPatient,
  disableUser,
  getAllUsers,
  readUser,
} from "../firebase/methods";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const UserRouter = Router();

UserRouter.post("/createPatient", async (req: Request, res: Response) => {

  const { email, password} = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Missing fields" });
  }

/*   if (role === "admin" || role === "doctor") {
    return res.status(400).send({ error: "Invalid role" });
  } */

  try {
    const userId = await createUserPatient(email, password, "patient", false);
    res.status(201).send({
      userId
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// createDoctor - Authenticado y el rol debe ser admin

UserRouter.post("/createDoctor",
isAuthenticated,
hasRole({roles:["admin"], allowSameUser: false}),
 async (req: Request, res: Response) => {

    const { email, password} = req.body;
  
    if (!email || !password) {
      return res.status(400).send({ error: "Missing fields" });
    }
  
    try {
      const userId = await createUserDoctor(email, password,"doctor", false);
      res.status(201).send({
        userId
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  });
//In this method we can create users via the super user, not even admin can use this method
UserRouter.post("/createAdmin",
isAuthenticated,
hasRole({roles:[""], allowSameUser: false}),
 async (req: Request, res: Response) => {

    const { email, password} = req.body;
  
    if (!email || !password) {
      return res.status(400).send({ error: "Missing fields" });
    }
  
    try {
      const userId = await createUserDoctor(email, password,"admin", false);
      res.status(201).send({
        userId
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  });

UserRouter.get(
  "/:userId",
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await readUser(userId);
      return res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "fede went wrong" });
    }
  }
);

UserRouter.get(
  "/",
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "something went wrong" });
    }
  }
);

/* UserRouter.patch(
  "/:userId",
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { displayName } = req.body;

    if (!displayName) {
      return res.status(400).send({
        error: "no fields to update",
      });
    }

    try {
      const user = await updateUser(userId, displayName);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
); */

UserRouter.delete(
  "/disable/:userId",
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await disableUser(userId, true);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

UserRouter.patch(
  "/enable/:userId",
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await disableUser(userId, false);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);