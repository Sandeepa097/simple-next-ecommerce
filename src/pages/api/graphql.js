const { ApolloServer } = require('apollo-server-micro');
const typeDefs = require('../../../server/graphql/schema');
const resolvers = require('../../../server/graphql/resolvers');
const micro_cors = require('micro-cors');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const cors = micro_cors({
  origin: 'https://studio.apollographql.com',
  allowMethods: ['GET', 'POST'],
  allowHeaders: [
    'Access-Control-Allow-Credentials',
    'true',
    'Content-Type',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
  ],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});
