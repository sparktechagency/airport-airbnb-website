import React from 'react';
import SingleCard from './SingleCard';
import { airlines, hotels, rentalCars, rideshare } from '@/constants/AirInfo/AirInfo';

const AirportInfo = () => {
    return (
        <div className='container py-14'>

            {/* Major Airlines  */}
            <div>
                <div className=' flex items-center gap-2 pb-5 '>
                    <img src="/planeSlice.svg" alt="" className=' w-6 h-6' />
                    <p className=' text-[24px] font-medium  '> Major Airlines </p>
                </div>

                <div className=' grid  lg:grid-cols-5 md:grid-cols-4 gris-cols-3 gap-4 '>
                    {
                        airlines?.map((values: { name: string; phone: string; website: string }, index: number) => (
                            <div key={index}>
                                <SingleCard items={values} />
                            </div>
                        ))
                    }
                </div>
            </div>


            {/* Major Hotels  */}
            <div>
                <div className=' flex items-center gap-2 py-5 mt-10 '>
                    <img src="/planeSlice.svg" alt="" className=' w-6 h-6' />
                    <p className=' text-[24px] font-medium  '> Major Hotels </p>
                </div>

                <div className=' grid  lg:grid-cols-5 md:grid-cols-4 gris-cols-3 gap-4 '>
                    {
                        hotels?.map((values: { name: string; phone: string; website: string }, index: number) => (
                            <div key={index}>
                                <SingleCard items={values} />
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Major Rental Car Companies */}
            <div>
                <div className=' flex items-center gap-2 py-5 mt-10 '>
                    <img src="/planeSlice.svg" alt="" className=' w-6 h-6' />
                    <p className=' text-[24px] font-medium  '> Major Rental Car Companies</p>
                </div>

                <div className=' grid  lg:grid-cols-5 md:grid-cols-4 gris-cols-3 gap-4 '>
                    {
                        rentalCars?.map((values: { name: string; phone: string; website: string }, index: number) => (
                            <div key={index}>
                                <SingleCard items={values} />
                            </div>
                        ))
                    }
                </div>
            </div>


            {/* rideshare information */}
            <div>
                <div className=' flex items-center gap-2 py-5 mt-10 '>
                    <img src="/planeSlice.svg" alt="" className=' w-6 h-6' />
                    <p className=' text-[24px] font-medium  '>Ride Share Information</p>
                </div>

                <div className=' grid  lg:grid-cols-4 md:grid-cols-3 gris-cols-2 gap-4 '>
                    {
                        rideshare?.map((values: { name: string; phone: string; website: string }, index: number) => (
                            <div key={index}>
                                <SingleCard items={values} />
                            </div>
                        ))
                    }
                </div>
            </div>





        </div>
    );
};

export default AirportInfo;