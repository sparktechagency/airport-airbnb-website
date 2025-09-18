"use client"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { ConfigProvider, DatePicker, Form } from "antd";
import { useEffect, useState } from "react";
import { TbMessageDots } from "react-icons/tb";
import { TiLocationOutline } from "react-icons/ti";
import dayjs, { Dayjs } from "dayjs";
import { myFetch } from "@/helpers/myFetch";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface locationType {
    type: string,
    coordinates: number[]
}
const BookNow = ({ roomPrice, location, id }: { roomPrice: string, location: locationType, id: string }) => {
    const [viewport, setViewport] = useState({
        latitude: 40.712776,
        longitude: -74.005974,
        zoom: 10,
    });

    const router = useRouter()

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: ["places"],
    });

    const item = {
        key: 1,
        lat: location?.coordinates?.[1],
        lng: location?.coordinates?.[0],
    }

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setViewport((prev) => ({
                    ...prev,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }));
            },
            () => {
                console.log("Geolocation not available, using default coordinates");
            }
        );
    }, []);

    if (!isLoaded) return <div>Loading map...</div>;

    const handleFinish = async (values: { checkInDate: Dayjs, checkoutDate: Dayjs }) => {
        const payload = {
            hotelId: id,
            checkInDate: values.checkInDate
                ? dayjs(values.checkInDate).toISOString()
                : null,
            checkOutDate: values.checkoutDate
                ? dayjs(values.checkoutDate).toISOString()
                : null,
        }; 
        console.log(payload);

        try {
            const res = await myFetch("/booking", {
                method: "POST",
                body: payload,
            });
            console.log(res);
            if (res?.success) {
                router.push(res?.data?.redirectPaymentUrl);
            } else {
                if (res?.error && Array.isArray(res.error)) {
                    res.error.forEach((err: { message: string }) => {
                        toast.error(err.message, { id: "book-now" });
                    });
                } else {
                    toast.error(res?.message || "Something went wrong!", { id: "book-now" });
                }
            }
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div>
            <div className="w-full flex items-center justify-between  mb-6">
                <h1 className="text-primary font-semibold text-[24px] ">
                    $ {roomPrice}
                    <sub className="font-normal text-[#767676] text-sm">/night</sub>
                </h1>

                <p className="text-xs  flex items-center gap-1 bg-primary py-2 px-2 rounded-lg">
                    <span>  <TbMessageDots size={14} color="white" /> </span> <span className=" text-white ">Message </span>

                </p>
            </div>

            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#00809E",
                        colorTextPlaceholder: "#838383",
                    },
                }}
            >

                <Form onFinish={handleFinish}>
                    <Form.Item name="checkInDate" rules={[{ required: true, message: "Please select check-in date" }]}>

                        <DatePicker
                            size={"large"}
                            //   onChange={onchangeData}
                            //   disabledDate={disabledDate}
                            placeholder="For booking, please enter your checking date"
                            style={{
                                width: "100%",
                                borderRadius: 8,
                                height: 50,
                                border: "1px solid #d9d9d9d9",
                            }}
                        />

                    </Form.Item>

                    <Form.Item name="checkoutDate" rules={[{ required: true, message: "Please select checkout date" }]}>

                        <DatePicker
                            size={"large"}
                            placeholder="Please Select your checkout Date"
                            style={{
                                width: "100%",
                                borderRadius: 8,
                                height: 50,
                                border: "1px solid #d9d9d9d9",
                            }}
                        />

                    </Form.Item>


                    <Form.Item>
                        <button
                            className="w-full  h-[50px] text-center text-white bg-primary rounded-lg px-5 mb-2"
                            type="submit"
                        // disabled={checkDate === null || undefined}
                        >
                            Book Now
                        </button>
                    </Form.Item>
                </Form>
            </ConfigProvider>


            {/* for map  */}

            <div className=" py-1 px-2 ">
                <p className="text-sm font-medium flex items-center gap-1 pb-2"> <span> <TiLocationOutline color="#083A65" size={16} /> </span> <span>55/A , B park road, Abcd area, City </span></p>
                <div className="h-[250px] w-full py-2">
                    <GoogleMap
                        center={{ lat: item.lat, lng: item.lng }}
                        zoom={viewport.zoom}
                        mapContainerStyle={{
                            width: "100%",
                            height: "100%",

                        }}
                    >
                        <Marker
                            key={item.key}
                            position={{ lat: item.lat, lng: item.lng }}
                            icon={{
                                url: "/marker.png",
                                scaledSize: new google.maps.Size(25, 30),
                            }}
                        />
                    </GoogleMap>
                </div>

            </div>
        </div>
    );
};

export default BookNow;