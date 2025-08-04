import ProfileHistoryCard from '@/components/shared/ProfileHistoryCard';
import { historyData } from '@/constants/Profile/HistoryData';
import { useRouter } from 'next/navigation';
import React from 'react';

const ListingHistory = () => { 
const router = useRouter()

    return (
        <div className='p-7'> 

            <div className=' flex items-center justify-between pb-5 '>
                <h2 className=' text-2xl font-medium ' >Listing History</h2>
                <button className='border border-primary text-primary px-3 py-2 text-sm rounded font-medium' onClick={()=>router.push("/property-info")}> + Add Property</button>
            </div>

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