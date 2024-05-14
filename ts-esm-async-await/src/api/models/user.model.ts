import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 0,
  USER = 1,
}

export interface UserDocument extends mongoose.Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: number;
}

const collectionName = 'user';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, default: UserRole.USER},
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

const UserModel = mongoose.model<UserDocument>(collectionName, UserSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { UserModel };
