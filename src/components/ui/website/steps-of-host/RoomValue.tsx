import { Form, Input } from 'antd';
import React from 'react';
import { PiCurrencyDollarSimple } from 'react-icons/pi';

const RoomValue = () => {
    return (
        <div className='w-1/2'>
            <Form layout='vertical' >
                <Form.Item name={"roomValue"} >
                    <Input placeholder='0.00' style={{ height: 45, width: "100%" }} prefix={<PiCurrencyDollarSimple size={20} />} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default RoomValue;