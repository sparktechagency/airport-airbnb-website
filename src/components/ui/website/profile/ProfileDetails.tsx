"use client"
import { myFetch } from '@/helpers/myFetch';
import { revalidateTags } from '@/helpers/revalidateTags';
import { IUser } from '@/types/profile/userType';
import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ProfileDetails = ({user}:{user:IUser}) => {
    const [form] = Form.useForm();

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
    ]

    useEffect(() => {
        form.setFieldsValue({
            name: user?.name||"",
            email: user?.email||"",
            contact: user?.contact||"",
            gender: "male",
            address: user?.address||"",
        });
    }, [form, user]);

    const onFinish = async(values: { name: string, email: string, contact: string, gender: string, address: string }) => {
        const res = myFetch("/user",{
            method:"PATCH",
            body:values
        })

       toast.promise(res, {
            loading: "Updating...",
            success: (data)=>{
                if(data.success){
                    toast.success(data.message!);
                    revalidateTags(["user-profile"])
                    return ""
                }else{
                    toast.error(data.message!);
                    return ""
                }
            },
            error: "Something went wrong",
        })
    };
    return (
        <div className='p-7'>
            <h2 className=' lg:text-2xl text-xl font-medium pb-5' >Personal Information</h2>
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

                <div className=' flex lg:flex-row flex-col lg:gap-4' >
                    <div style={{ flex: '1' }}>
                        <Form.Item label={<p className="text-sm font-normal text-[#333333]">Contact No</p>} name="contact">
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