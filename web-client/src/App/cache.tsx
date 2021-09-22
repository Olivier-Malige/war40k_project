import { InMemoryCache, makeVar } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
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
