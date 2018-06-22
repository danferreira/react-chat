import { gql } from 'apollo-server';

export default gql`
type Contact {
  id: Int!
  name: String!
  lastMessage: String
}

type User {
  id: Int!
  email: String!
  contacts: [Contact]
}

type Query {
  getUserContacts: [Contact!]
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
