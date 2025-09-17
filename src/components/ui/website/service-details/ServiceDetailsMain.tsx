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
    console.log("Hotel ID 234:", id);
    const res = await myFetch(`/hotel/${id}`, {
        method: "GET", 
        cache:"no-cache"
    });

    const data = res?.data
    console.log(data);

    const images = data?.image 

    return (
        <div className="container pb-14 pt-3">
            <DetailsTitle />
            <div className="grid grid-cols-12  gap-7">
                <div className=" lg:col-span-8 col-span-12 ">
                    <Sliders images={images} />
                </div>

                <div className="lg:col-span-4 col-span-12">
                    <BookNow />
                </div>
            </div>
            <AboutSchedule />
            <FacilityList />
            <HouseRules />
            <CancellationPolicy />
            <CustomerExperience />
        </div>
    );
};

export default ServiceDetailsMain;