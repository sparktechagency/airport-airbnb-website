"use client";
import { DatePicker, Form, Input, Select, ConfigProvider } from "antd";
import { PiMapPin } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import dayjs, { Dayjs } from "dayjs";
import { updateFilters, getFilters } from "@/helpers/storageHelper";
import { useRouter } from "next/navigation";

const GOOGLE_MAP_LIBRARIES: ("places")[] = ["places"];

const ServiceBanner = () => {
  const typeOptions = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
  ];

  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const locationRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  // Pre-fill data from local storage
  useEffect(() => {
    const savedFilters = getFilters("roomFilter"); 
    console.log(savedFilters);
    if (savedFilters) {
      form.setFieldsValue({
        price: savedFilters.price,
        date: savedFilters.checkInDate ? dayjs(savedFilters.checkInDate ) : undefined,
        type: savedFilters.roomType,
        location: savedFilters.location,
      });
      if (savedFilters.location) setLocation(savedFilters.location);
      if (savedFilters.lat && savedFilters.lng) {
        setCoords({ lat: savedFilters.lat, lng: savedFilters.lng });
      }
    }
  }, [form]);

  const handlePlaceChanged = () => {
    if (locationRef.current) {
      const place = locationRef.current.getPlace();
      if (place.formatted_address) {
        setLocation(place.formatted_address);
      }
      if (place.geometry?.location) {
        setCoords({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  const onFinish = (values: { date?: Dayjs; price?: string; type?: string }) => {
    const formattedDate = values.date ? values.date.toISOString() : null;

    updateFilters("roomFilter", {
      checkInDate: formattedDate,
      price: values.price ? parseInt(values.price) : undefined,
      roomType: values.type,
      location,
      lat: coords?.lat,
      lng: coords?.lng,
    });

    router.push("/services"); 
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div
      className="h-[385px] w-full flex items-end justify-center"
      style={{
        backgroundImage: "url(/serviceBg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container flex items-center justify-center bg-white/40 border border-white/40 rounded-lg shadow-md py-4 lg:px-20 px-4 z-50 lg:mb-10 mb-5">
        <Form layout="vertical" className="w-full" onFinish={onFinish} form={form}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center lg:gap-4 gap-2">
            {/* Price */}
            <Form.Item
              label={<p className="text-sm font-medium text-[#333333]">Price</p>}
              name="price"
              className="filter"
            >
              <Input
                type="number"
                placeholder="0.00"
                className="w-full p-2 border border-[#EEEEEE] rounded"
                style={{ height: 36 }}
                prefix={<TbCurrencyDollar color="#B0B0B0" size={12} />}
              />
            </Form.Item>

            {/* Date */}
            <Form.Item
              label={<p className="text-sm font-medium text-[#333333]">Date</p>}
              name="date"
              className="filter"
            >
              <DatePicker
                className="w-full p-2 border border-[#EEEEEE] rounded"
                style={{ height: 36 }}
              />
            </Form.Item>

            {/* Location with Autocomplete */}
            <Form.Item
              label={<p className="text-sm font-medium text-[#333333]">Location</p>}
              name="location"
              className="filter"
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
                      className="w-full p-2 border border-[#EEEEEE] rounded"
                      style={{ height: 36 }}
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
                  className="w-full p-2 border border-[#EEEEEE] rounded"
                  style={{ height: 36 }}
                />
              )}
            </Form.Item>

            {/* Type */}
            <Form.Item
              label={<p className="text-sm font-medium text-[#333333]">Type</p>}
              name="type"
              className="filter"
            >
              <Select
                options={typeOptions}
                placeholder="Select type"
                className="w-full h-[36px] p-2 border border-[#EEEEEE] rounded"
                style={{ height: 36, border: "0px solid transparent" }}
              />
            </Form.Item>

            {/* Search Button */}
            <Form.Item
              label={<p className="text-xm lg:block hidden"></p>}
              className="col-span-2 lg:col-span-1 filter"
            >
              <button
                type="submit"
                className="w-full bg-primary text-white p-2 rounded h-[36px]"
              >
                Search
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ServiceBanner;
