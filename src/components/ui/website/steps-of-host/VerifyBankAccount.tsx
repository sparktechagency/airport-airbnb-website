'use client';
import getProfile from '@/helpers/getProfile';
import { myFetch } from '@/helpers/myFetch';
import { IUser } from '@/types/profile/userType';
import React, { useEffect } from 'react';

const VerifyBankAccount = () => {
    const setUpBakAccount = async ()=>{
        const res = await myFetch("/stripe/create-link",{
            method:"GET",
            cache:"no-store"
        })

        if(res?.success){
            globalThis?.window?.open(res?.data?.createAccountLink,"_blank")
        }
    }
    const [user,setUser] = React.useState<IUser>()
    useEffect(()=>{
        getProfile().then(data=>setUser(data))
    },[])
    return (
        <div className='w-1/2'>
            <div className='  w-full pt-5'>
                {
                    !user?.stripeConnectedLink?<button onClick={setUpBakAccount} className=' bg-primary text-white rounded h-[45px] font-normal text-xl w-full  '> Connect with bank </button>
                    : <a href={user?.stripeConnectedLink} target='_blank' className=' bg-primary text-white rounded h-[45px] font-normal text-xl w-full flex items-center justify-center  '> Go to Dashboard </a>
                }
                
            </div>
        </div>
    );
};

export default VerifyBankAccount;