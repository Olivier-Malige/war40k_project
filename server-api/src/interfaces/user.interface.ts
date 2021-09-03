import { Document } from 'mongoose';

export interface IUserLocal {
  email: string;
  password: string;
}

export interface IUser extends Document {
  username: string;
  local: IUserLocal;
  isAdmin: boolean;
  avatar?: string;
  comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
}

export interface UserForm {
  username: string;
  email: string;
  password: string;
}
