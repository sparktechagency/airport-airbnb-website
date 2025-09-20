import { roomTypeOption } from "@/constants/Services/services";
import { Form, Select } from "antd";

const SelectRoomType = () => {
  return (
    <div className="lg:w-1/2 w-full">
      <Form.Item
      
        name="roomType"
        rules={[{ required: true, message: "Please select a room type" }]}
      >
        <Select
          options={roomTypeOption}
          placeholder="Select room type"
          className="w-full"
          style={{ height: 45 }}
        />
      </Form.Item>
    </div>
  );
};

export default SelectRoomType;
