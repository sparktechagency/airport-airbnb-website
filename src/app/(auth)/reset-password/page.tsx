import ResetPassword from '@/components/ui/auth/ResetPassword/ResetPassword';
import React, { Suspense } from 'react';

const ResetPasswordPage = () => {
    return (
        <div> 
            <Suspense> 
           <ResetPassword /> 
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;