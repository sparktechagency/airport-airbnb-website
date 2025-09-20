import { Form, Input } from 'antd';
import React from 'react';

const HotelName = () => {
    return (
        <div className='lg:w-1/2 w-full'>

            <Form.Item name={"name"}
                rules={[
                    { required: true, message: "Please enter your hotel name" },
                    { max: 100, message: "Hotel name cannot exceed 100 characters" },
                ]}
            >
                <Input placeholder='Enter Hotel Name' style={{ height: 45, width: "100%" }} />
            </Form.Item>

        </div>
    );
};

export default HotelName;