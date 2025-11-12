// Add onlyImage property to MainEvent for UI purposes
export interface MainEvent {
  id?: number;
  name?: string;
  sponsored_brands?: string;
  status?: string;
  event_type?: string;
  hotline?: string;
  location?: string;
  province?: string;
  ward?: string;
  prefix?: string;
  slug?: string;
  group_buy_enable?: boolean;
  start_date?: string;
  end_date?: string;
  registration_change_start_date?: string;
  registration_change_end_date?: string;
  transfer_start_date?: string;
  transfer_end_date?: string;
  checkin_start_date?: string;
  checkin_end_date?: string;
  payment_options?: string;
  logo_url?: string;
  wall_paper_url?: string;
  email_image_url?: string;
  organizational_units?: string;
  description?: string;
  base_price?: number;
  customize_fields?: Record<string, unknown> | null;
  blacklist?: unknown[];
  max_queue_length?: number;
  session_max_wait_time_in_minutes?: number;
  payment_max_wait_time_in_minutes?: number;
  created_on?: string;
  modified_on?: string;
  is_enable?: boolean;
  onlyImage?: boolean; // UI property
}

export type EventDetail = MainEvent & {
  gallery?: string[];
  event_days: EventDay[];
};

export interface MainEventListResponse {
  content: MainEvent[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

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
