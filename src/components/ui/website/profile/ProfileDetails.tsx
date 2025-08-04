"use client"
import { Form, Input, Select } from 'antd';

const ProfileDetails = () => {
    const [form] = Form.useForm();

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
    ]

    const onFinish = (values: { name: string, email: string, contactNo: string, gender: string, address: string }) => {
        console.log('Received values:', values);
        // Add your form submission logic here
    };
    return (
        <div className='p-7'>
            <h2 className=' text-2xl font-medium pb-5' >Personal Information</h2>
            <Form
                form={form}
                name="personal_info"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item label={<p className="text-sm font-normal text-[#333333]">Name</p>} name="name">
                    <Input type="text" placeholder="Enter Name" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                </Form.Item>

                <Form.Item label={<p className="text-sm font-normal text-[#333333]">Email</p>} name="email">
                    <Input type="text" placeholder="Enter email" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                </Form.Item>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: '1' }}>
                        <Form.Item label={<p className="text-sm font-normal text-[#333333]">Contact No</p>} name="contactNo">
                            <Input type="text" placeholder="Enter Contact No" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                        </Form.Item>
                    </div>
                    <div style={{ flex: '1' }}>
                        <Form.Item label={<p className="text-sm font-normal text-[#333333]">Gender</p>} name="gender">
                            <Select options={genderOptions} placeholder="Select gender" className="w-full h-[45px] p-2 border border-[#EEEEEE] rounded" style={{ height: 45, border: "0px solid transparent" }} />
                        </Form.Item>
                    </div>
                </div>

                <Form.Item label={<p className="text-sm font-normal text-[#333333]"> Address</p>} name="address">
                    <Input type="text" placeholder="Enter address" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                </Form.Item>

                <Form.Item className=' flex items-center justify-center w-full'>
                    <button type="submit" className=' h-[40px] bg-primary text-white text-sm font-normal px-6  rounded  '>
                        Save Changes
                    </button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProfileDetails;