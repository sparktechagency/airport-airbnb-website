import { Button, Modal } from 'antd';
import React from 'react';

const PropertyModal = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => { 

    const handleConfirm = () => {
        setOpen(false);
    }; 

    return (
        <Modal
            title={<p className="text-center text-2xl font-medium text-[#676F62] pt-4">Give your Rating</p>}
            open={open}
            onCancel={() => setOpen(false)}
            footer={[
                <Button key="confirm" type="primary" onClick={handleConfirm} style={{ width: "100%", height: "45px", marginTop: "20px", marginBottom: "20px" }}>
                    Confirm
                </Button>,
            ]}
            centered
        >

        </Modal>
    );
};

export default PropertyModal;