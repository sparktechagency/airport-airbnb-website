import { myFetch } from '@/helpers/myFetch';
import { Form, Input } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const [form] = Form.useForm()
    const onFinish =async (values: { currentPassword: string, newPassword: string, confirmPassword: string }) => {
        const res = myFetch("/auth/change-password",{
            method:"POST",
            body:values
        })

        toast.promise(res, {
            loading: "Updating...",
            success: (data)=>{
                if(data.success){
                    toast.success(data.message!);
                    return ""
                }else{
                    toast.error(data.message!);
                    return ""
                }
            },
            error: "Something went wrong",
        })
    }
    return (
        <div className="p-7">

            <Form
                form={form}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className="w-full lg:w-2/3"
            >

                <Form.Item
                    name="currentPassword"
                    label={<p className="block">Current Password</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please input your current password!",
                        },
                    ]}
                    className="mb-5"
                >
                    <Input.Password
                        placeholder="Enter Password"
                        className="w-full h-[45px] p-2 border border-[#EEEEEE] rounded"
                    />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label={<p className="block">New Password</p>}
                    dependencies={["currentPassword"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("currentPassword") === value) {
                                    return Promise.reject(
                                        new Error("The new password and current password do not match!")
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                    className="mb-5"
                >
                    <Input.Password
                        placeholder="Enter password"
                        className="w-full h-[45px] p-2 border border-[#EEEEEE] rounded"
                    />
                </Form.Item>


                <Form.Item
                    name="confirmPassword"
                    label={<p className="block">Re-Type Password</p>}
                    dependencies={["newPassword"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("newPassword") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("The new password that you entered does not match!")
                                );
                            },
                        }),
                    ]}
                    className="mb-10"
                >
                    <Input.Password
                        placeholder="Enter password"
                        className="w-full h-[45px] p-2 border border-[#EEEEEE] rounded"
                    />
                </Form.Item>


                <Form.Item className="flex  justify-end">
                    <button

                        type="submit"
                        className="bg-primary text-white w-36 h-11 rounded "
                    >
                        Save Changes
                    </button>
                </Form.Item>
            </Form>

        </div>
    );
};

export default ChangePassword;          