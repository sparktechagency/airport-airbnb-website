export interface IHotel {
  _id: string;
  hostId: string;
  status: "draft" | "published" | "inactive"; // possible values
  name: string;
  roomPrice: number;
  description: string;
  roomType: "single" | "double" | "suite" | string; // expand as needed
  address: string;
  image: string[];
  facilities: string[]; // facility IDs
  roomClosureDates: string[]; // ISO date strings
  hotelRules: HotelRule[];
  utilityBill: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  location: Location;
}

export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface HotelRule {
  _id: string;
  title: string;
  description: string;
}

export interface IFacility {
  _id: string;
  name: string;
  logo: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

