import { gql } from 'apollo-server';

export default gql`
type Contact {
  id: Int!
  email: String!
}

type User {
  id: Int!
  email: String!
  contacts: [Contact]
}

type Query {
  getUserContacts(id: Int!): [Contact!]
}

type AuthResponse {
  success: Boolean!
  token: String
}


type Mutation {
  login(email: String!, password: String!): AuthResponse!
  register(email: String!, password: String!): AuthResponse!
}

`;
