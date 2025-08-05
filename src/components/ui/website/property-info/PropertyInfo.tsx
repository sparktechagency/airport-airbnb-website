"use client"
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import type { UploadFile } from 'antd';
import UploadImage from './UploadImage';
import { roomTypeOption } from '@/constants/Services/services';
import RoomDetails from './RoomDetails';
import Facilities from './Facilities';
import Calender from '@/components/shared/Calendar';
const PropertyInfo = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [content, setContent] = useState('');
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

    return (
        <div className=' container w-full py-[50px]  '>
            <p className=' text-2xl text-primary font-medium   pb-8'> Property Information </p>

            <Form layout='vertical' >
                <div className=' grid grid-cols-2 gap-x-5'>
                    <Form.Item label={<p className="text-lg font-medium text-[#333333]">Hotel Name</p>} name="hotelName">
                        <Input type="text" placeholder="Enter hotel name" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                    </Form.Item>

                    <Form.Item label={<p className="text-lg font-medium text-[#333333]">Room value</p>} name="roomValue">
                        <Input type="text" placeholder="Enter room value" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                    </Form.Item>

                    <Form.Item label={<p className="text-lg font-medium text-[#333333]">Room Type</p>} name="roomType">
                        <Select options={roomTypeOption} placeholder="Select room type" className="w-full h-[45px] p-2 border border-[#EEEEEE] rounded" style={{ height: 45, border: "0px solid transparent" }} />
                    </Form.Item>

                    <Form.Item label={<p className="text-lg font-medium text-[#333333]">Location</p>} name="location">
                        <Input type="text" placeholder="Enter location" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                    </Form.Item>
                </div>

                <div className=''>
                    <h3 className="text-lg font-medium text-[#333333] pb-3">Add Room Photos</h3>
                    <UploadImage fileList={fileList} setFileList={setFileList} />
                </div>

                <div className='py-8'>
                    <h3 className="text-lg font-medium text-[#333333] pb-3">Room Details</h3>
                    <RoomDetails content={content} setContent={setContent} />
                </div>

                <div className='pb-8'>
                    <h3 className="text-lg font-medium text-[#333333] pb-3">Facilities</h3>
                    <Facilities selectedFacilities={selectedFacilities} setSelectedFacilities={setSelectedFacilities} />
                </div>

                <div className='pb-8'>
                    <h3 className="text-lg font-medium text-[#333333] pb-3">Set Room Closure Date (optional)</h3>
                    <div className='w-1/2 border border-gray-300 rounded'>
                        <Calender unavailableDay={[]} />
                    </div>
                </div> 

                <Form.Item className=' flex items-center justify-end py-8 w-full  '>  
                    <button className=' px-20 h-[45px] bg-primary text-white text-[16px] font-medium rounded  '>Confirm </button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default PropertyInfo;