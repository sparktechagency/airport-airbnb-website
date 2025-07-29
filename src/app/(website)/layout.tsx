import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { ConfigProvider } from 'antd';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#083a65',
                    }
                }}>
                <div className=' pt-[100px]'>
                    {children}
                </div>

            </ConfigProvider>

            <Footer />
        </div>
    );
};

export default layout;