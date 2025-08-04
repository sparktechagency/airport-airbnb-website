import { Form, Input } from 'antd';
import React from 'react';

const ChangePassword = () => {
    const [form] = Form.useForm()
    return (
        <div className="p-7">

            <Form
                form={form}
                layout="vertical"
                initialValues={{ remember: true }}
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