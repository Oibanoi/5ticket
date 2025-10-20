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

// Payment types
export type PaymentMethod =
  | "qr_bank"
  | "atm_domestic"
  | "credit_debit_domestic"
  | "credit_debit_international"
  | "payx_qr"
  | "payx_atm"
  | "payx_international";

// Checkout Status types
export type TransactionStatus = "success" | "pending" | "failed";

export interface TicketInfo {
  quantity: number;
  ticketType: string;
  price: number;
}

export interface EventInfo {
  title: string;
  date: string;
  location: string;
  imageUrl?: string;
}

export interface PurchaseInfo {
  fullName: string;
  birthDate: string;
  idNumber: string;
}

export interface TransactionInfo {
  subtotal: number;
  discount: number;
  total: number;
  status: TransactionStatus;
  transactionTime: string;
  transactionId: string;
  paymentMethod: string;
}

// Common UI types
export interface InfoRow {
  label: string;
  value: string | React.ReactNode;
}
