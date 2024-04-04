import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface UserDocument extends mongoose.Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateToken(): string;
}

const collectionName = 'user';

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email",
    ]},
  password: { type: String, required: true },
  role: { type: String, required: true, default: UserRole.User},
  avatar: { type: String },
},
{
  timestamps: true,
});

UserSchema.pre('save', async function(next){
  // Only run this function if password was moddified (not on other update functions)
  if (!this.isModified("password")){
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  return next();
})

// comparing password during login
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

// generating token during registration and logging in
UserSchema.methods.generateToken = function (): string {
  const token = jwt.sign(
    {_id: this._id, username: this.username, role: this.role},
    `${process.env.JWT_SECRET}`,
    {expiresIn: `${process.env.JWT_LIFETIME}`});
  return token;
}

const UserModel = mongoose.model<UserDocument>(collectionName, UserSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { UserModel };