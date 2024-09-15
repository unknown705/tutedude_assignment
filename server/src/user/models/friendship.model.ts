import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IFriendship extends Document {
  _id: string;
  user: IUser["id"];
  friend: IUser["id"];
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const friendshipSchema = new Schema<IFriendship>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friend: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Friendship = mongoose.model<IFriendship>("Friendship", friendshipSchema);
export default Friendship;
