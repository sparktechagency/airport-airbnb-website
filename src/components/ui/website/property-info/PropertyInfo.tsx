"use client"
import { Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import type { UploadFile } from 'antd';
import UploadImage from './UploadImage';
import { roomTypeOption } from '@/constants/Services/services';
import RoomDetails from './RoomDetails';
import Facilities from './Facilities';
import Calender from '@/components/shared/Calendar';
import HomeRuleForm from './HomeRule';
import { myFetch } from '@/helpers/myFetch';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { IHotel } from '@/types/hotel/hotel';
import { multipleUrlToAntdFile } from '@/helpers/urlToFile';
const PropertyInfo = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [content, setContent] = useState('');
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [roomClosureDates, setRoomClosureDates] = useState<string[]>([]);
    const [existImages, setExistImages] = useState<UploadFile[]>([]);
    const [homeRules, setHomeRules] = useState<{title: string, description: string}[]>([]);
    const [singleHotelData, setSingleHotelData] = useState<IHotel>();
    const router = useRouter()
    const [form] = Form.useForm();
    const searchParams = useSearchParams()
    
    const id = searchParams.get('id');
   
    
    useEffect(() => {
        if(id){
            setFileList([])
            myFetch(`/hotel/${id}`,{
                method:"GET",
                cache: "no-cache",
            }).then(async(res)=>{
                const data = res?.data;
                form.setFieldsValue({
                    name: data.name,
                    price: data.roomPrice,
                    roomType: data.roomType,
                    address: data.address,
                    description: data.description,
                })
                setContent(data.description || "");
                setSelectedFacilities(data.facilities?.map((facility: any) => facility._id) || []);
                setRoomClosureDates(data.roomClosureDates || []);
                setHomeRules(data.hotelRules || []);
                setSingleHotelData(data);
                
                const imageFiles = await multipleUrlToAntdFile(data?.image || []);
                setFileList(imageFiles as UploadFile[]);
                setExistImages(imageFiles as UploadFile[]);
            })
        }
    }, [id]);
    
    const onFinish = async(values: any) => {

        
        
       const formData = new FormData();
       
       formData.append("name", values.name);
       formData.append("roomPrice", values.price);
       formData.append("roomType", values.roomType);
       formData.append("address", values.address);
       formData.append("description", content);
       const isEditMode = Boolean(id);
       const compareImages =!isEditMode || existImages?.length !== fileList?.length || !existImages?.every(img => fileList?.some(fimg => fimg.uid === img.uid));

       if (isEditMode && compareImages) {
           fileList.forEach((file) => {
               formData.append("image", file.originFileObj as Blob);
           });
       }
         if(!isEditMode){
            fileList.forEach((file) => {
                formData.append("image", file.originFileObj as Blob);
            });
         }
         
         const compareFacilities = !isEditMode || singleHotelData?.facilities?.length !== selectedFacilities?.length || !singleHotelData?.facilities?.every(facility => selectedFacilities?.includes(facility));
         if (isEditMode && compareFacilities) {
           selectedFacilities.forEach((facility) => {
             formData.append("facilities[]", facility);
           });
         }

         if(!isEditMode){
            selectedFacilities.forEach((facility) => {
                formData.append("facilities[]", facility);
            });
         }

        

       roomClosureDates.forEach((date) => {
         formData.append("roomClosureDates[]", date);
       });

       homeRules.forEach((rule,index) => {
            formData.append(`hotelRules[${index}][title]`, rule.title);
            formData.append(`hotelRules[${index}][description]`, rule.description);
       });
       // console log homeRules from formData

       formData.forEach((value, key) => {
         console.log(key, value);
       });

       const res = !isEditMode? myFetch("/hotel",{
        method:"POST",
        body:formData
       }): myFetch(`/hotel/${id}`,{
           method:"PATCH",
           body:formData
       })

       toast.promise(res, {
        loading: "Updating...",
        success: (data)=>{
            if(data.success){
                toast.success(data.message!);
                if(!isEditMode){
                    form.resetFields();
                    router.push("/profile?tab=4")
                    return ""
                }
                router.push(`/property-info?id=${id}`);

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
        <div className=' container w-full lg:py-[50px] py-[30px]  '>
            <p className=' lg:text-2xl text-xl text-primary font-medium   pb-8'> Property Information </p>

            <Form form={form} onFinish={onFinish} layout='vertical' >
                <div className=' grid lg:grid-cols-2 grid-cols-1 gap-x-5'>
                    <Form.Item label={<p className="lg:text-lg text-sm font-medium text-[#333333]">Hotel Name</p>} name="name">
                        <Input type="text" placeholder="Enter hotel name" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                    </Form.Item>

                    <Form.Item label={<p className="lg:text-lg text-sm font-medium text-[#333333]">Room value</p>} name="price">
                        <Input type="number" placeholder="Enter room value" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                    </Form.Item>

                    <Form.Item label={<p className="lg:text-lg text-sm font-medium text-[#333333]">Room Type</p>} name="roomType">
                        <Select options={roomTypeOption} placeholder="Select room type" className="w-full h-[45px] p-2 border border-[#EEEEEE] rounded" style={{ height: 45, border: "0px solid transparent" }} />
                    </Form.Item>

                    <Form.Item label={<p className="lg:text-lg text-sm font-medium text-[#333333]">Location</p>} name="address">
                        <Input type="text" placeholder="Enter location" className="w-full p-2 border border-[#EEEEEE] rounded" style={{ height: 45 }} />
                    </Form.Item>
                </div>

                <div className=''>
                    <h3 className="lg:text-lg text-sm font-medium text-[#333333] pb-3">Add Room Photos</h3>
                    <UploadImage fileList={fileList} setFileList={setFileList} />
                </div>

                <div className='py-8'>
                    <h3 className="lg:text-lg text-sm font-medium text-[#333333] pb-3">Room Details</h3>
                    <RoomDetails content={content} setContent={setContent} />
                </div>

                <div className='pb-8'>
                    <h3 className="lg:text-lg text-sm font-medium text-[#333333] pb-3">Facilities</h3>
                    <Facilities selectedFacilities={selectedFacilities} setSelectedFacilities={setSelectedFacilities} />
                </div>

                <div className='pb-8'>
                    <h3 className="lg:text-lg text-sm font-medium text-[#333333] pb-3">Set Room Closure Date (optional)</h3>
                    <div className='lg:w-1/2 border border-gray-300 rounded'>
                        <Calender setDate={setRoomClosureDates}  unavailableDay={[]}  selectedDate={roomClosureDates}/>
                    </div>
                </div> 

                <div className='pb-8'>
                    <HomeRuleForm setHomeRules={setHomeRules} homeRules={homeRules}/>
                </div>

                <Form.Item className=' flex items-center justify-end py-8 w-full  '>  
                    <button className=' px-20 h-[45px] bg-primary text-white text-[16px] font-medium rounded  '>Confirm </button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default PropertyInfo;