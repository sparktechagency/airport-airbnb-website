"use client";
import { DatePicker, Form, Input, Select } from "antd";
import { PiMapPin } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";

const FilterOptions = () => {
    const typeOptions = [
        { value: 'single', label: 'Single' },
        { value: 'double', label: 'Double' },
    ];

    return (
        <div className="container w-full flex items-end justify-center bg-white rounded-lg shadow-md py-4 lg:px-20 px-4 z-50">
            <Form layout="vertical" className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-end lg:gap-4 gap-2">
                    <Form.Item 
                        label={<p className="text-sm font-medium text-[#333333] mb-1">Price</p>} 
                        name="price" 
                        className="mb-0 filter"
                    >
                        <Input 
                            type="number" 
                            placeholder="0.00" 
                            className="w-full border border-[#EEEEEE] rounded h-[40px]" 
                            prefix={<TbCurrencyDollar color="#B0B0B0" size={12} />} 
                        />
                    </Form.Item>

                    <Form.Item 
                        label={<p className="text-sm font-medium text-[#333333] mb-1">Date</p>} 
                        name="date" 
                        className="mb-0 filter"
                    >
                        <DatePicker 
                            className="w-full border border-[#EEEEEE] rounded h-[40px]" 
                            placeholder="Select date"
                        />
                    </Form.Item>

                    <Form.Item 
                        label={<p className="text-sm font-medium text-[#333333] mb-1">Location</p>} 
                        name="location" 
                        className="mb-0 filter"
                    >
                        <Input 
                            type="text" 
                            placeholder="Select location" 
                            className="w-full border border-[#EEEEEE] rounded h-[40px]" 
                            prefix={<PiMapPin color="#B0B0B0" size={12} />} 
                        />
                    </Form.Item>

                    <Form.Item 
                        label={<p className="text-sm font-medium text-[#333333] mb-1">Type</p>} 
                        name="type" 
                        className="mb-0 filter"
                    >
                        <Select 
                            options={typeOptions} 
                            placeholder="Select type"  
                            style={{ height:"40px"}}
                            className="w-full h-[40px]"
                        />
                    </Form.Item>
                   
                        <Form.Item label={<p className="text-xm lg:block hidden"></p>} className="col-span-2 lg:col-span-1 filter">
                            <button type="submit" className="w-full bg-primary text-white p-2 rounded  h-[40px] ">
                                search
                            </button>
                        </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default FilterOptions;