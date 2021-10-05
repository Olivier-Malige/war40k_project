import { rule } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
  console.log('isAuthenticated');
  console.log(ctx.user);
  return ctx.user !== null;
});

export const isAdmin = rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
  console.log('admin');
  console.log(ctx.user);
  console.log(ctx.user?.role === 'admin' ?? false);
  return ctx.user?.role === 'admin' ?? false;
});

export const isContributor = rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
  console.log('contributor');
  console.log(ctx.user);
  return ctx.user?.role === 'contributor' ?? false;
});
