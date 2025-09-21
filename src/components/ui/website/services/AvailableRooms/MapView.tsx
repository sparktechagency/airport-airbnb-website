import { imgUrl } from "@/config/config";
import { myFetch } from "@/helpers/myFetch";
import { allRoomsType } from "@/types/webPagesType";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Heart } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { TfiLocationPin } from "react-icons/tfi";

const MapView = ({ allRooms }: allRoomsType) => {
    const [activeMarker, setActiveMarker] = useState<string | null>(null);
    const [viewport, setViewport] = useState({
        latitude: 40.712776,
        longitude: -74.005974,
        zoom: 12,
    });
    const [isInWishlist, setIsInWishlist] = useState(false);

    const handleWishList = async ({ e, id }: { e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string }) => {
        e.preventDefault()
        const value = {
            hotel: id
        }
        try {
            const res = await myFetch("/favourite", {
                method: "POST",
                body: value,
            });
            if (res?.success) {
                toast.success(res?.message || "Mark as a favorite", { id: "favorite" });
                setIsInWishlist(!isInWishlist);
            } else {
                if (res?.error && Array.isArray(res.error)) {
                    res.error.forEach((err: { message: string }) => {
                        if (err.message === "You are not authorized") {
                             redirect("/register");
                        } else {
                            toast.error(err.message, { id: "favorite" });
                        }
                    });
                } else {
                    toast.error(res?.message || "Something went wrong!", { id: "favorite" });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: ["places"],
    });

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

    const handleMarkerClick = (key: string) => {
        setActiveMarker(activeMarker === key ? null : key);
    };

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <div className="h-screen w-full p-3">
            <GoogleMap
                center={{ lat: viewport.latitude, lng: viewport.longitude }}
                zoom={viewport.zoom}
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                }}
            >
                {allRooms?.result.map((item) => (
                    <Marker
                        key={item._id}
                        position={{
                            lat: Number(item.location?.coordinates?.[1]) || 0,
                            lng: Number(item.location?.coordinates?.[0]) || 0,
                        }}
                        icon={{
                            url: "/marker.png",
                            scaledSize: new google.maps.Size(35, 40),
                        }}
                        onClick={() => handleMarkerClick(item._id)}
                    >
                        {activeMarker === item._id && (
                            <InfoWindow
                                position={{
                                    lat: Number(item.location?.coordinates?.[1]) || 0,
                                    lng: Number(item.location?.coordinates?.[0]) || 0,
                                }}
                                onCloseClick={() => setActiveMarker(null)}
                            >
                                <div className="grid grid-cols-12 gap-3 " style={{ width: 450, borderRadius: "10px" }}>
                                    <div className="col-span-4">
                                        <Image
                                            src={`${imgUrl}${item?.image?.[0]}`}
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
                                                    onClick={(e) => handleWishList({ e, id: item?._id })}
                                                    size={18}
                                                    color={isInWishlist || item?.isFavorite ? "#083a65" : "#083a65"}
                                                    fill={isInWishlist || item?.isFavorite ? "#083a65" : "transparent"}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#FFD139] mt-1">
                                            <AiFillStar size={16} />
                                            <span className="text-[#767676] text-sm font-normal">{item?.avgRating} ({item?.totalReviews})</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <div className="flex items-center gap-2 mt-1 text-[#767676] text-sm font-normal">
                                                <TfiLocationPin size={16} color="#767676" />
                                                <span>{item?.address}</span>
                                            </div>
                                            <div className="mt-1 text-primary font-medium text-[16px]">{item?.roomPrice} <span className="text-[#767676]  font-normal text-sm">/{item?.roomType}</span></div>
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