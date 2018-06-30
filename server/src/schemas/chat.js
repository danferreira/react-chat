import { gql } from 'apollo-server';

export default gql`
type Message {
    id: Int!
    senderId: Int!
    receiverId: Int!
    content: String!
    created_at: String!
}

type CreateMessageResponse {
    success: Boolean!
}

type Query {
    fetchMessages(contactId: Int!, cursor: Int): [Message!] 
}

type Mutation {
    createMessage(receiverId: Int!, content: String!): CreateMessageResponse! 
}

type Subscription {
    newMessage(contactId: Int!): Message
}

`;

