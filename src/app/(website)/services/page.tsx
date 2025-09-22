import Services, { IsearchParams } from '@/components/ui/website/services/Services';
import React from 'react';

const servicesPage = ({searchParams}:{searchParams:IsearchParams}) => {
 
    
    return (
        <div>
            <Services searchParams={searchParams} />
        </div>
    );
};

export default servicesPage;