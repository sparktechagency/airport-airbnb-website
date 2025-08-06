import { Modal, Rate, Input, Button } from "antd";
import { useState } from "react";

const FeedbackModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const [rating, setRating] = useState<number | undefined>();
  const [comment, setComment] = useState<string>("");

  const handleConfirm = () => {
    // console.log("Rating:", rating, "Comment:", comment); 
    setOpen(false);
  };

  return (
    <Modal
      title={<p className="text-center lg:text-2xl text-xl font-medium text-[#676F62] pt-4">Give your Rating</p>}
      open={open}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="confirm" type="primary" onClick={handleConfirm} style={{ width:"100%" , height:"45px" , marginTop:"20px" , marginBottom:"20px"}}>
          Confirm
        </Button>,
      ]} 
      centered
    >
      <div className="flex items-center justify-center pt-1 pb-2"> 
      <Rate  value={rating} onChange={setRating} style={{ fontSize: 36 }} />
      </div>
      <div className="mt-4">
        <label className="lg:text-[16px] text-sm  font-medium text-[#636363] lg:pb-0.5 pb-2">Comments</label>
        <Input.TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment"
          autoSize={{ minRows: 6, maxRows: 8 }}
        />
      </div>
    </Modal>
  );
};

export default FeedbackModal;