import { gql } from "@apollo/client";

export const GET_EVENT_BY_ID = gql`
  query GetEventById($id: ID!) {
    event(id: $id) {
      id
      title
      date
      attendees {
        id
        name
        email
        rsvp
      }
    }
  }
`;
