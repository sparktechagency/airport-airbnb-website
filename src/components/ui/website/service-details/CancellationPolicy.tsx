import { CancellationPoliciesData } from "@/constants/ServiceDetails/CancellationPolicies/CancellationPoliciesData";
import { CheckCircle } from "lucide-react";

const CancellationPolicy = () => {
    return (
        <div className="py-[60px]">
            <p className=" text-lg font-medium pb-4  ">Cancellation Policy</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  mx-auto">
                {CancellationPoliciesData.map((policy) => (
                    <div
                        key={policy.id}
                        className="bg-[#F9FAFB]  rounded-md px-4 py-4 flex items-start gap-3 shadow"
                    >
                        <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
                        <div>
                            <h3 className="text-sm font-medium text-[#333333]">{policy.title}</h3>
                            <p className="text-xs text-[#B0B0B0]">{policy.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CancellationPolicy;