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
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rsvp: Scalars['String']['output'];
};

export type Event = {
  __typename?: 'Event';
  attendees: Array<Attendee>;
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAttendee: Attendee;
  createEvent: Event;
  removeAttendee: Scalars['Boolean']['output'];
};


export type MutationAddAttendeeArgs = {
  email: Scalars['String']['input'];
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

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  events: Array<Event>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
};

export type AddAttendeeMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  rsvp: Scalars['String']['input'];
}>;


export type AddAttendeeMutation = { __typename?: 'Mutation', addAttendee: { __typename?: 'Attendee', id: string, name: string, email: string, rsvp: string } };

export type CreateEventMutationVariables = Exact<{
  title: Scalars['String']['input'];
  date: Scalars['String']['input'];
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: string, title: string, date: string } };

export type GetEventByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEventByIdQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, title: string, date: string, attendees: Array<{ __typename?: 'Attendee', id: string, name: string, email: string, rsvp: string }> } | null };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: string, title: string, date: string, attendees: Array<{ __typename?: 'Attendee', id: string }> }> };

export type RemoveAttendeeMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  attendeeId: Scalars['ID']['input'];
}>;


export type RemoveAttendeeMutation = { __typename?: 'Mutation', removeAttendee: boolean };


export const AddAttendeeDocument = gql`
    mutation AddAttendee($eventId: ID!, $name: String!, $email: String!, $rsvp: String!) {
  addAttendee(eventId: $eventId, name: $name, email: $email, rsvp: $rsvp) {
    id
    name
    email
    rsvp
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
export const GetEventByIdDocument = gql`
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

/**
 * __useGetEventByIdQuery__
 *
 * To run a query within a React component, call `useGetEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventByIdQuery(baseOptions: Apollo.QueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables> & ({ variables: GetEventByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, options);
      }
export function useGetEventByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, options);
        }
export function useGetEventByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, options);
        }
export type GetEventByIdQueryHookResult = ReturnType<typeof useGetEventByIdQuery>;
export type GetEventByIdLazyQueryHookResult = ReturnType<typeof useGetEventByIdLazyQuery>;
export type GetEventByIdSuspenseQueryHookResult = ReturnType<typeof useGetEventByIdSuspenseQuery>;
export type GetEventByIdQueryResult = Apollo.QueryResult<GetEventByIdQuery, GetEventByIdQueryVariables>;
export const GetEventsDocument = gql`
    query GetEvents {
  events {
    id
    title
    date
    attendees {
      id
    }
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
  removeAttendee(eventId: $eventId, attendeeId: $attendeeId)
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