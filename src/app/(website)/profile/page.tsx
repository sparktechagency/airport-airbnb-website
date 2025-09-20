import Profile from '@/components/ui/website/profile/Profile';
import getProfile from '@/helpers/getProfile';
import { myFetch } from '@/helpers/myFetch';
import React, { Suspense } from 'react';

const profilePage = async() => {
    const user = await getProfile() as any;
    const chatLists = await myFetch("/conversation",{
        method:"GET",
        tags: ["chatLists"],
        cache:"no-store"
    })
    // console.log(chatLists);
    return (
        <div>
            <Suspense>
                <Profile user={user} chatLists={chatLists?.data ?? {}} />
            </Suspense>

        </div>
    );
};

export default profilePage;