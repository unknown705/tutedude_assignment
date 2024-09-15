import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[0] || req.body?.refreshToken;

    if (!token) {
      res.status(500).json({
        success: false,
        message: "Auth token not provided please try again",
      });
    }

    const decodedUser = await jwt.verify(token, process.env.REFRESH_TOKEN!);
    //@ts-ignore
    const user = await User.findById(decodedUser?.id);
    //@ts-ignore
    req.user = user;
    next();
  } catch (error: any) {
    console.log("Error verifying User");
  }
};

export default verifyUser;
