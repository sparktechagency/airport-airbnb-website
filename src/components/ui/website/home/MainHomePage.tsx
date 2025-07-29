import WhyUse from "@/components/shared/WhyUse";
import Banner from "./Banner";
import NearestRooms from "./NearestRooms";
// import FilterOptions from "./FilterOptions";

const MainHomePage = () => {
    return (
        <div>
            <Banner />   
            {/* <FilterOptions/> */}
            <NearestRooms />
            <WhyUse />
        </div>
    );
};

export default MainHomePage;