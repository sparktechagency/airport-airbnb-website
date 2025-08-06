import { Form, Input } from 'antd';
import React from 'react';

const HouseRulesInput = () => {
    return (
            <div className='lg:w-1/2 w-full'>
            <Form layout='vertical' >
                <Form.Item name={"houseRules"} >
                    <Input placeholder='Enter house rules' style={{ height: 45, width: "100%" }} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default HouseRulesInput;