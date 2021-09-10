import { createUnit, findUnitByName, findUnits, searchUnitsByName } from '../queries/units.queries';
import { IUnit } from '../interfaces';

export const resolvers = {
  Query: {
    units: (): Promise<Array<IUnit>> => {
      return findUnits();
    },
    unit: (_, { name }): Promise<IUnit> => {
      return findUnitByName(name);
    },
    searchUnitsByName: (_, { name }): Promise<Array<IUnit>> => {
      return searchUnitsByName(name);
    },
  },
  Mutation: {
    createUnit: (_, { input }) => {
      return createUnit(input as IUnit);
    },
  },
};
