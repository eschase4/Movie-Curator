import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { authMiddleware } from './utils/auth';
import { typeDefs, resolvers } from './schemas';
import { createConnection } from 'typeorm';

const PORT = process.env.PORT || 3001;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

const startApolloServer = async () => {
  await server.start();

  server.applyMiddleware({ app });

  await createConnection();

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startApolloServer();
