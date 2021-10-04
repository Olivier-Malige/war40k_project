import { W40kUnits } from '../index';
import { W40kUnit, W40kUnitInput } from '../../types';

export const createW40kUnit = async (input: W40kUnitInput): Promise<W40kUnit> => {
  try {
    const newW40kUnit = new W40kUnits({ ...input });
    newW40kUnit.id = newW40kUnit._id;
    newW40kUnit.creationDate = new Date();
    await newW40kUnit.save();
    return newW40kUnit;
  } catch (e) {
    throw e;
  }
};

export const findAllW40kUnits = async (): Promise<Array<W40kUnit>> => {
  try {
    return (await W40kUnits.find()) || [];
  } catch (e) {
    throw e;
  }
};

export const findW40kUnit = (id: string): Promise<W40kUnit> => {
  return W40kUnits.findOne({ id }).exec();
};

export const searchW40kUnits = (search: string): Promise<Array<W40kUnit>> => {
  const regExp = `^${search}`;
  const reg = new RegExp(regExp);
  return W40kUnits.find({ name: { $regex: reg } }).exec();
};

export const updateW40kUnit = async (id: string, input: W40kUnitInput): Promise<W40kUnit> => {
  await W40kUnits.updateOne({ id }, { ...input, lastUpdateDate: new Date() }).exec();
  return W40kUnits.findOne({ id }).exec();
};

export const removeW40kUnits = async (id: string[]): Promise<boolean> => {
  const res = await W40kUnits.deleteMany({
    id: { $in: id },
  }).exec();
  return res.ok === 1;
};
