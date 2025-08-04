"use client"
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

const PropertyInfo = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(0, 6));
    };

    const beforeUpload = (file: File) => {
        const isValidFormat = ['image/jpeg', 'image/png'].includes(file.type);
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isValidFormat) {
            message.error('Only JPG and PNG files are allowed!');
        }
        if (!isLt10M) {
            message.error('Image must be smaller than 10MB!');
        }

        return isValidFormat && isLt10M ? false : Upload.LIST_IGNORE;
    };

    const uploadButton = (
        <div style={{ width: 104, height: 104, border: '1px dashed #d9d9d9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Add more</div>
        </div>
    );


    const roomTypeOption = [
        {
            label: "Single", value: "single"
        },
        {
            label: "Double", value: "double"
        },
    ]
    return (
        <div className=' container '>
            <p className=' text-2xl text-primary font-medium  py-[50px]'> Property Information </p>

            <Form layout='vertical' >
                <div className=' grid grid-cols-2 gap-x-5'>
                    <Form.Item label={<p className="text-sm font-normal text-[#333333]">Hotel Name</p>} name="hotelName">
                        <Input type="text" placeholder="Enter hotel name" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                    </Form.Item>

                    <Form.Item label={<p className="text-sm font-normal text-[#333333]">Room value</p>} name="roomValue">
                        <Input type="text" placeholder="Enter room value" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                    </Form.Item>

                    <Form.Item label={<p className="text-sm font-normal text-[#333333]">Room Type</p>} name="roomType">
                        <Select options={roomTypeOption} placeholder="Select gender" className="w-full h-[45px] p-2 border border-[#EEEEEE] rounded" style={{ height: 45, border: "0px solid transparent" }} />
                    </Form.Item>

                    <Form.Item label={<p className="text-sm font-normal text-[#333333]">Location</p>} name="location">
                        <Input type="text" placeholder="Enter location" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                    </Form.Item>
                </div>

                <div>
                    <h3 className=' '>Add Room Photos</h3>
                    <ul className='text-lg font-normal  '>
                        <li>Upload high-quality, well-lit images</li>
                        <li>Include bedroom, bathroom, entrance, and common areas</li>
                        <li>Accepted formats: JPG, PNG</li>
                        <li>Max file size: 10MB per photo</li>
                        <li>Minimum: 5 photos recommended</li>
                    </ul>

                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        accept=".jpg,.jpeg,.png"
                        multiple
                    >
                        {fileList.length >= 6 ? null : uploadButton}
                    </Upload>
                </div>

            </Form>
        </div>
    );
};

export default PropertyInfo;