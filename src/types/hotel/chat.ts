interface Participant {
  _id: string;
  name: string;
  profilePic: string | null;
  id: string;
}

interface LastMessage {
  text: string;
}

export interface IConversation {
  _id: string;
  creator: string;
  participant: Participant;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  __v: number;
  lastMessage: LastMessage;
}


interface Receiver {
  _id: string;
  name: string;
  id: string;
}

export interface IMessagePopulated {
  _id: string;
  sender: string;          // still just an ID here
  receiver: Receiver;      // populated user
  conversation: string;    // conversation ID
  text: string;
  createdAt: string;       // ISO date string
  updatedAt: string;       // ISO date string
  __v: number;
}


interface Sender {
  _id: string;
  name: string;
  id: string;
}

export interface IMessageWithSenderPopulated {
  _id: string;
  sender: Sender;        // populated sender
  receiver: string;      // receiver as ID
  conversation: string;  // conversation ID
  text: string;
  createdAt: string;     // ISO date string
  updatedAt: string;     // ISO date string
  __v: number;
}
