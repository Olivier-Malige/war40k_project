import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { merge } from 'lodash';

import {
  typeDefs as Users,
  resolvers as usersResolvers,
  permissions as usersPermissions,
} from './graphQl/schemas/users';

import {
  typeDefs as W40kUnits,
  resolvers as w40kUnitsResolvers,
  permissions as w40kUnitsPermissions,
} from './graphQl/schemas/w40kUnits';

import conf from './environment';
const env = conf[process.env.NODE_ENV as 'development' | 'production'];
import './database';
import { verifyUserToken } from './firebase/users';
import { shield } from 'graphql-shield';

const schema = makeExecutableSchema({
  typeDefs: [Users, W40kUnits],
  resolvers: merge(usersResolvers, w40kUnitsResolvers),
});

const permissions = shield(merge(usersPermissions, w40kUnitsPermissions));

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await verifyUserToken(token);
    return { user };
  },
});

server.listen({ port: env.port }, () => {
  console.log(`🚀  Server ready at ${env.port}`);
});
