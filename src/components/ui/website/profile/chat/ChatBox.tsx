"use client"
// import { HiMiniLink } from "react-icons/hi2";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import moment from "moment";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { chatMessageType, TChatbox } from "@/types/profile/chatType";
import { imgUrl } from "@/config/config";

const ChatBox = ({ form, person, user, messageInput, setMessageInput, messageList, scrollRef, imageURL, setImage, setImageURL, pdf, pdfURL, handleSubmit, setIsChatVisible,onScroll }: TChatbox) => {

    
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImageURL(URL.createObjectURL(file));
        }
    };

    // const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file && file.type === "application/pdf") {
    //         setPdf(file);
    //         setPdfURL(URL.createObjectURL(file));
    //     }
    // };

    const handleBackToList = () => {
        setIsChatVisible(false);
        router.push("/profile?tab=7");
    };

    const handleCancelImage = () => {
        setImage(null);
        setImageURL(null);
    };



    return (
        <div>
            <div>
                <div className="flex items-center justify-between h-[66px] px-4 bg-primary rounded-tr-2xl lg:rounded-tl-none rounded-tl-2xl">
                    <div className="flex items-center gap-2">
                        <button className="lg:hidden text-white" onClick={handleBackToList}>
                            <IoMdArrowRoundBack size={20} />
                        </button>
                        <img
                            src={person.profile ? imgUrl + person.profile : "https://tse3.mm.bing.net/th/id/OIP.9PPdes_WSxaqUQJxWab16AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"}
                            alt=""
                            className="rounded-full"
                            style={{ width: "55px", height: "55px" }}
                        />
                        <div>
                            <p className="text-[18px] text-white font-medium">{person.name}</p>
                        </div>
                    </div>
                </div>

         

                <div className="bg-[#F7F7F7] w-full h-[calc(77vh+54px)] rounded-lg relative border-x-2 border-gray-100">
                    {/* Chat Messages */}
                    <div className="py-6 lg:px-8 px-3 overflow-y-auto h-[72vh]" ref={scrollRef} onScroll={onScroll}>
                        {messageList?.map((value: chatMessageType, index: number) => (
                            <div
                                key={index}
                                className={`flex mb-5 w-full ${user._id === value.sender._id ? "justify-end" : "justify-start"
                                    }`}
                            >
                                  <div
                                        className={`lg:w-3/5 w-2/3 lg:px-4 px-2 py-3 rounded-t-xl ${user._id === value.sender._id
                                            ? "rounded-bl-xl bg-[#E6F2F6]"
                                            : "rounded-br-xl bg-[#E5E5E5]"
                                            }`}
                                    >
                                        
                                        { value.image && (
                                            <img src={imgUrl+value.image} alt="sent image" className="max-w-full h-auto rounded" />
                                        )}
                                    
                                        {value.text  && <p className="text-[#333333] text-[14px] break-words whitespace-pre-line">{value.text}</p>}
                                        <p className="text-[#8B8B8B] text-[12px] text-right mt-2">
                                            {moment(value.createdAt).format("hh:mm A")}
                                        </p>
                                    </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-1 w-full py-1 px-1">
                        {imageURL && (
                            <div className="w-fit ms-3 mb-2 bg-gray-200 flex items-center gap-2 relative">
                                <img src={imageURL} alt="" className="w-[100px] h-[100px] p-2" />
                                <button
                                    onClick={handleCancelImage}
                                    className="text-red-800 text-sm font-medium absolute -top-1 -right-1"
                                >
                                    <MdOutlineCancel size={24} />
                                </button>
                            </div>
                        )}

                        {pdfURL && (
                            <div className="w-fit ms-3 mb-2 bg-gray-200 flex items-center gap-2 p-2 rounded">
                                <span className="text-gray-700 font-medium">📄 {pdf?.name}</span>
                                <a
                                    href={pdfURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    Open PDF
                                </a>
                            </div>
                        )}

                        <Form className="flex items-center gap-3 px-3" form={form}>
                            <Input.TextArea
                                value={messageInput}
                                placeholder="Type your message"
                                style={{
                                    flex: 1,
                                    height: "50px",
                                    resize: "none",
                                    paddingTop: "0.5rem",
                                    paddingBottom: "0.5rem",
                                    paddingLeft: "1rem",
                                    paddingRight: "1rem",
                                    borderRadius: "9999px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                                onChange={(e) => setMessageInput(e.target.value)}
                            />
                            <div className="flex items-center gap-4">
                                <input
                                    type="file"
                                    id="img"
                                    className="hidden"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="img">
                                    <CiImageOn color="#607888" size={24} className="cursor-pointer" />
                                </label>

                                {/* <input
                                    type="file"
                                    id="pdfFile"
                                    className="hidden"
                                    accept="image/*,application/pdf"
                                    style={{ display: "none" }}
                                    onChange={handlePdfFileChange}
                                />
                                <label htmlFor="pdfFile">
                                    <HiMiniLink color="#607888" size={24} className="cursor-pointer" />
                                </label> */}

                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="h-[40px] w-[40px] bg-primary text-white rounded-full flex justify-center items-center"
                                >
                                    <IoSendSharp size={22} />
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;