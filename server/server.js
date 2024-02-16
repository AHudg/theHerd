const express = require("express");
const path = require("path");

// Initialize express application
const app = express();

// Import database connection
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;

// graphql dependency - library that implements core GraphQL parsing and execusion algorithms
// @apollo/server - main library for Apollo Server that knows how to turn HTTP request/responses into GraphQL operations
const { ApolloServer } = require("@apollo/server");
// const { expressMiddleware } = reqiure("@apollo/server/express4");

// Import the two parts of GraphQL schema
const { typeDefs, resolvers } = require("./schema");

// Initialize Apollo Server instance using schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo Server and configure
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  //   app.use("/graphql", expressMiddleware(server, {}));

  // Server static assets when in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}/graphql to query the database.`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();
