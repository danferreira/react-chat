import { gql } from 'apollo-server';

export default gql`
type Contact {
  id: Int!
  name: String!
  lastMessage: String
}

type User {
  id: Int!
  name: String!
}

type Query {
  getUserContacts: [Contact!]
}

type AuthResponse {
  success: Boolean!
  user: User!
  token: String
}

type Mutation {
  login(email: String!, password: String!): AuthResponse!
  register(email: String!, password: String!): AuthResponse!
}

`;
