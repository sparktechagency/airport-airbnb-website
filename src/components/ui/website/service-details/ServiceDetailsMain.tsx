import CancellationPolicy from "./CancellationPolicy";
import CustomerExperience from "./CustomerExperience";

const ServiceDetailsMain = () => {
    return (
        <div className="container pb-14 pt-7">
            <CancellationPolicy />
           <CustomerExperience /> 
        </div>
    );
};

export default ServiceDetailsMain;