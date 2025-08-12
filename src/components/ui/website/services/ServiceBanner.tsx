"use client"
import { DatePicker, Form, Input, Select } from "antd";
import { PiMapPin } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";

const ServiceBanner = () => {


    const typeOptions = [
        { value: 'single', label: 'Single' },
        { value: 'double', label: 'Double' },
    ];
    return (
        <div className=' h-[385px] w-full flex items-end justify-center' style={{ backgroundImage: 'url(/serviceBg.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

            <div className=" container flex items-center justify-center bg-white/40 border border-white/40 rounded-lg shadow-md py-4 lg:px-20 px-4 z-50 lg:mb-10 mb-5">
                <Form layout="vertical" className="w-full  ">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center lg:gap-4 gap-2">
                        
                        <Form.Item label={<p className="text-sm font-medium text-[#333333]">Price</p>} name="price" className="filter">
                            <Input type="number" placeholder="0.00" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 36 }} prefix={<TbCurrencyDollar color="#B0B0B0" size={12} />} />
                        </Form.Item>

                        <Form.Item label={<p className="text-sm font-medium text-[#333333]">Date</p>} name="date" className="filter">
                            <DatePicker className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 36 }} />
                        </Form.Item>

                        <Form.Item label={<p className="text-sm font-medium text-[#333333]">Location</p>} name="location" className="filter">
                            <Input type="text" placeholder="Select location" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 36 }} prefix={<PiMapPin color="#B0B0B0" size={12} />} />
                        </Form.Item>

                        <Form.Item label={<p className="text-sm font-medium text-[#333333]">Type</p>} name="type" className="filter">
                            <Select options={typeOptions} placeholder="Select type" className="w-full h-[36px] p-2 border border-[#EEEEEE] rounded" style={{ height: 36, border: "0px solid transparent" }} />
                        </Form.Item>

                        <Form.Item label={<p className="text-xm lg:block hidden"></p>} className="col-span-2 lg:col-span-1 filter">
                            <button type="submit" className="w-full bg-primary text-white p-2 rounded  h-[36px] ">
                                search
                            </button>
                        </Form.Item>

                    </div>
                </Form>
            </div> 
         
        </div>
    );
};

export default ServiceBanner;