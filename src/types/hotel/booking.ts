import { IHotel } from "./hotel";

interface HotelInfo {
  _id: string;
  name: string;
  roomPrice: number;
}

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
}

export interface IBooking {
  _id: string;
  bookingId: string;
  checkInDate: string;   // ISO date string
  checkOutDate: string;  // ISO date string
  status: "pending" | "confirmed" | "cancelled"; // you can extend more
  paymentMethod: "card" | "cash" | "paypal";     // extend if needed
  paymentStatus: "paid" | "unpaid" | "refunded"; // extend if needed
  createdAt: string;
  updatedAt: string;
  hotel: IHotel;
  user: UserInfo;
}
