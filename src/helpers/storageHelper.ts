const STORAGE_KEY = "myAppData";

export interface AppData {
  email?: string;
  plan?: string;
  designation?: string;
  employeeId?: string;
  image?: string | null;
}

//  Get the object from localStorage
export const getAppData = (): AppData => {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

//  Update one or more fields
export const updateAppData = (newData: Partial<AppData>): void => {
  if (typeof window === "undefined") return;
  const existing = getAppData();
  const updated = { ...existing, ...newData };
  if (JSON.stringify(existing) !== JSON.stringify(updated)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};

//  Clear data 
export const clearAppData = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};