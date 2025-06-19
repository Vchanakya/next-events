export interface Attendee {
  id: string;
  name: string;
  email?: string | null;
  eventId: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  attendees: AttendeeConnection;
  attendeeCount: number;
  createdAt: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
  totalCount: number;
}

export type EventConnection = Connection<Event>;
export type AttendeeConnection = Connection<Attendee>;

export interface GetEventsData {
  events: EventConnection;
}

export interface GetEventData {
  event: Event | null;
}

export interface CreateEventData {
  createEvent: Event;
}

export interface AddAttendeeData {
  addAttendee: Attendee;
}

export interface RemoveAttendeeData {
  removeAttendee: Event;
}

export interface EventOrderBy {
  field: "DATE" | "TITLE" | "CREATED_AT";
  direction: "ASC" | "DESC";
}
