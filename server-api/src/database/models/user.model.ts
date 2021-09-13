import mongoose, { Model } from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';
import { User } from '../../interfaces';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  isAdmin: { type: Boolean, default: false },
});

userSchema.statics.hashPassword = (password: string) => {
  return bcrypt.hash(password, 12);
};

userSchema.methods.comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

interface UserModel extends Model<User> {
  hashPassword: (password: string) => string;
}

export const UserModel = mongoose.model<User, UserModel>('user', userSchema);
