"use server";
import { cookies } from "next/headers";

export const getCookie = (name: string) => {
   const cookieStore = new Promise((resolve) => {
      const cookieValue = cookies().get(name)?.value || null;
      resolve(cookieValue);
   });
   return cookieStore;
}
