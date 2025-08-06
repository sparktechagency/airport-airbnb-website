import { Form, Input } from 'antd';
import React from 'react';

const HotelName = () => {
    return (
        <div className='lg:w-1/2 w-full'>
            <Form layout='vertical' >
                <Form.Item name={"hotelName"} >
                    <Input placeholder='Enter Hotel Name' style={{ height: 45, width: "100%" }} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default HotelName;