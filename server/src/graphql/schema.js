import { gql } from 'apollo-server';

export default gql`
type Contact {
  id: ID
  name: String
  avatar: String
}

type User {
  name: String
  avatar: String
  contacts: [Contact]
}

type Query {
  contacts: [Contact]
}
`