import React from "react";
import ServiceBanner from "./ServiceBanner";
import MainAvailableRooms from "./AvailableRooms/MainAvailableRooms";
import { myFetch } from "@/helpers/myFetch";
import getProfile from "@/helpers/getProfile";

import { HotelsResponse } from "@/types/webPagesType";
export interface IsearchParams {
  checkInDate: string; 
  price: number;     
  roomType: "single" | "double" | "suite"; 
  location: string;   
  lat: number;     
  lng: number;     
}

const Services = async ({searchParams}:{searchParams:IsearchParams}) => {
  const profileData = await getProfile();

  const filters = searchParams || {}

  const params = new URLSearchParams({
    fields:
      "name,image,address,roomType,totalReviews,avgRating,roomPrice,location,isFavorite",
    ...(profileData?._id ? { userId: profileData._id } : {}),
    ...(filters?.checkInDate ? { checkInDate: filters.checkInDate } : {}),
    ...(filters?.price ? { roomPrice: String(filters.price) } : {}),
    ...(filters?.roomType ? { roomType: filters.roomType } : {}),
    ...(filters?.lat ? { lat: String(filters.lat) } : {}),
    ...(filters?.lng ? { lng: String(filters.lng) } : {}),
  });

  
  const res = await myFetch(`/hotel?${params.toString()}`, {
    tags: ["hotels"],
    method: "GET",
    cache: "no-store",
  });

  const rooms: HotelsResponse = res?.data;

  const pagination = res?.data?.pagination;

  return (
    <div>
      <ServiceBanner />

      <MainAvailableRooms allRooms={rooms} pagination={pagination} />
    </div>
  );
};

export default Services;
