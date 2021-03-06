import { gql } from 'apollo-server';

export default gql`
type Contact {
  id: Int!
  name: String!
  email: String!
  lastMessage: String
}

type User {
  id: Int!
  name: String!
  email: String!,
}

type Query {
  getUser(userId: Int!): User
  getAllUsers: [User]
  getUserContacts: [Contact]
}

type AuthResponse {
  success: Boolean!
  user: User!
  token: String
}

type Mutation {
  login(email: String!, password: String!): AuthResponse!
  register(name: String!, email: String!, password: String!): AuthResponse!
}

`;
