import React from 'react';
import ServiceBanner from './ServiceBanner';
import MainAvailableRooms from './AvailableRooms/MainAvailableRooms';

const Services = () => {
    return (
        <div>
            <ServiceBanner /> 
            <MainAvailableRooms />
        </div>
    );
};

export default Services;