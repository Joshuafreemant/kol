import { Document, Model } from "mongoose";
import * as Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    default:"member",
    type:String
  },
  status:{
    default:"unapproved",
    type:String
  }
});
interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    phone_number: string;
    password: string;
    role: string;
    status: string;
}

interface IUserDocument extends IUser, Document {}
interface IUserModel extends Model<IUserDocument> {}

//postSchema->Document->Model

// const PostModel: IPostModel = Mongoose.model<IPostDocument>("post", postSchema);

const UserModel: IUserModel =
  Mongoose.models.user || Mongoose.model<IUserDocument>("user", userSchema);

export default UserModel;