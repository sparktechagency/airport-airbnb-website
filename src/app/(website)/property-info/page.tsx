
import dynamic from 'next/dynamic';
import React from 'react';


const PropertyInfo = dynamic(() => import('@/components/ui/website/property-info/PropertyInfo'), {
  ssr: false,
});
const PropertyInfoPage = () => {
    return (
        <div>
             <PropertyInfo />
        </div>
    );
};

export default PropertyInfoPage;