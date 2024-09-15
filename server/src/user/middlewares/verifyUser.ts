import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.body?.refreshToken;

    if (!token) {
      res.status(500).json({
        success: false,
        message: "Auth token not provided please try again",
      });
    }

    const decodedUser = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);

    //@ts-ignore
    const user = await User.findById(decodedUser?._id);
    //@ts-ignore
    req.user = user;
    next();
  } catch (error: any) {
    console.log("Error verifying User", error.message);
    return res.status(500).json({
      success: false,
      message: "Auth token not provided please try again",
    });
  }
};

export default verifyUser;
