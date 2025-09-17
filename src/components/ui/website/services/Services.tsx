"use client"; // <-- mark as client component

import React, { useEffect, useState } from 'react';
import ServiceBanner from './ServiceBanner';
import MainAvailableRooms from './AvailableRooms/MainAvailableRooms';
import { myFetch } from '@/helpers/myFetch';
import getProfile from '@/helpers/getProfile';
import { getFilters } from '@/helpers/storageHelper';
import { HotelsResponse } from '@/types/webPagesType';

const Services = () => {
    const [rooms, setRooms] = useState<HotelsResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const profileData = await getProfile();

            const filters = getFilters("roomFilter");

            const params = new URLSearchParams({
                fields: "name,image,address,roomType,totalReviews,avgRating,roomPrice,location,isFavorite",
                ...(profileData?._id ? { userId: profileData._id } : {}),
                ...(filters?.checkInDate ? { checkInDate: filters.checkInDate } : {}),
                ...(filters?.price ? { roomPrice: String(filters.price) } : {}),
                ...(filters?.roomType ? { roomType: filters.roomType } : {}),
                ...(filters?.lat ? { lat: String(filters.lat) } : {}),
                ...(filters?.lng ? { lng: String(filters.lng) } : {}),
            });

            try {
                const res = await myFetch(`/hotel?${params.toString()}`, {
                    tags: ["hotels"],
                    method: "GET",
                    cache: "no-store"
                });
                setRooms(res?.data || []);
                console.log(`/hotel?${params.toString()}`);
            } catch (err) {
                console.error(err);
                setRooms(undefined);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div>
            <ServiceBanner />
            {loading ? (
                <p>Loading rooms...</p>
            ) : (
                <MainAvailableRooms allRooms={rooms} />
            )}
        </div>
    );
};

export default Services;
