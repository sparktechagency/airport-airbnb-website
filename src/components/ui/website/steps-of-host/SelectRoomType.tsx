import { roomTypeOption } from "@/constants/Services/services";
import { Form, Select } from "antd";

const SelectRoomType = () => {
    return (
       <div className='lg:w-1/2 w-full'>
            <Form layout='vertical' >
                <Form.Item name={"roomType"} >
                      <Select options={roomTypeOption} placeholder="Select room type" className="w-full h-[45px] p-2 border border-[#EEEEEE] rounded" style={{ height: 45, border: "0px solid transparent" }} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SelectRoomType;