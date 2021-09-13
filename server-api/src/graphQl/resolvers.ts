import { createUnit, findUnitByName, findUnits, searchUnitsByName } from '../queries/units.queries';
import { Unit } from '../interfaces';

export const resolvers = {
  Query: {
    units: (): Promise<Array<Unit>> => {
      return findUnits();
    },
    unit: (_, { name }): Promise<Unit> => {
      return findUnitByName(name);
    },
    searchUnitsByName: (_, { name }): Promise<Array<Unit>> => {
      return searchUnitsByName(name);
    },
  },
  Mutation: {
    createUnit: (_, { input }) => {
      return createUnit(input as Unit);
    },
  },
};
