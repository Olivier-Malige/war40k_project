import { Document } from 'mongoose';

export interface UserLocal {
  email: string;
  password: string;
}

export interface User extends Document {
  username: string;
  local: UserLocal;
  isAdmin: boolean;
  avatar?: string;
  comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
}

export interface UserForm {
  username: string;
  email: string;
  password: string;
}
