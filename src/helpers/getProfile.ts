"use server";

import { IUser } from "@/types/profile/userType";
import { cookies } from "next/headers";

const getProfile = async () => {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.BASE_URL}/user/me`, {
        next: {
            tags: ["user-profile"],
        },
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });

    const {data} = await res?.json() 
    return data;

}

export default getProfile;