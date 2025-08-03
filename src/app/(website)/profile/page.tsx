import Profile from '@/components/ui/website/profile/Profile';
import React, { Suspense } from 'react';

const profilePage = () => {
    return (
        <div>
            <Suspense>
                <Profile />
            </Suspense>

        </div>
    );
};

export default profilePage;