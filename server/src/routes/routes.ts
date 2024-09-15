import { Router } from "express";
import userRoutes from "../user/routes/user.routes";

const appRoutes = Router();

appRoutes.use("/user", userRoutes);

export default appRoutes;
