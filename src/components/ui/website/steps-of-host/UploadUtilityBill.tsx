import React from "react";
import { GoUpload } from "react-icons/go";
import Dragger from "antd/es/upload/Dragger";

interface UploadUtilityBillProps {
  setDoc: React.Dispatch<React.SetStateAction<{ utilityBill?: File | null }>>;
  doc: { utilityBill?: File | null };
}

const UploadUtilityBill = ({ setDoc }: UploadUtilityBillProps) => {

  
  const handleFileUpload = (file: File) => {
    setDoc({ utilityBill: file }); 
    return false; 
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    showUploadList: true,
    beforeUpload: (file: File) => handleFileUpload(file),
  };

  return (
    <div className="lg:w-1/2 w-full">
      <Dragger
        {...uploadProps}
        accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx"
        maxCount={1}
      >
        <p className="ant-upload-drag-icon flex items-center justify-center">
          <GoUpload size={30} className="text-primary" />
        </p>
        <p className="ant-upload-text">Click or drag file to upload</p>
        <p className="ant-upload-hint text-gray-500">
          Supported formats: Images, PDF, Word, Excel
        </p>
      </Dragger>
    </div>
  );
};

export default UploadUtilityBill;
