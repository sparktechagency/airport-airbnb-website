
import dynamic from 'next/dynamic';
import React from 'react';


const StepsOfHost = dynamic(() => import('@/components/ui/website/steps-of-host/StepsOfHost'), {
  ssr: false,
});
const stepsOfHostPage = () => {
    return (
        <div>
            <StepsOfHost />
        </div>
    );
};

export default stepsOfHostPage;