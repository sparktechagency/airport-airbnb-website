import SingleServiceCard from "@/components/shared/SingleServiceCard";
import { myFetch } from "@/helpers/myFetch";
import { HotelRoom } from "@/types/webPagesType";

const SavedItem = async () => {
    const params = new URLSearchParams({
        fields: "name,image,address,roomType,totalReviews,avgRating,roomPrice,location,isFavorite",
    });
    const res = await myFetch(`/favourite?${params.toString()}`, {
        tags: ["hotels"],
        method: "GET",
        cache: "no-store"
    });

const favoriteItemsData = res?.data?.result
    console.log(favoriteItemsData);
    return (
        <div className=' container pb-14 pt-7 min-h-screen  '>
            <div className='flex justify-between items-center mb-6'>
                <h3 className='font-medium lg:text-[24px] text-xl text-[#333333] '> Saved Item </h3>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center'>
                {
                    favoriteItemsData?.map((property:HotelRoom, index:number) => (
                        <SingleServiceCard key={index} property={property} />
                    ))
                }
            </div>
        </div>
    );
};

export default SavedItem;