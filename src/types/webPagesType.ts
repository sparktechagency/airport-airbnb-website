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