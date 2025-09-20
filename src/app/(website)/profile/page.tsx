import Profile from '@/components/ui/website/profile/Profile';
import getProfile from '@/helpers/getProfile';
import { myFetch } from '@/helpers/myFetch';
import React, { Suspense } from 'react';

const profilePage = async() => {
    const user = await getProfile()
    const chatLists = await myFetch("/conversation")
    return (
        <div>
            <Suspense>
                <Profile user={user} chatLists={chatLists?.data ?? {}} />
            </Suspense>

        </div>
    );
};

export default profilePage;