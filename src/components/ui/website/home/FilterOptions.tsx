"use client";
import { updateFilters } from "@/helpers/storageHelper";
import { DatePicker, Form, Input, Select, ConfigProvider } from "antd";
import { PiMapPin } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";
import { useRef, useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import  { Dayjs } from "dayjs"; 
import { useRouter } from "next/navigation";

const GOOGLE_MAP_LIBRARIES: ("places")[] = ["places"];

const FilterOptions = () => {
    const typeOptions = [
        { value: "single", label: "Single" },
        { value: "double", label: "Double" },
    ];

    const [location, setLocation] = useState("");
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
        null
    ); 
    const router = useRouter()

    const locationRef = useRef<google.maps.places.Autocomplete | null>(null);

    // load Google Maps API
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: GOOGLE_MAP_LIBRARIES,
    });

    const handlePlaceChanged = () => {
        if (locationRef.current) {
            const place = locationRef.current.getPlace();
            if (place?.formatted_address) {
                setLocation(place?.formatted_address);
            }
            if (place.geometry?.location) {
                setCoords({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                });
            }
        }
    };

    const onFinish = (values: { date: Dayjs | null, price: string, type: string }) => {
        const formattedDate = values.date ? values.date.toISOString() : null;

        updateFilters("roomFilter", {
            checkInDate: formattedDate,
            price: parseInt(values.price), 
            location ,
            roomType: values.type,
            lat: coords?.lat,
            lng: coords?.lng,
        }); 
         
        router.push("/services") 
    };

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    return (
        <div className="container w-full flex items-end justify-center bg-white rounded-lg shadow-md py-4 lg:px-20 px-4 z-50">
            <Form layout="vertical" className="w-full" onFinish={onFinish}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-end lg:gap-4 gap-2">
                    {/* Price */}
                    <Form.Item
                        label={
                            <p className="text-sm font-medium text-[#333333] mb-1">Price</p>
                        }
                        name="price"
                        className="mb-0 filter"
                    >
                        <Input
                            type="number"
                            placeholder="0.00"
                            className="w-full border border-[#EEEEEE] rounded h-[40px]"
                            prefix={<TbCurrencyDollar color="#B0B0B0" size={12} />}
                        />
                    </Form.Item>

                    {/* Date */}
                    <Form.Item
                        label={
                            <p className="text-sm font-medium text-[#333333] mb-1">Date</p>
                        }
                        name="date"
                        className="mb-0 filter"
                    >
                        <DatePicker
                            className="w-full border border-[#EEEEEE] rounded h-[40px]"
                            placeholder="Select date"
                        />
                    </Form.Item>

                    {/* Location with Autocomplete */}
                    <Form.Item
                        label={
                            <p className="text-sm font-medium text-[#333333] mb-1">
                                Location
                            </p>
                        }
                        name="location"
                        className="mb-0 filter"
                    >
                        {isLoaded ? (
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#286A25",
                                    },
                                }}
                            >
                                <Autocomplete
                                    onLoad={(autocomplete) => (locationRef.current = autocomplete)}
                                    onPlaceChanged={handlePlaceChanged}
                                    options={{
                                        types: ["geocode"],
                                        fields: ["formatted_address", "geometry"],
                                    }}
                                >
                                    <Input
                                        type="text"
                                        placeholder="Select location"
                                        className="w-full border border-[#EEEEEE] rounded h-[40px]"
                                        prefix={<PiMapPin color="#B0B0B0" size={12} />}
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </Autocomplete>
                            </ConfigProvider>
                        ) : (
                            <Input
                                type="text"
                                placeholder="Loading maps..."
                                disabled
                                className="w-full border border-[#EEEEEE] rounded h-[40px]"
                            />
                        )}
                    </Form.Item>

                    {/* Type */}
                    <Form.Item
                        label={
                            <p className="text-sm font-medium text-[#333333] mb-1">Type</p>
                        }
                        name="type"
                        className="mb-0 filter"
                    >
                        <Select
                            options={typeOptions}
                            placeholder="Select type"
                            style={{ height: "40px" }}
                            className="w-full h-[40px]"
                        />
                    </Form.Item>

                    {/* Search Button */}
                    <Form.Item
                        label={<p className="text-xm lg:block hidden"></p>}
                        className="col-span-2 lg:col-span-1 filter"
                    >
                        <button
                            type="submit"
                            className="w-full bg-primary text-white p-2 rounded h-[40px]"
                        >
                            Search
                        </button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default FilterOptions;
