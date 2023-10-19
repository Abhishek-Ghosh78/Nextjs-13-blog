import { model, models, Schema } from "mongoose";

// Mongoose userSchema interface
interface IUser {
  email: string;
  name: string;
  password: string;
}

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const userModel = models.User || model<IUser>("User", userSchema);

export default userModel;
