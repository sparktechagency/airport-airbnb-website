import SingleServiceCard from "@/components/shared/SingleServiceCard";
import { services } from "@/constants/Services/services";
import { Pagination } from "antd";

const GridView = () => {
    return (
        <div>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-3 items-center justify-items-center'>
                {
                    services.map((property, index) => (
                        <SingleServiceCard key={index} property={property} />
                    ))
                }
            </div>   

            <Pagination 
            align="center"
                className="mt-8"
                defaultCurrent={2}
                total={20}
                showSizeChanger={false}
                pageSize={8}
                style={{ textAlign: 'center', marginTop: '20px' }}
            />
        </div>
    );
};

export default GridView;