export type Event = {
  id: string;
  title: string;
  date: string;
  attendees: Attendee[];
  tags: Tag[];
};

export type Attendee = {
  id: string;
  name: string;
  email?: string;
  rsvp: string;
};

export type Tag = {
  id: string;
  label: string;
};
