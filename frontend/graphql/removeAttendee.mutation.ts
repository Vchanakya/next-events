import { gql } from "@apollo/client";

export const REMOVE_ATTENDEE = gql`
  mutation RemoveAttendee($eventId: ID!, $attendeeId: ID!) {
    removeAttendee(eventId: $eventId, attendeeId: $attendeeId) {
      id
      title
      date
      attendees(first: 10) {
        edges {
          node {
            id
            name
            email
          }
        }
      }
      attendeeCount
    }
  }
`;
