export const staticChatList = [
    {
        chatId: "chat1",
        profile: "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=270&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxpbnN0YWdyYW0lMjBwcm9maWxlfGVufDB8fDB8fHww",
        name: "John Doe",
        type: "text",
        lastMessage: {
            _id: "msg1",
            sender: "user2",
            text: "Hey, how's it going?",
            createdAt: "2025-08-04T10:00:00Z",
            image: "",
            type: "text",
        },
    },
    {
        chatId: "chat2",
        profile: "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGluc3RhZ3JhbSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        name: "Jane Smith",
        type: "image",
        lastMessage: {
            _id: "msg2",
            sender: "user1",
            text: "",
            createdAt: "2025-08-04T09:50:00Z",
            image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D",
            type: "image",
        },
    },
];

export const staticMessageList = {
    chat1: [
        {
            text: "Hi John!",
            sender: { _id: "user1", name: "Current User", profile: "", address: "" },
            type: "text",
            doc: "",
            chatId: "chat1",
            image: "",
            createdAt: "2025-08-04T09:45:00Z",
        },
        {
            text: "Hey, how's it going?",
            sender: { _id: "user2", name: "John Doe", profile: "", address: "" },
            type: "text",
            doc: "",
            chatId: "chat1",
            image: "",
            createdAt: "2025-08-04T10:00:00Z",
        },
        {
            text: "Hi John!",
            sender: { _id: "user1", name: "Current User", profile: "", address: "" },
            type: "text",
            doc: "",
            chatId: "chat1",
            image: "",
            createdAt: "2025-08-04T09:45:00Z",
        },
        {
            text: "Hey, how's it going?",
            sender: { _id: "user2", name: "John Doe", profile: "", address: "" },
            type: "text",
            doc: "",
            chatId: "chat1",
            image: "",
            createdAt: "2025-08-04T10:00:00Z",
        },
    ],
    chat2: [
        {
            text: "",
            sender: { _id: "user1", name: "Current User", profile: "", address: "" },
            type: "image",
            doc: "",
            chatId: "chat2",
            image: "https://plus.unsplash.com/premium_photo-1678752717095-08cd0bd1d7e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJvb218ZW58MHx8MHx8fDA%3D",
            createdAt: "2025-08-04T09:50:00Z",
        },
    ],
};