"use client";
import SingleServiceCard from "@/components/shared/SingleServiceCard";
import { allRoomsType } from "@/types/webPagesType";
import { Pagination } from "antd";
import { usePathname, useRouter } from "next/dist/client/components/navigation";

const GridView = ({ allRooms, pagination }: allRoomsType) => { 
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-3 items-center justify-items-center'>
                {
                    allRooms?.result?.map((property, index) => (
                        <SingleServiceCard key={index} property={property} />
                    ))
                }
            </div>

            <Pagination
                align="center"
                className="mt-8"
                defaultCurrent={1}
                total={pagination?.total || 0}
                showSizeChanger={false}
                onChange={(page) => {
                    router.push(`${pathname}?page=${page}`);
                }}
                pageSize={10}
                style={{ textAlign: 'center', marginTop: '20px' }}
            />
        </div>
    );
};

export default GridView;