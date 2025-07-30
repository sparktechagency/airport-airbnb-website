"use client";
import React, { useState } from 'react';
import GridView from './GridView';
import MapView from './MapView';
import { IoGridOutline, IoMapOutline } from 'react-icons/io5';

const MainAvailableRooms = () => {
    const [activeTab, setActiveTab] = useState('grid');

    const tabOptions = [
        { name: <p className=' flex items-center gap-1'> <span > <IoGridOutline size={16}  />  </span> <span> Grid View </span> </p>, key: 'grid' },
        { name: <p className=' flex items-center gap-1'> <span > <IoMapOutline size={16}  />  </span> <span> Map View </span> </p>, key: 'map' }
    ];
    return (
        <div>

            <div className='container py-20 '> 
                <div className='flex items-center justify-between mb-6'> 
                <h1 className="text-2xl font-medium  ">Available Rooms</h1>
                <div className="">
                    <div className="flex space-x-2 ">
                        {tabOptions.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`py-2 px-4 text-sm font-normal  rounded-lg  shadow-md
                ${activeTab === tab.key
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-[#767676] border-[#EEEEEE] border'}`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === 'grid' ? <GridView /> : <MapView />}
                </div>
            </div>
        </div>
    );
};

export default MainAvailableRooms;