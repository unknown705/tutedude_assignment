import { Request, Response } from "express";
import User from "../models/user.model";
import Friendship from "../models/friendship.model";

const generateAccessAndRefreshToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error: any) {
    console.log("Error generating Access and Refresh token", error.message);
    throw error;
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, hobbies } = req.body;
    if ([username, password, hobbies].some((field) => field === undefined)) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const userWithUsername = await User.findOne({ username });
    if (userWithUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const user = await User.create({ username, password, hobbies });
    user.save();
    const newUser = await User.findById(user._id).select("-password");
    res.status(201).json({ success: true, user: newUser });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if ([username, password].some((field) => field === undefined)) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const newUser = await User.findById(user._id).select("-password");
    const options = {
      httpOnly: true,
    };
    secure: process.env.NODE_ENV === "production",
      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ success: true, user: newUser });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    user.refreshToken = "";
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ success: true });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    const { friendId } = req.body;

    if (!friendId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const friend = await User.findById(friendId);
    if (!friend) {
      return res
        .status(400)
        .json({ success: false, message: "Friend not found" });
    }

    if (user._id === friendId) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot add yourself" });
    }

    const existingFriendship = await Friendship.findOne({
      user: user._id,
      friend: friendId,
    });
    if (existingFriendship) {
      return res
        .status(400)
        .json({ success: false, message: "Friendship already exists" });
    }

    const friendship = await Friendship.create({
      user: user._id,
      friend: friendId,
    });
    friendship.save();

    res.status(201).json({ success: true, friendship });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const getFriends = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;

    const friendships = await Friendship.find({ user: user._id }).populate(
      "friend"
    );
    res.status(200).json({ success: true, friendships });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    const { friendId } = req.body;

    if (!friendId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const friendship = await Friendship.findOneAndDelete({
      user: user._id,
      friend: friendId,
    });
    if (!friendship) {
      return res
        .status(400)
        .json({ success: false, message: "Friendship not found" });
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const getFriendRequests = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;

    const friendRequests = await Friendship.find({
      friend: user._id,
      status: "pending",
    }).populate("user");
    res.status(200).json({ success: true, friendRequests });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const friendship = await Friendship.findOneAndUpdate(
      { user: userId, friend: user._id },
      { status: "accepted" },
      { new: true }
    );
    if (!friendship) {
      return res
        .status(400)
        .json({ success: false, message: "Friendship not found" });
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const rejectFriendRequest = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const friendship = await Friendship.findOneAndDelete({
      user: userId,
      friend: user._id,
      status: "pending",
    });
    if (!friendship) {
      return res
        .status(400)
        .json({ success: false, message: "Friendship not found" });
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const getRecommendedFriendsWithMutualFriend = async (
  req: Request,
  res: Response
) => {
  try {
    //@ts-ignore
    const user = req.user;

    const userFriendships = await Friendship.find({ user: user._id }).populate(
      "friend"
    );
    const userFriends = userFriendships.map((friendship) => friendship.friend);

    const recommendedFriends = await Friendship.find({
      user: { $in: userFriends },
      friend: { $nin: userFriends },
    })
      .populate("friend")
      .populate("user");

    res.status(200).json({ success: true, recommendedFriends });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const getRecommendedFriendsWithMutualHobbies = async (
  req: Request,
  res: Response
) => {
  try {
    //@ts-ignore
    const user = req.user;

    const userFriendships = await Friendship.find({ user: user._id }).populate(
      "friend"
    );
    const userFriends = userFriendships.map((friendship) => friendship.friend);

    const userHobbies = user.hobbies;

    const recommendedFriends = await User.find({
      hobbies: { $in: userHobbies },
      _id: { $nin: userFriends },
    });

    res.status(200).json({ success: true, recommendedFriends });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};
