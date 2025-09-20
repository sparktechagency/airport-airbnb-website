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
