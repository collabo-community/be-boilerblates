import { badRequestErr } from '../../lib/errors/Errors';
import { UserDocument, UserModel as User } from '../models/user.model';
import bcrypt from 'bcrypt';

type LoginDocument = Pick<UserDocument, "email" | "password">


//---------------------- AUTHENTICATION (SIGNUP AND LOGIN) -------------------------------//
export const signUpOneUserService = async (requestBody: UserDocument): Promise<UserDocument> => {
  const user = new User({
    username: requestBody.username,
    email: requestBody.email,
    password: requestBody.password,
  });
  const save = await user.save();
  return save;
};

export const loginOneUserService = async (requestBody: LoginDocument) => {
  const {email, password} = requestBody;
  // check if email and password was provided
  if (!email && !password){
    badRequestErr("Please provide email and password");
  }
  // check if the user is registered in the database
  const user = await User.findOne({email: email});
  if(!user){
    badRequestErr("invalid credentials [EMAIL]");
  }
  // check if correct password was provided
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if(!isPasswordCorrect) {
    badRequestErr("invalid credentials [PASSWORD]");
  }
  return user;
};
//------------------------------------------------------------------------------------------//