import { gql } from "@apollo/client";

export const ADD_ATTENDEE = gql`
  mutation AddAttendee($eventId: ID!, $name: String!, $email: String) {
    addAttendee(eventId: $eventId, name: $name, email: $email) {
      id
      name
      email
      eventId
      createdAt
    }
  }
`;
