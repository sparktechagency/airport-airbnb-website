const STORAGE_KEY = "myAppData";

export interface AppData {
  email?: string;
  plan?: string;
  designation?: string;
  employeeId?: string;
  image?: string | null; 
  name?: string | null;
}


export const AppDataGroups = {
  subscription: ["email", "plan", "designation", "employeeId", "image"] as (keyof AppData)[],
  profile: ["email", "designation", "employeeId"] as (keyof AppData)[],
  booking: ["employeeId", "name"] as (keyof AppData)[],
};


export const getAppData = (): AppData => {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};


export const getAppDataByGroup = (group: (keyof AppData)[]): Partial<AppData> => {
  const appData = getAppData();
  const filtered: Partial<AppData> = {};
  group.forEach((key) => {
    if (appData[key] !== undefined && appData[key] !== null) {
      filtered[key] = appData[key];
    }
  });
  return filtered;
};


export const updateAppData = (newData: Partial<AppData>): void => {
  if (typeof window === "undefined") return;
  const existing = getAppData();
  const updated = { ...existing, ...newData };
  if (JSON.stringify(existing) !== JSON.stringify(updated)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};


export const clearAppData = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
