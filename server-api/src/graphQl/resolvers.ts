import {
  createW40kUnit,
  findAllW40kUnits,
  searchW40kUnits,
  findW40kUnit,
  updateW40kUnit,
  removeW40kUnits,
} from '../database/queries/units.queries';
import { W40KUnit, W40KUnitInput } from '../interfaces';
import { dateScalar } from './scalars';

export const resolvers = {
  Date: dateScalar,

  Query: {
    w40kUnits: (): Promise<Array<W40KUnit>> => {
      return findAllW40kUnits();
    },
    w40kUnit: (_parent, { id }): Promise<W40KUnit> => {
      return findW40kUnit(id);
    },
    searchW40kUnitsByName: (_parent, { name }): Promise<Array<W40KUnit>> => {
      return searchW40kUnits(name);
    },
  },
  Mutation: {
    createW40kUnit: (_parent, { input }) => {
      return createW40kUnit(input as W40KUnitInput);
    },
    updateW40kUnit: (_parent, { id, input }) => {
      return updateW40kUnit(id, input as W40KUnitInput);
    },
    removeW40kUnits: (_parent, { id }) => {
      return removeW40kUnits(id);
    },
  },
};
