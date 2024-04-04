import { badRequestErr, notFoundErr } from '../../lib/errors/Errors';
import { UserDocument, UserModel as User } from '../models/user.model';

const selectString = '_id username email password role createdAt updatedAt';


//---------------------- AUTHENTICATION (SIGNUP AND LOGIN) -------------------------------//
type SignInDocument = Pick<UserDocument, "email" | "password">

export const signUpOneUserService = async (requestBody: UserDocument): Promise<UserDocument> => {
  const user = new User({
    username: requestBody.username,
    email: requestBody.email,
    password: requestBody.password,
  });
  const save = await user.save();
  return save;
};

export const loginOneUserService = async (requestBody: SignInDocument) => {
  const {email, password} = requestBody;
  // check if email and password was provided
  if (!email && !password){
    badRequestErr("Please provide email and password");
  }
  // check if the user is registered in the database
  const user = await User.findOne({email});
  if(!user){
    badRequestErr("invalid email or password");
  }
  // check if correct password was provided
  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect) {
    badRequestErr("invalid email or password");
  }
  return user;
};
//------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------//
export const getAllUsersService = async () => {
  const query = await User.find().select(selectString).exec();
  return query;
};

export const getOneUserService = async (paramsId: string) => {
  const query = await User.findById(paramsId).select(selectString).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }
  return query;
};

export const deleteOneUserService = async (paramsId: string) => {
  const query = await User.deleteOne({ _id: paramsId }).exec();
  if (query.deletedCount < 1){
    notFoundErr('No record found for provided ID to be deleted')
  }
  return query;
}

export const updateOneUserPropertyValueService = async (paramsId: string, requestBody: { propName: string, value: string }[]) => {
  const query = await User.findById(paramsId).select(selectString).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }

  for (const ops of requestBody) {
    if(!(ops.propName in query)){
      badRequestErr(`invalid property: ${ops.propName}`);
    }
    query[ops.propName as keyof UserDocument] = ops.value as never;
  }

  const updatedQuery = await query.save();
  return updatedQuery;
};

export const updateUserPropertyValuesService = async (paramsId: string, requestBody: UserDocument) => {
  const query = await User.findById(paramsId).select(selectString).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }

  query.username = requestBody.username;
  query.email = requestBody.email;
  query.password = requestBody.password;

  const updatedQuery = await query.save();
  return updatedQuery;
};
//--------------------------------------------------------------------------------------------------//


//--------------------------------------------------------------------------------------------------//
export const deleteAllUserService = async () => {
  const query = await User.deleteMany().exec();
  if (query.deletedCount < 1){
    notFoundErr('No record found to be deleted')
  }
  return query;
}
//--------------------------------------------------------------------------------------------------//