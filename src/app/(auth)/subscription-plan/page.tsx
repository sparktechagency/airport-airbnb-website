
import SubscriptionsPlans from '@/components/ui/auth/subscription-plan/SubscriptionsPlans';
import { myFetch } from '@/helpers/myFetch';
import React from 'react';

const SubscriptionsPage = async() => {
    const res = await myFetch(`/verification-plan`, {
        method: "GET",
    });

    return (
        <div>
            <SubscriptionsPlans subscriptionData={res?.data}/>
        </div>
    );
};

export default SubscriptionsPage;