import {
  createW40kUnit,
  findAllW40kUnits,
  searchW40kUnits,
  findW40kUnit,
  updateW40kUnit,
  removeW40hUnit,
} from '../queries/units.queries';
import { W40KUnit } from '../interfaces';

export const resolvers = {
  Query: {
    w40kUnits: (): Promise<Array<W40KUnit>> => {
      return findAllW40kUnits();
    },
    w40kUnit: (_, { id }): Promise<W40KUnit> => {
      return findW40kUnit(id);
    },
    searchW40kUnitsByName: (_, { name }): Promise<Array<W40KUnit>> => {
      return searchW40kUnits(name);
    },
  },
  Mutation: {
    createW40kUnit: (_, { input }) => {
      return createW40kUnit(input as W40KUnit);
    },
    updateW40kUnit: (_, { id, input }) => {
      return updateW40kUnit(id, input as W40KUnit);
    },
    removeW40kUnit: (_, { id }) => {
      return removeW40hUnit(id);
    },
  },
};
