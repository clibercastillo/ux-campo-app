export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Booking {
  id: number;
  stadiumId: number;
  userEmail: string;
  bookingDate: string; // yyyy-MM-dd
  startTime: string;   // HH:mm:ss
  endTime: string;     // HH:mm:ss
  totalPrice: number;
  status: BookingStatus;
}

export interface BookingRequest {
  stadiumId: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
}
