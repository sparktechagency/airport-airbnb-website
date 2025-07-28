/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoCloseSharp } from "react-icons/io5";
import { Drawer } from 'antd';
import Link from "next/link";
import Image from "next/image";


const NavbarMobile = ({
    drawerVisible,
    navOptions,
    setDrawerVisible,
    pathname,
}: {
    drawerVisible: boolean;
    navOptions: { label: string | JSX.Element | undefined; path?: string }[];
    setDrawerVisible: (open: boolean) => void;
    pathname: string;
}) => {
    //   const userContextValue = useContext(userContext);
    //   const user = userContextValue?.user; 

    const user = {
        name: "John Doe",
        image: "/user.png"
    }

    return (
        <Drawer
            title={
                <div className="flex items-center justify-between">
                    <img src="/airbnb-logo.png" alt="" className="w-12 h-12 object-fill" />
                    <p>
                        <IoCloseSharp
                            onClick={() => setDrawerVisible(false)}
                            size={20}
                            color="#fff"
                            className="cursor-pointer"
                        />
                    </p>
                </div>
            }
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width="90%"
            style={{ backgroundColor: "#202020" }}
            className="relative"
        >
            <div className="flex flex-col">
                <div className="flex flex-col ">
                    {navOptions.map((option, index) => {
                        const isActive = pathname === option.path;

                        return (
                            <Link
                                key={index}
                                href={option.path ?? "/"}
                                onClick={() => setDrawerVisible(false)}
                            >
                                <div
                                    className={`py-4  text-[16px] font-normal cursor-pointer border-b border-[#4E4E4E]  ${isActive ? "text-[#FFFFFF]" : "text-[#FFFFFF]/60"
                                        }`}
                                >
                                    {option.label}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="absolute bottom-6 w-[90%]">
                    <div className="w-full">
                        <button
                            className="text-[16px] py-3 w-full mb-4 rounded-full font-medium text-[#070707] bg-white"
                            onClick={() => setDrawerVisible(false)}
                        >
                             Be a Host
                        </button>
                        {user ? (
                            <Link
                                href="/account-information"
                                className="flex items-center justify-center gap-2 h-[48px] px-2 cursor-pointer transition border border-white rounded-full"
                            >
                                <Image
                                    src={user?.image}
                                    alt="User Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full h-10 w-10 object-cover cursor-pointer"
                                />
                                <h2 className="text-[16px] font-medium text-white text-center ">
                                    {user?.name}
                                </h2>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <p className="text-[16px] font-normal text-white text-center mt-3">
                                    Login
                                </p>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default NavbarMobile;