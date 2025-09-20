export interface Plan {
  _id: string;
  title: string;
  price: number;
  billingCycle: string;
  description: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AirlineVerification {
  _id: string;
  user: string;
  plan: Plan;
  designation: string;
  employeeId: string;
  images: string[];
  paymentStatus: string;   // e.g. "paid"
  paymentMethod: string;   // e.g. "card"
}

export interface IUser {
  _id: string;
  name: string;
  profilePic: string | null;
  isVerifiedHost: boolean;
  email: string;
  contact: string;
  address: string;
  connectedAccountId: string | null;
  stripeConnectedLink: string | null;
  dateOfBirth: string;      // ISO Date string
  images: string[];
  status: string;           // e.g. "active"
  role: string;             // e.g. "host"
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  airlineVerification: AirlineVerification;
  id: string;
}
