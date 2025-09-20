import { Form, Input } from 'antd';
import React from 'react';
import { PiCurrencyDollarSimple } from 'react-icons/pi';

const RoomValue = () => {
    return (
        <div className='lg:w-1/2 w-full'>

            <Form.Item
                name={"roomPrice"}
                rules={[
                    { required: true, message: "Please enter the room value" },
                    {
                        pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                        message: "Please enter a valid amount (up to 2 decimals)",
                    },
                ]}>
                <Input placeholder='0.00' style={{ height: 45, width: "100%" }} prefix={<PiCurrencyDollarSimple size={20} />} />
            </Form.Item>

        </div>
    );
};

export default RoomValue;