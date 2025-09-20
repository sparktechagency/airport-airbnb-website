
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
const UploadImage = ({ fileList, setFileList }: { fileList: UploadFile[], setFileList: (fileList: UploadFile[]) => void }) => {
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(0, 6));
    };

    const beforeUpload = (file: File) => {
        const isValidFormat = ['image/jpeg', 'image/png'].includes(file.type);
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isValidFormat) {
            message.error('Only JPG and PNG files are allowed!');
        }
        if (!isLt10M) {
            message.error('Image must be smaller than 10MB!');
        }

        return isValidFormat && isLt10M ? false : Upload.LIST_IGNORE;
    };

    const uploadButton = (
        <div className='  border-dashed border-[#d9d9d9] flex items-center justify-center gap-1 '>
            <span>   <PlusOutlined />  </span>
            <span className=' text-gray-600 font-medium lg:text-[16px] text-sm '>Add more</span>
        </div>
    );

    console.log(fileList);
    

    return (
        <div>
      
            <ul className='lg:text-[16px] text-sm font-normal list-disc text-[#767676] container space-y-2 pb-5  '>
                <li>Upload high-quality, well-lit images</li>
                <li>Include bedroom, bathroom, entrance, and common areas</li>
                <li>Accepted formats: JPG, PNG</li>
                <li>Max file size: 10MB per photo</li>
                <li>Minimum: 5 photos recommended</li>
            </ul>


            <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                accept=".jpg,.jpeg,.png"
                multiple
            >
                {fileList.length >= 5 ? null : uploadButton}
            </Upload>
        </div>
    );
};

export default UploadImage;