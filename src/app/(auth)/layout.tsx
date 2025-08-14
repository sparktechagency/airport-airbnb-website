import React from 'react'; 
import { Poppins } from 'next/font/google'; 
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div
        className="w-full flex items-center justify-center relative  min-h-screen "
        style={{
            minHeight: "100vh",
        }}
    >
        
        <div
            style={{
                backgroundImage: `url('/authBg.svg')`,
                backgroundPosition: 'bottom right',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
            }}
        ></div>
    
     
        <div 
            className={` ${poppins.className}  shadow-xl bg-[#FEFEFEE5]/90 lg:p-8 p-5 rounded-lg w-[100%] relative z-10  overflow-auto`}
        >
           {children}
        </div>
    </div>
    );
};

export default layout;