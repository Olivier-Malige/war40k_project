import { UserForm } from '../interfaces';

import {  UserModel } from '../database/models/user.model';

export const createUser = async (user: UserForm) => {
  try {
    const hashedPassword = await UserModel.hashPassword(user.password);
    const newUser = new UserModel({
      username: user.username,
      local: {
        email: user.email,
        password: hashedPassword,
      },
    });
    return newUser.save();
  } catch (e) {
    throw e;
  }
};

export const findUserPerEmail = (email: string) => {
  return UserModel.findOne({ 'local.email': email }).exec();
};

export const findUserPerId = (id: string) => {
  return UserModel.findById(id).exec();
};

export const findUserPerUsername = (username: string) => {
  return UserModel.findOne({ username }).exec();
};

export const searchUsersPerUsername = (search: string) => {
  const regExp = `^${search}`;
  const reg = new RegExp(regExp);
  return UserModel.find({ username: { $regex: reg } }).exec();
};
