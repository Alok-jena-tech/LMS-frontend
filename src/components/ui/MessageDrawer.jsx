import React, { useState, useEffect } from 'react';
import styles from '../../assets/styles/ui/MessageDrawer.module.css';
import { ImCross } from "react-icons/im";
import { FaArrowLeft } from "react-icons/fa";

const initialMessages = [
    {
        id: 1,
        name: "Alex",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        isRead: false,
        messages: [
            { from: "them", text: "Hey, how are you?" },
            { from: "me", text: "I'm good! You?" },
        ],
    },
    {
        id: 2,
        name: "Sara",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        isRead: false,
        messages: [
            { from: "them", text: "Don’t forget our meeting." },
            { from: "me", text: "Sure, 3PM right?" },
        ],
    },
];

const MessageDrawer = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState(initialMessages);
    const [activeChat, setActiveChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setActiveChat(null); // reset view when drawer closes
        }
    }, [isOpen]);

    const handleSend = () => {
        if (!newMessage.trim()) return;

        const updated = messages.map((msg) =>
            msg.id === activeChat.id
                ? {
                    ...msg,
                    messages: [...msg.messages, { from: "me", text: newMessage }],
                }
                : msg
        );
        setMessages(updated);
        setNewMessage("");
    };

    const openChat = (chat) => {
        const updated = messages.map((msg) =>
            msg.id === chat.id ? { ...msg, isRead: true } : msg
        );
        setMessages(updated);
        setActiveChat(chat);
    };

    return (
        <>
            {isOpen && <div className={styles.overlay} onClick={onClose}></div>}

            <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    {activeChat ? (
                        <>
                            <div className={styles.backBtn} onClick={() => setActiveChat(null)}>
                                <FaArrowLeft /> Back
                            </div>
                            <ImCross className={styles.closeIcon} onClick={onClose} />
                        </>
                    ) : (
                        <>
                            <h3>Messages</h3>
                            <ImCross className={styles.closeIcon} onClick={onClose} />
                        </>
                    )}
                </div>

                {!activeChat ? (
                    <div className={styles.notificationList}>
                        {messages.map((chat) => (
                            <div
                                key={chat.id}
                                className={styles.notificationItem}
                                onClick={() => openChat(chat)}
                            >
                                <img src={chat.avatar} className={styles.avatar} alt="user" />
                                <div className={styles.textContent}>
                                    <p className={styles.message}>
                                        {chat.name}
                                        <br />
                                        <span className={styles.time}>
                                            {chat.messages[chat.messages.length - 1].text}
                                        </span>
                                    </p>
                                </div>
                                {!chat.isRead && <span className={styles.unreadDot}></span>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.conversationContainer}>
                        <div className={styles.conversation}>
                            {activeChat.messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={
                                        msg.from === "me" ? styles.sent : styles.received
                                    }
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button onClick={handleSend}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MessageDrawer;
