import { gql } from "@apollo/client";

export const REMOVE_ATTENDEE = gql`
  mutation RemoveAttendee($eventId: ID!, $attendeeId: ID!) {
    removeAttendee(eventId: $eventId, attendeeId: $attendeeId) {
      id
      title
      date
      attendees(first: 20) {
        edges {
          cursor
          node {
            id
            name
            email
            rsvp
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
      attendeeCount
      createdAt
    }
  }
`;
