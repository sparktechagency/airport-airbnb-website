import ProfileHistoryCard from '@/components/shared/ProfileHistoryCard';
import { historyData } from '@/constants/Profile/HistoryData';
import React from 'react';

const ListingHistory = () => {
    return (
        <div>
            <h2 className=' text-2xl font-medium pb-5' >Listing History</h2> 

            <div className=' flex flex-col gap-5'> 
                {
                    historyData?.map((value, index) => (
                        <ProfileHistoryCard key={index} property={value} />
                    ))
                }
            </div>
        </div>
    );
};

export default ListingHistory;