/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
//@ts-nocheck 

"use client";
import { staticChatList, staticMessageList } from "@/constants/Profile/ChatData";
import { TMessageList } from "@/types/profile/chatType";
import { Form, Input } from "antd";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ChatBox from "./ChatBox";


const ChatPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [person, setPerson] = useState<TMessageList | null>(null);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [pdfURL, setPdfURL] = useState<string | null>(null);
  const router = useRouter();
  const [messages, setMessages] = useState(staticChatList);
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);
  const { user } = { user: { _id: "user1", name: "Current User" } };
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [form] = Form.useForm();

  // Filter messages based on keyword
  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(keyword.toLowerCase())
  );

  // Update message list when person changes
  useEffect(() => {
    if (person?.chatId) {
      setMessageList(staticMessageList[person.chatId] || []);
    }
  }, [person]);

  // Scroll to bottom when messageList updates
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messageList]);

  // Handle sending a message
  const handleSubmit = async () => {
    if (!person?.chatId || (!messageInput && !image && !pdf)) return;

    const newMessage = {
      text: messageInput,
      sender: { _id: user._id, name: user.name, profile: "", address: "" },
      type: "",
      doc: pdfURL || "",
      chatId: person.chatId,
      image: imageURL || "",
      createdAt: new Date().toISOString(),
    };

    // Determine message type
    if (image && messageInput) {
      newMessage.type = "both";
    } else if (image) {
      newMessage.type = "image";
    } else if (pdf) {
      newMessage.type = "doc";
    } else if (messageInput) {
      newMessage.type = "text";
    }

    // Update message list
    setMessageList((prev) => [...prev, newMessage]);

    // Update chat list with last message
    setMessages((prev) =>
      prev.map((chat) =>
        chat.chatId === person.chatId
          ? {
              ...chat,
              lastMessage: {
                _id: `msg${Date.now()}`,
                sender: user._id,
                text: messageInput,
                createdAt: new Date().toISOString(),
                image: imageURL || "",
                type: newMessage.type,
              },
            }
          : chat
      )
    );

    // Reset inputs
    setMessageInput("");
    setImage(null);
    setImageURL(null);
    setPdf(null);
    setPdfURL(null);
    form.resetFields();
  };

  const handleMessage = (value: TMessageList) => {
    setPerson(value);
    setIsChatVisible(true);
    router.push(`/profile?tab=7`);
  };



  return (
    <div className="">
      <div className="grid grid-cols-12 h-full rounded-xl">
        {/* Message List */}
        <div
          className={`lg:col-span-4 col-span-12 bg-[#fafbfc] ${
            isChatVisible ? "hidden lg:block" : ""
          }`}
        >
          <div className="h-[66px] bg-primary rounded-tl-2xl lg:rounded-tr-none rounded-tr-2xl flex items-center justify-center" />

          {/* Search */}
          <div className="mx-auto px-2 my-3">
            <Input
              placeholder="Search here..."
              prefix={<FiSearch size={20} color="#868FA0" />}
              style={{ width: "100%", height: 45, fontSize: "14px", background: "#E9E9E9" }}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Message List */}
          <div className="overflow-y-auto h-[75vh] px-2">
            {filteredMessages.map((message: TMessageList) => (
              <div
                key={message.chatId}
                onClick={() => handleMessage(message)}
                className={`flex justify-between  px-2 py-3 rounded-lg mb-3 cursor-pointer shadow ${
                  person?.chatId === message.chatId ? "bg-[#e0e3e4]" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-1">
                  <img
                    src={message.profile}
                    alt=""
                    className="rounded-full object-contain bg-black w-[45px] h-[45px]"
                  />
                  <div>
                    <p className="text-[#12354E] font-medium text-[16px]">{message.name}</p>
                    <p className="text-[#6A6A6A] text-xs">
                      {message.lastMessage.type === "text" ? (
                        message.lastMessage.text
                      ) : message.lastMessage.type === "image" ? (
                        `${message.name} sent an image`
                      ) : message.lastMessage.type === "doc" ? (
                        `${message.name} sent a doc`
                      ) : null}
                    </p>
                  </div>
                </div>
                <p className="text-[#6A6A6A] text-xs">
                  {moment(message.lastMessage.createdAt).format("hh:mm A")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div
          className={`lg:col-span-8 col-span-12 bg-[#F7F7F7] ${
            isChatVisible ? "block" : "hidden lg:block"
          }`}
        >
          {person ? (
             <ChatBox
            form={form}
            person={person}
            user={user}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            setIsChatVisible={setIsChatVisible}
            messageList={messageList}
            scrollRef={scrollRef}
            image={image}
            imageURL={imageURL}
            setImage={setImage}
            setImageURL={setImageURL}
            pdf={pdf}
            pdfURL={pdfURL}
            setPdf={setPdf}
            setPdfURL={setPdfURL} 
            handleSubmit={handleSubmit} 
          />
          ) : (
            <div>
              <div className="flex items-center justify-between h-[66px] px-4 bg-primary rounded-tr-2xl lg:rounded-tl-none rounded-tl-2xl" />
              <div className="flex items-center justify-center mt-10 h-full">
                <p className="text-[18px] text-[#12354E] font-medium">
                  Select a chat to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;