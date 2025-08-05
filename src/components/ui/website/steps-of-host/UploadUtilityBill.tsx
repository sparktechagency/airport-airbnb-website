import React, { useState } from 'react';
import { GoUpload } from 'react-icons/go';

const UploadUtilityBill = () => {
    const [imgURL, setImgURL] = useState("");
    const [imgFile, setImageFile] = useState<File | null>(null);
    console.log(imgFile);
    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setImgURL(imgUrl);
            setImageFile(file)
        }
    };
    return (
        <div className='w-1/2'>
            <div className="flex  py-3">
                <input
                    onChange={onChange}
                    type="file"
                    id="img"
                    style={{ display: "none" }}
                />
                <label
                    htmlFor="img"
                    className="relative w-full h-[220px] cursor-pointer rounded border  bg-white bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: `url(${imgURL})` }}
                >
                    <div
                        className="  flex flex-col items-center justify-center"
                    >
                        <span> <GoUpload size={20} className="text-primary" /> </span>
                        <span className=' text-[#767676] text-[16px] font-medium'> Drag file to upload </span>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default UploadUtilityBill;