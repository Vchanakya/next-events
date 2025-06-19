import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $date: String!) {
    createEvent(title: $title, date: $date) {
      id
      title
      date
    }
  }
`;
