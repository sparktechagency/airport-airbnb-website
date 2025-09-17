const STORAGE_KEY = "myAppData";

export interface FilterData {
  email?: string;
  plan?: string;
  designation?: string;
  employeeId?: string;
  image?: string | null; 
  name?: string | null; 
  location?: string | null; 
  checkInDate?: string | null;
  price ?: number|null  
  roomType ?: string |null
  lng ?: number |null
  lat ?: number |null 
}

type FiltersByPage = Record<string, FilterData>; // e.g. { home: {...}, rooms: {...} }

const getAllFilters = (): FiltersByPage => {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const getFilters = (page: string): FilterData => {
  const allFilters = getAllFilters();
  return allFilters[page] || {};
};

export const updateFilters = (page: string, newFilters: Partial<FilterData>) => {
  if (typeof window === "undefined") return;
  const allFilters = getAllFilters();
  const existing = allFilters[page] || {};
  const updated = { ...existing, ...newFilters };
  allFilters[page] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allFilters));
};

export const clearFilters = (page?: string) => {
  if (typeof window === "undefined") return;
  if (page) {
    const allFilters = getAllFilters();
    delete allFilters[page];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allFilters));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};
