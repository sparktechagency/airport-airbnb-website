export interface Pagination {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

export interface Plan {
  _id: string;
  title: string;
  price: number;
  billingCycle: "add-on" | "annual" | "one-time";
  description: string;
  features: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlansResponse {
  pagination: Pagination;
  result: Plan[];

}

export interface HotelRoom {
  _id: string;
  name: string;
  roomPrice: number;
  roomType: string;
  address: string;
  image: string[];
  totalReviews: number;
  avgRating: number;  
  isFavorite: boolean;
  location?:{
    type:string;
    coordinates:string[]
  }
}

export interface HotelsResponse {
  result: HotelRoom[]
  pagination: { total: number, limit: number, page: number, totalPage: number }
} 

export interface allRoomsType {
    allRooms: HotelsResponse
}

