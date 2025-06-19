import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query GetEvents($first: Int, $after: String, $orderBy: EventOrderBy) {
    events(first: $first, after: $after, orderBy: $orderBy) {
      edges {
        cursor
        node {
          id
          title
          date
          attendeeCount
          createdAt
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
  }
`;
