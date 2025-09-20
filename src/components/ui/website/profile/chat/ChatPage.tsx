/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
//@ts-nocheck

"use client";
import {
  staticChatList,
  staticMessageList,
} from "@/constants/Profile/ChatData";
import { TMessageList } from "@/types/profile/chatType";
import { Form, Input } from "antd";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ChatBox from "./ChatBox";
import {
  IConversation,
  IMessagePopulated,
  IMessageWithSenderPopulated,
} from "@/types/hotel/chat";
import getProfile from "@/helpers/getProfile";
import { myFetch } from "@/helpers/myFetch";
import { text } from "stream/consumers";
import { send } from "process";
import { io, Socket } from "socket.io-client";
import { imgUrl } from "@/config/config";
import { revalidateTags } from "@/helpers/revalidateTags";

const ChatPage = ({ chatData }: { chatData: any }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [person, setPerson] = useState<TMessageList | null>(null);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [pdfURL, setPdfURL] = useState<string | null>(null);
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [clicked, setClicked] = useState(false);
  // const [chatLists, setChatLists] = useState<TMessageList[]>(staticChatList);
  // const [messageList, setMessageList] = useState<chatMessageType[]>(staticMessageList[person?.chatId || ""] || []);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const socket = useMemo(() => io(imgUrl), []) as Socket;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [form] = Form.useForm();
  const pagination = chatData?.pagination;
  const chatLists: IConversation[] = chatData?.data || [];
  const formattedChatLists = chatLists.map((chat) => {
    const otherParticipant = chat.participant;
    const lastMessage = chat.lastMessage;
    return {
      chatId: chat._id,
      profile: otherParticipant.profilePic,
      name: otherParticipant.name,
      personId: otherParticipant._id,
      type: lastMessage.type,
      lastMessage: {
        _id: lastMessage._id,
        sender: lastMessage.sender,
        text: lastMessage.text,
        createdAt: lastMessage.createdAt,
        image: lastMessage.image,
        type: lastMessage.type,
        personId: otherParticipant._id,
      },
    };
  });

  ;
  
  // console.log("🚀 ~ file: ChatPage.tsx:57 ~ ChatPage ~ formattedChatLists:", formattedChatLists);

  useEffect(() => {
    getProfile().then((res) => {
      setUser(res);
    });
  }, []);



  const searchChatLists = (e:ChangeEvent<HTMLInputElement>) => {
    const location = globalThis.window.location?.origin
    const searchParams = new URLSearchParams();
    searchParams.set("tab", "7")
    searchParams.set("search", e.target.value);
    const newUrl = `/profile?${searchParams.toString()}`;
    router.push(newUrl)
    const value = e.target.value;

    setKeyword(value);
  }

  const loadMessagesFunc = async (e: any) => {
    // console.log("Scrolling", e);
    
    const el = e.currentTarget;
    if (el.scrollTop === el.scrollHeight - el.clientHeight) return; // bottom

    if (el.scrollTop === 0 && hasMore) {
      const prevHeight = el.scrollHeight;
      await loadMessages(page + 1, true);
      setPage((p) => p + 1);


      // Maintain scroll position after loading
      setTimeout(() => {
        el.scrollTop = el.scrollHeight - prevHeight;
      }, 0);
    }
  };

  const loadMessages = async (pageNum: number, prepend: boolean = false) => {
    console.log("Loading messages for page:", pageNum);
    
    const res = await myFetch(`/message/${person.chatId}?page=${pageNum}`, {
      method: "GET",
      cache: "no-store",
    });

    const data: IMessagePopulated = res?.data?.data?.length
      ? res?.data?.data?.reverse() || []
      : [];

    const formattedMessages = data.map((msg) => ({
      text: msg.text,
      sender: { _id: msg.sender },
      image: msg.image || "",
      doc: msg.doc || "",
      type: msg.type,
      createdAt: msg.createdAt,
      chatId: msg.conversation,
    }));

    setMessageList((prev) =>
      prepend
        ? [...formattedMessages, ...prev]
        : [...prev, ...formattedMessages]
    );
    setHasMore(data.length > 0);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on(
      `new_message::${person?.chatId || ""}`,
     async (newMessage: IMessageWithSenderPopulated) => {
        await loadInitialMessages();
        revalidateTags(["chatLists"]);
      }
    );
    socket.on(`new_user::${user?._id || ""}`, (data: any) => {
      revalidateTags(["chatLists"]);
    });

  }, [socket, person?.chatId, user?._id]);

 

async function loadInitialMessages() {
   myFetch(`/message/${person.chatId}`, {
        method: "GET",
        cache: "no-store",
      }).then((res) => {
        // console.log("🚀 ~ file: ChatPage.tsx:78 ~ myFetch ~ res:", res);

        const data: IMessagePopulated = res?.data?.data?.length
          ? res?.data?.data?.reverse() || []
          : [];

        const formattedMessages = data.map((msg) => ({
          text: msg.text,
          sender: { _id: msg.sender },
          image: msg.image || "",
          doc: msg.doc || "",
          type: msg.type,
          createdAt: msg.createdAt,
          chatId: msg.conversation,
        }));
        setMessageList(formattedMessages);
      });
}

  useEffect(() => {
    if (person?.chatId) {
     loadInitialMessages()
    }
  }, [person?.chatId, clicked]);

  // Filter messages based on keyword
  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(keyword.toLowerCase())
  );

  // Update message list when person changes
  useEffect(() => {
    if (person?.chatId) {
      setPage(1);
      loadMessages(1);
    }
  }, [person]);

  // Scroll to bottom when messageList updates
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messageList, person?.chatId]);

  // Handle sending a message
  const handleSubmit = async () => {
    // console.log("Submitting message:", { messageInput, image, pdf, person });

    if (!person?.chatId || (!messageInput && !image && !pdf)) return;

    const newMessage = {
      text: messageInput,
      sender: user?._id,
      type: "",
      doc: pdfURL || "",
      chatId: person.chatId,
      image: imageURL || "",
      createdAt: new Date().toISOString(),
    };

    const formData = new FormData();
    formData.append("text", messageInput);
    formData.append("conversation", person.chatId);
    formData.append("receiver", user?._id);
    formData.append("type", newMessage.type);
    formData.append("doc", pdfURL || "");
    formData.append("image", image ? image : "");

    const res = await myFetch("/message", {
      method: "POST",
      body: formData,
    });

    // // Determine message type
    // if (image && messageInput) {
    //   newMessage.type = "both";
    // } else if (image) {
    //   newMessage.type = "image";
    // } else if (pdf) {
    //   newMessage.type = "doc";
    // } else if (messageInput) {
    //   newMessage.type = "text";
    // }

    // // Update message list
    // setMessageList((prev) => [...prev, newMessage]);

    // // Update chat list with last message
    // setMessages((prev) =>
    //   prev.map((chat) =>
    //     chat.chatId === person.chatId
    //       ? {
    //           ...chat,
    //           lastMessage: {
    //             _id: `msg${Date.now()}`,
    //             sender: user._id,
    //             text: messageInput,
    //             createdAt: new Date().toISOString(),
    //             image: imageURL || "",
    //             type: newMessage.type,
    //           },
    //         }
    //       : chat
    //   )
    // );

    // Reset inputs
    setMessageInput("");
    setImage(null);
    setImageURL(null);
    setPdf(null);
    setPdfURL(null);
    
    form.resetFields();
  };

  const handleMessage = (value: TMessageList) => {
    setClicked(() => !clicked);
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
              style={{
                width: "100%",
                height: 45,
                fontSize: "14px",
                background: "#E9E9E9",
              }}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Message List */}
          <div className="overflow-y-auto h-[75vh] px-2">
            {formattedChatLists?.map((message: TMessageList) => (
              <div
                key={message.chatId}
                onClick={() => handleMessage(message)}
                className={`flex justify-between  px-2 py-3 rounded-lg mb-3 cursor-pointer shadow overflow-hidden ${
                  person?.chatId === message.chatId
                    ? "bg-[#e0e3e4]"
                    : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-1 ">
                  <img
                    src={
                      message.profile
                        ? imgUrl + message.profile
                        : "https://tse3.mm.bing.net/th/id/OIP.9PPdes_WSxaqUQJxWab16AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                    }
                    alt=""
                    className="rounded-full object-contain bg-black w-[45px] h-[45px]"
                  />
                  <div>
                    <p className="text-[#12354E] font-medium text-[16px]">
                      {message.name}
                    </p>
                    <p className="text-[#6A6A6A] text-xs truncate w-48">
                      {message?.lastMessage?.text || ""}
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
              onScroll={loadMessagesFunc}
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
