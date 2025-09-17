import ServiceDetailsMain from '@/components/ui/website/service-details/ServiceDetailsMain';
import React from 'react';

interface PageProps {
    params: {
        id: string;
    };
}

const productDetailsPage = ({ params }: PageProps) => {
    const { id } = params;
 
    return (
        <div>
            <ServiceDetailsMain id={id} />
        </div>
    );
};

export default productDetailsPage;