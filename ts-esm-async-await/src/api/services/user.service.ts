import { notFoundErr } from '../../lib/errors/Errors';
import { UserDocument, UserModel as User } from '../models/user.model';

export const getAllUsersService = async () => {
  const query = await User.find().exec();
  return query;
}

export const createOneUserService = async (requestBody: UserDocument): Promise<UserDocument> => {
  const user = new User({
    username: requestBody.username,
    email: requestBody.email,
    password: requestBody.password
  });
  const save = await user.save();
  return save;
}

export const getOneUserService = async (paramsId: string) => {
  const query = await User.findById(paramsId).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }
  return query;
}

export const deleteOneUserService = async (paramsId: string) => {
  const query = await User.deleteOne({ _id: paramsId }).exec();
  if (query.deletedCount < 1){
    notFoundErr('No record found for provided ID to be deleted');
  }
  return query;
}

export const deleteAllUsersService = async () => {
  const query = await User.deleteMany().exec();
  if (query.deletedCount < 1){
    notFoundErr('No record found to be deleted');
  }
  return query;
}
