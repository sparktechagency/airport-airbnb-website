import React from 'react';
import ServiceBanner from './ServiceBanner';
import MainAvailableRooms from './AvailableRooms/MainAvailableRooms';
import { myFetch } from '@/helpers/myFetch';
import getProfile from '@/helpers/getProfile';

const Services = async () => {
    const profile = await getProfile()

    const params = new URLSearchParams({
        fields: "name,image,address,roomType,totalReviews,avgRating,roomPrice,location,isFavorite",
        userId: profile?._id
    });

    const res = await myFetch(`/hotel?${params.toString()}`, {
        tags: ["hotels"],
        method: "GET", 
    });

    return (
        <div>
            <ServiceBanner />
            <MainAvailableRooms allRooms={res?.data} />
        </div>
    );
};

export default Services;