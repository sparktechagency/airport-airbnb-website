import { myFetch } from "@/helpers/myFetch";
import AboutSchedule from "./AboutSchedule";
import BookNow from "./BookNow";
import CancellationPolicy from "./CancellationPolicy";
import CustomerExperience from "./CustomerExperience";
import DetailsTitle from "./DetailsTitle";
import FacilityList from "./Facilities";
import HouseRules from "./HouseRules";
import Sliders from "./Sliders";


const ServiceDetailsMain = async ({ id }: { id: string }) => {

    const res = await myFetch(`/hotel/${id}`, {
        method: "GET",
        cache: "no-cache",
        tags: ["hotel-details"]
    });

    const data = res?.data
    const images = data?.image

    // review  

    const reviewRes = await myFetch(`/review/hotel/${id}`, {
        method: "GET",
    })
    const reviewsData = reviewRes?.data?.data

    return (
        <div className="container pb-14 pt-3">
            <DetailsTitle id={data?._id} isFavorite={data?.isFavorite} serviceName={data?.name} />
            <div className="grid grid-cols-12  gap-7">
                <div className=" lg:col-span-8 col-span-12 ">
                    <Sliders images={images} />
                </div>

                <div className="lg:col-span-4 col-span-12">
                    <BookNow roomPrice={data?.roomPrice} location={data?.location} id={data?._id} />
                </div>
            </div>
            <AboutSchedule description={data?.description} roomClosureDates={data?.roomClosureDates} />
            <FacilityList facilities={data?.facilities} />
            <HouseRules hotelRules={data?.hotelRules} />
            <CancellationPolicy />
            <CustomerExperience reviewsData={reviewsData}/>
        </div>
    );
};

export default ServiceDetailsMain;