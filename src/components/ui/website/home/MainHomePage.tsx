import WhyUse from "@/components/shared/WhyUse";
import Banner from "./Banner";
import NearestRooms from "./NearestRooms";

const MainHomePage = () => {
    return (
        <div>
            <Banner />  
            <NearestRooms />
            <WhyUse />
        </div>
    );
};

export default MainHomePage;