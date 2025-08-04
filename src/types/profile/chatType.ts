import { FormInstance } from "antd";

export interface TSender {
    _id: string;
    name: string;
    profile: string;
    address: string;
}

export interface TMessageItem {
    text: string;
    sender: TSender;
    type: "text" | "image" | "doc" | "both";
    doc?: string;
    chatId: string;
    image?: string;
    createdAt: string;
}

export interface TMessageList {
    chatId: string;
    profile: string;
    name: string;
    type: string;
    lastMessage: {
        _id: string;
        sender: string;
        text: string;
        createdAt: string;
        image: string;
        type: string;
    };
}

export interface TChatbox {
    form: FormInstance;
    person: TMessageList;
    user: { _id: string; name: string };
    messageInput: string;
    setMessageInput: (v: string) => void;
    messageList: TMessageItem[];
    scrollRef: React.RefObject<HTMLDivElement>;
    image: File | null;
    imageURL: string | null;
    setImage: (file: File | null) => void;
    setImageURL: (url: string | null) => void;
    pdf: File | null;
    pdfURL: string | null;
    setPdf: (file: File | null) => void;
    setPdfURL: (url: string | null) => void;
    handleSubmit: () => void;
    setIsChatVisible: (v: boolean) => void;
}

export interface chatMessageType {
    sender: { _id: string },
    text: string,
    type: string,
    createdAt: string,
    image?: string;
    doc?: string;
}