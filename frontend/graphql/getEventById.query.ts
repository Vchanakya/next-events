import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query GetEvent($id: ID!, $attendeesFirst: Int, $attendeesAfter: String) {
    event(id: $id) {
      id
      title
      date
      attendees(first: $attendeesFirst, after: $attendeesAfter) {
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
