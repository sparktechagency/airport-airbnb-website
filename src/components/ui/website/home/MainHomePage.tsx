import WhyUse from "@/components/shared/WhyUse";
import Banner from "./Banner";
import NearestRooms from "./NearestRooms";
import { myFetch } from "@/helpers/myFetch";
import getProfile from "@/helpers/getProfile";
// import FilterOptions from "./FilterOptions";

const MainHomePage = async () => {

    const profile = await getProfile()

    const params = new URLSearchParams({
        fields: "name,image,address,roomType,totalReviews,avgRating,roomPrice,location,isFavorite",
        userId: profile?._id
    }); 

    const res = await myFetch(`/hotel?${params.toString()}`, { 
        tags: ["hotels"],
        method: "GET",
    }); 

 
    return (
        <div>
            <Banner />
            {/* <FilterOptions/> */}
            <NearestRooms rooms={res?.data?.result} />
            <WhyUse />
        </div>
    );
};

export default MainHomePage;