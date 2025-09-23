const SocialLogin = () => {
    
    return ( 
        <div className=" flex items-center gap-6 w-full"> 
        <div
            //  onClick={() => {
            //     window.location.href = "http://31.97.171.35:5001/api/v1/auth/google";
            // }} 
            className=" flex items-center cursor-pointer gap-1 px-4 py-1 bg-white border  border-[#E0E0E0] rounded-full mb-4 h-[48px] w-full">
            <div className=" flex items-center justify-center gap-3 w-full ">
                <img src="/google.png" alt="" className="w-[24px] h-[24px] object-contain" />
                <p className="text-[#636363] text-[16px] ">Continue with Google</p>
            </div>
        </div> 

        <div
            //  onClick={() => {
            //     window.location.href = "http://31.97.171.35:5001/api/v1/auth/google";
            // }} 
            className=" flex items-center cursor-pointer w-full gap-1 px-4 py-1 bg-white border  border-[#E0E0E0] rounded-full mb-4 h-[48px]">
            <div className=" flex items-center justify-center gap-3 w-full ">
                <img src="/facebook.png" alt="" className="w-[24px] h-[24px] object-contain" />
                <p className="text-[#636363] text-[16px] ">Continue with Facebook</p>
            </div>
        </div>

        </div>
    );
};

export default SocialLogin;