import React, { useEffect, useState } from "react";
import ServiceBanner from "./ServiceBanner";
import MainAvailableRooms from "./AvailableRooms/MainAvailableRooms";
import { myFetch } from "@/helpers/myFetch";
import getProfile from "@/helpers/getProfile";
// import { getFilters } from "@/helpers/storageHelper";
import { HotelsResponse } from "@/types/webPagesType";
export interface IsearchParams {
  checkInDate: string; // ISO date string, e.g. "2025-09-03T18:00:00.000Z"
  price: number;       // numeric price
  roomType: "single" | "double" | "suite"; // restrict to known room types
  location: string;    // human-readable location
  lat: number;         // latitude
  lng: number;         // longitude
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

//   console.log("Fetching hotels with params:", params.toString());
  
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
