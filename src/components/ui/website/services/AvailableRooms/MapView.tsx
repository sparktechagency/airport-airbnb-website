import { services } from "@/constants/Services/services";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { TfiLocationPin } from "react-icons/tfi";

const MapView = () => {
    const [activeMarker, setActiveMarker] = useState<number | null>(null);
    const [viewport, setViewport] = useState({
        latitude: 40.712776,
        longitude: -74.005974,
        zoom: 12,
    });
    const [isInWishlist, setIsInWishlist] = useState(false);

    const handleWishList = () => {
        setIsInWishlist(!isInWishlist);
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    const [map, setMap] = useState(null);

    const onLoad = (map: any) => {
        setMap(map);
    };

    const onUnmount = () => {
        setMap(null);
    };

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

    const handleMarkerClick = (key: number) => {
        setActiveMarker(activeMarker === key ? null : key);
    };

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <div className="h-screen w-full p-3">
            <GoogleMap
                center={{ lat: viewport.latitude, lng: viewport.longitude }}
                zoom={viewport.zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                }}
            >
                {services.map((item) => (
                    <Marker
                        key={item.key}
                        position={{ lat: item.lat, lng: item.lng }}
                        icon={{
                            url: "/marker.png",
                            scaledSize: new google.maps.Size(25, 30),
                        }}
                        onClick={() => handleMarkerClick(item.key)}
                    >
                        {activeMarker === item.key && (
                            <InfoWindow
                                position={{ lat: item.lat, lng: item.lng }}
                                onCloseClick={() => setActiveMarker(null)}
                            >
                                <div className="grid grid-cols-12 gap-3 " style={{ width: 450, borderRadius: "10px" }}>
                                    <div className="col-span-4">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={150}
                                            height={150}
                                            className="w-full h-full rounded-md object-cover"
                                        />
                                    </div>
                                    <div className="col-span-8 p-2">
                                        <div className="flex justify-between items-center">
                                            <p className="py-1 text-[16px] font-medium">{item.name}</p>
                                            <div className=" cursor-pointer ">
                                                <Heart
                                                    className=""
                                                    onClick={handleWishList}
                                                    size={18}
                                                    color={isInWishlist ? "#083a65" : "#083a65"}
                                                    fill={isInWishlist ? "#083a65" : "transparent"}
                                                />
                                            </div> 
                                        </div>
                                        <div className="flex items-center gap-2 text-[#FFD139] mt-1">
                                            <AiFillStar size={16} />
                                            <span className="text-[#767676] text-sm font-normal">{item?.rating} ({item?.reviews})</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <div className="flex items-center gap-2 mt-1 text-[#767676] text-sm font-normal">
                                                <TfiLocationPin size={16} color="#767676" />
                                                <span>{item?.distance}</span>
                                            </div>
                                            <div className="mt-1 text-primary font-medium text-[16px]">{item?.price} <span className="text-[#767676]  font-normal text-sm">/night</span></div>
                                        </div>
                                    </div>
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                ))}
            </GoogleMap>
        </div>
    );
};

export default MapView;