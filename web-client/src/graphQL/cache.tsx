import { InMemoryCache, makeVar } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        userAuth: {
          read() {
            return userAuth();
          },
        },
        userRole: {
          read() {
            return userRole();
          },
        },
        openSuccessMessage: {
          read() {
            return openSuccessMessage();
          },
        },
        openErrorMessage: {
          read() {
            return openErrorMessage();
          },
        },
      },
    },
  },
});

export const openSuccessMessage = makeVar<boolean>(false);
export const openErrorMessage = makeVar<boolean>(false);
export const userAuth = makeVar<boolean>(false);
export const userRole = makeVar<string>(null);
