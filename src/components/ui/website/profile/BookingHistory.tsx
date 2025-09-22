import ProfileHistoryCard from '@/components/shared/ProfileHistoryCard';
import { myFetch } from '@/helpers/myFetch';
import { IBooking } from '@/types/hotel/booking';
import { Pagination } from 'antd';
import React, { useEffect } from 'react';
type propertyType = {
    name: string;
    roomType: string;
    location: string;
    checkIn: string;
    checkOut: string;
    price: string;
    image: string;
    key: string
}

const BookingHistory = () => {
    const [data, setData] = React.useState<propertyType[]  >([])
    const [pagination, setPagination] = React.useState({
        total: 0,
        limit: 10,
        page: 1,
        totalPage: 0,
    });
    const [page, setPage] = React.useState(1);
    useEffect(() => {
        myFetch(`/booking/my-booking?page=${page}`, {
            method: "GET",
            cache: "no-cache",
        }).then((res) => {
            const bookings: IBooking[] = res?.data?.result || []
            const bookingData = bookings?.map((value) => ({
                name: value?.hotel?.name,
                roomType: value?.hotel?.roomType,
                location: value?.hotel?.address,
                checkIn: value?.checkInDate,    
                checkOut: value?.checkOutDate,
                price: value?.hotel?.roomPrice,
                image: value?.hotel?.image[0],
                key: value?._id,
            }))
            setPagination(res?.data?.pagination)
            setData(bookingData as any as propertyType[])
        })
    }, [])

    return (
        <div  className='p-7'>
            <h2 className='lg:text-2xl text-xl font-medium pb-5' >Booking History</h2> 

            <div className=' flex flex-col gap-5'> 
                {
                    data?.map((value, index) => (
                        <ProfileHistoryCard key={index} property={value} />
                    ))
                }
            </div>
            <Pagination align="center" className="mt-8" defaultCurrent={1} total={pagination.total} showSizeChanger={false} onChange={page => setPage(page)} pageSize={pagination.limit} style={{ textAlign: 'center', marginTop: '20px' }} />
        </div>
    );
};

export default BookingHistory;