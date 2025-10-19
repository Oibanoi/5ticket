export type Event = {
  id: number;
  title: string;
  image: string;
  date: string;
  price?: number;
  url?: string;
  onlyImage?: boolean;
};

export type EventDetail = Event & {
  location: string;
  description: string;
  gallery?: string[];
  eventDays: EventDay[];
};

export type EventDay = {
  id: string;
  date: string;
  displayDate: string;
  tickets: Ticket[];
};

export type Ticket = {
  id: string;
  name: string;
  price: number;
  available: boolean;
  description?: string;
};
