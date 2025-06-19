import { gql } from "@apollo/client";

export const ADD_ATTENDEE = gql`
  mutation AddAttendee(
    $eventId: ID!
    $name: String!
    $email: String!
    $rsvp: String!
  ) {
    addAttendee(eventId: $eventId, name: $name, email: $email, rsvp: $rsvp) {
      id
      name
      email
      rsvp
    }
  }
`;
