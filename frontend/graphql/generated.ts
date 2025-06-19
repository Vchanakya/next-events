import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Attendee = {
  __typename?: 'Attendee';
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  eventId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rsvp: Scalars['String']['output'];
};

export type AttendeeConnection = {
  __typename?: 'AttendeeConnection';
  edges: Array<AttendeeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type AttendeeEdge = {
  __typename?: 'AttendeeEdge';
  cursor: Scalars['String']['output'];
  node: Attendee;
};

export type Event = {
  __typename?: 'Event';
  attendeeCount: Scalars['Int']['output'];
  attendees: AttendeeConnection;
  createdAt: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};


export type EventAttendeesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges: Array<EventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export type EventOrderBy = {
  direction: OrderDirection;
  field: EventOrderByField;
};

export enum EventOrderByField {
  CreatedAt = 'CREATED_AT',
  Date = 'DATE',
  Title = 'TITLE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAttendee: Attendee;
  createEvent: Event;
  removeAttendee: Event;
};


export type MutationAddAttendeeArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  rsvp: Scalars['String']['input'];
};


export type MutationCreateEventArgs = {
  date: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationRemoveAttendeeArgs = {
  attendeeId: Scalars['ID']['input'];
  eventId: Scalars['ID']['input'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  event?: Maybe<Event>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  events: EventConnection;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EventOrderBy>;
};

export type AddAttendeeMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  rsvp: Scalars['String']['input'];
}>;


export type AddAttendeeMutation = { __typename?: 'Mutation', addAttendee: { __typename?: 'Attendee', id: string, name: string, email?: string | null, rsvp: string, eventId: string, createdAt: string } };

export type CreateEventMutationVariables = Exact<{
  title: Scalars['String']['input'];
  date: Scalars['String']['input'];
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: string, title: string, date: string, attendeeCount: number, createdAt: string } };

export type GetEventQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  attendeesFirst?: InputMaybe<Scalars['Int']['input']>;
  attendeesAfter?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, title: string, date: string, attendeeCount: number, createdAt: string, attendees: { __typename?: 'AttendeeConnection', totalCount: number, edges: Array<{ __typename?: 'AttendeeEdge', cursor: string, node: { __typename?: 'Attendee', id: string, name: string, email?: string | null, rsvp: string } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } } | null };

export type GetEventsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<EventOrderBy>;
}>;


export type GetEventsQuery = { __typename?: 'Query', events: { __typename?: 'EventConnection', totalCount: number, edges: Array<{ __typename?: 'EventEdge', cursor: string, node: { __typename?: 'Event', id: string, title: string, date: string, attendeeCount: number, createdAt: string } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type RemoveAttendeeMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  attendeeId: Scalars['ID']['input'];
}>;


export type RemoveAttendeeMutation = { __typename?: 'Mutation', removeAttendee: { __typename?: 'Event', id: string, title: string, date: string, attendeeCount: number, createdAt: string, attendees: { __typename?: 'AttendeeConnection', totalCount: number, edges: Array<{ __typename?: 'AttendeeEdge', cursor: string, node: { __typename?: 'Attendee', id: string, name: string, email?: string | null, rsvp: string } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } } };


export const AddAttendeeDocument = gql`
    mutation AddAttendee($eventId: ID!, $name: String!, $email: String, $rsvp: String!) {
  addAttendee(eventId: $eventId, name: $name, email: $email, rsvp: $rsvp) {
    id
    name
    email
    rsvp
    eventId
    createdAt
  }
}
    `;
export type AddAttendeeMutationFn = Apollo.MutationFunction<AddAttendeeMutation, AddAttendeeMutationVariables>;

/**
 * __useAddAttendeeMutation__
 *
 * To run a mutation, you first call `useAddAttendeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAttendeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAttendeeMutation, { data, loading, error }] = useAddAttendeeMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      rsvp: // value for 'rsvp'
 *   },
 * });
 */
export function useAddAttendeeMutation(baseOptions?: Apollo.MutationHookOptions<AddAttendeeMutation, AddAttendeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAttendeeMutation, AddAttendeeMutationVariables>(AddAttendeeDocument, options);
      }
export type AddAttendeeMutationHookResult = ReturnType<typeof useAddAttendeeMutation>;
export type AddAttendeeMutationResult = Apollo.MutationResult<AddAttendeeMutation>;
export type AddAttendeeMutationOptions = Apollo.BaseMutationOptions<AddAttendeeMutation, AddAttendeeMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($title: String!, $date: String!) {
  createEvent(title: $title, date: $date) {
    id
    title
    date
    attendeeCount
    createdAt
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      title: // value for 'title'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const GetEventDocument = gql`
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

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *      attendeesFirst: // value for 'attendeesFirst'
 *      attendeesAfter: // value for 'attendeesAfter'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables> & ({ variables: GetEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export function useGetEventSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventSuspenseQueryHookResult = ReturnType<typeof useGetEventSuspenseQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const GetEventsDocument = gql`
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

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export function useGetEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsSuspenseQueryHookResult = ReturnType<typeof useGetEventsSuspenseQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const RemoveAttendeeDocument = gql`
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
export type RemoveAttendeeMutationFn = Apollo.MutationFunction<RemoveAttendeeMutation, RemoveAttendeeMutationVariables>;

/**
 * __useRemoveAttendeeMutation__
 *
 * To run a mutation, you first call `useRemoveAttendeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAttendeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAttendeeMutation, { data, loading, error }] = useRemoveAttendeeMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      attendeeId: // value for 'attendeeId'
 *   },
 * });
 */
export function useRemoveAttendeeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAttendeeMutation, RemoveAttendeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAttendeeMutation, RemoveAttendeeMutationVariables>(RemoveAttendeeDocument, options);
      }
export type RemoveAttendeeMutationHookResult = ReturnType<typeof useRemoveAttendeeMutation>;
export type RemoveAttendeeMutationResult = Apollo.MutationResult<RemoveAttendeeMutation>;
export type RemoveAttendeeMutationOptions = Apollo.BaseMutationOptions<RemoveAttendeeMutation, RemoveAttendeeMutationVariables>;