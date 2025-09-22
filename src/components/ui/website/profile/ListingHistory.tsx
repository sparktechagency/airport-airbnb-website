import ProfileHistoryCard from '@/components/shared/ProfileHistoryCard';
import { myFetch } from '@/helpers/myFetch';
import { IHotel } from '@/types/hotel/hotel';
import { Pagination as IPagination } from '@/types/webPagesType';
import { Pagination } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
type propertyType = {
    name: string;
    roomType: string;
    location: string;
    checkIn: string;
    checkOut: string;
    price: string;
    image: string;
    key: string;
}
const ListingHistory = () => { 
const router = useRouter()

    const [propertyList, setPropertyList] = React.useState<propertyType[]>([])
    const [page, setPage] = React.useState(1)
    const [pagination, setPagination] = React.useState<IPagination>({
        total: 0,
        limit: 10,
        page: 1,
        totalPage: 0
    })
    useEffect(() => {
        myFetch(`/hotel/listing-history?page=${page}`, {
            method: "GET",
            cache: "no-cache",
        }).then((res) => {
            const data:IHotel[] = res?.data?.result ||[]
            
            setPagination(res?.data?.pagination)
            const propertyData = data?.map((value) => ({
                name: value?.name,
                roomType: value?.roomType,
                location: value?.address,
                checkIn: value?.roomClosureDates[0],
                checkOut: value?.roomClosureDates[1],
                price: value?.roomPrice,
                image: value?.image[0],
                key: value?._id,
            }))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setPropertyList(propertyData as any )
        })
    },[page])

    // console.log(propertyList);
    

    return (
        <div className='p-7'> 

            <div className=' flex items-center justify-between pb-5 '>
                <h2 className='lg:text-2xl text-xl font-medium ' >Listing History</h2>
                <button className='border border-primary text-primary px-3 py-2 text-sm rounded font-medium' onClick={() => router.push("/property-info")}> + Add Property</button>
            </div>

            <div className=' flex flex-col gap-5'>
                {
                    propertyList?.map((value, index) => (
                        <ProfileHistoryCard key={index} property={value} />
                    ))
                }
            </div> 
            <Pagination 
                current={pagination.page}
                total={pagination.total}
                onChange={(page) => setPage(page)}
                showSizeChanger={false}
                style={{ textAlign: 'center', marginTop: '20px' }}
            />
        </div>
    );
};

export default ListingHistory;