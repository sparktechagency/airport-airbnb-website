import Services from '@/components/ui/website/services/Services';
import React from 'react';

const servicesPage = ({searchParams}:{searchParams:any}) => {
 
    
    return (
        <div>
            <Services searchParams={searchParams} />
        </div>
    );
};

export default servicesPage;