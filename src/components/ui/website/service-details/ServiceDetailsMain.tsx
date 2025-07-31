import AboutSchedule from "./AboutSchedule";
import BookNow from "./BookNow";
import CancellationPolicy from "./CancellationPolicy";
import CustomerExperience from "./CustomerExperience";
import DetailsTitle from "./DetailsTitle";
import FacilityList from "./Facilities";
import HouseRules from "./HouseRules";
import Sliders from "./Sliders";

const ServiceDetailsMain = () => {
    const images = [
        "https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1676823547757-f00b51e17eff?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1676823570969-da7d0074804d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1676823552868-7aedd7d57971?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1661956080119-71234af803b3?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
    return (
        <div className="container pb-14 pt-3"> 
        <DetailsTitle />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
                <div className=" col-span-8 ">
                    <Sliders images={images} />
                </div>

                <div className="col-span-4">
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