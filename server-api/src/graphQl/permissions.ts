import { not, or, rule, shield } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
  console.log(ctx);
  return ctx.user !== null;
});

export const permissions = shield({
  Query: {
    w40kUnits: or(isAuthenticated, not(isAuthenticated)),
    w40kUnit: or(isAuthenticated, not(isAuthenticated)),
    searchW40kUnitsByName: or(isAuthenticated, not(isAuthenticated)),
  },
  Mutation: {
    createW40kUnit: isAuthenticated,
    updateW40kUnit: isAuthenticated,
    removeW40kUnits: isAuthenticated,
  },
});
