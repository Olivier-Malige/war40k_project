import { IUnit } from '../interfaces';
import { Units } from '../database';

export const createUnit = async (user: IUnit): Promise<IUnit> => {
  try {
    const newUser = new Units({ ...user });
    await newUser.save();
    return newUser;
  } catch (e) {
    throw e;
  }
};

export const findUnits = async (): Promise<Array<IUnit>> => {
  try {
    return await Units.find();
  } catch (e) {
    throw e;
  }
};

export const findUnitByName = (name: string): Promise<IUnit> => {
  return Units.findOne({ name }).exec();
};

export const searchUnitsByName = (search: string): Promise<Array<IUnit>> => {
  const regExp = `^${search}`;
  const reg = new RegExp(regExp);
  return Units.find({ name: { $regex: reg } }).exec();
};
