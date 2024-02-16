const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Cattle {
    _id: ID!
    name: String!
    dam: String
    sire: String
  }

  type Query {
    cattle: [Cattle]
  }
`;

module.exports = typeDefs;
