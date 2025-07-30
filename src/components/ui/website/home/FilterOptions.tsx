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
        <div className=" container flex items-center justify-center bg-white rounded-lg shadow-md py-4 px-20 z-50">
            <Form layout="vertical" className="w-full  ">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center gap-4">
                    <Form.Item label={<p className="text-sm font-medium text-[#333333]">Price</p>} name="price">
                        <Input type="number" placeholder="0.00" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 36 }} prefix={<TbCurrencyDollar color="#B0B0B0" size={12} />} />
                    </Form.Item>

                    <Form.Item label={<p className="text-sm font-medium text-[#333333]">Date</p>} name="date">
                        <DatePicker className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 36 }} />
                    </Form.Item>

                    <Form.Item label={<p className="text-sm font-medium text-[#333333]">Location</p>} name="location">
                        <Input type="text" placeholder="Select location" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 36 }} prefix={<PiMapPin color="#B0B0B0" size={12} />} />
                    </Form.Item>

                    <Form.Item label={<p className="text-sm font-medium text-[#333333]">Type</p>} name="location">
                        <Select options={typeOptions} placeholder="Select type" className="w-full h-[36px] p-2 border border-[#EEEEEE] rounded" style={{ height: 36 , border:"0px solid transparent" }} />
                    </Form.Item>

                    <Form.Item label={<p className="text-xm"></p>}>
                        <button type="submit" className="w-full bg-primary text-white p-2 rounded  h-[36px] ">
                            search
                        </button>
                    </Form.Item>

                </div>
            </Form>
        </div>
    );
};

export default FilterOptions;