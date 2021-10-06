import { rule } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
  return ctx.user !== null;
});

export const isAdmin = rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
  return ctx.user?.role === 'admin' ?? false;
});

export const isContributor = rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
  return ctx.user?.role === 'contributor' ?? false;
});
