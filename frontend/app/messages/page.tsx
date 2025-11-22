"use client";

import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useEffect, useState, useRef } from "react";
import { Message, User, UserRole } from "@/types";
import { formatRelativeTime } from "@/lib/utils";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<
    Array<{ user: User; lastMessage: Message }>
  >([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock data - will connect to API later
    const mockConversations = [
      {
        user: {
          id: "2",
          email: "user2@example.com",
          username: "organizer1",
          displayName: "Sarah Organizer",
          isEmailVerified: true,
          isActive: true,
          role: UserRole.ADMIN,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        lastMessage: {
          id: "1",
          content: "Thanks for volunteering!",
          senderId: "2",
          receiverId: "1",
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      },
      {
        user: {
          id: "3",
          email: "user3@example.com",
          username: "volunteer2",
          displayName: "Mike Volunteer",
          isEmailVerified: true,
          isActive: true,
          role: UserRole.USER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        lastMessage: {
          id: "2",
          content: "See you at the event!",
          senderId: "3",
          receiverId: "1",
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
      },
    ];

    setConversations(mockConversations);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Mock messages - will connect to API later
      const mockMessages: Message[] = [
        {
          id: "1",
          content: "Hi! Are you still available for the event?",
          senderId: selectedConversation,
          receiverId: "1",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "2",
          content: "Yes, I'm still available!",
          senderId: "1",
          receiverId: selectedConversation,
          createdAt: new Date(Date.now() - 82800000).toISOString(),
        },
        {
          id: "3",
          content: "Great! See you there.",
          senderId: selectedConversation,
          receiverId: "1",
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ];

      setMessages(mockMessages);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: "1",
      receiverId: selectedConversation,
      createdAt: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const selectedUser = conversations.find(
    (c) => c.user.id === selectedConversation
  )?.user;

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Chat with volunteers and organizers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Conversations</h2>
            </div>
            <div className="overflow-y-auto h-full">
              {conversations.map((conversation) => (
                <button
                  key={conversation.user.id}
                  onClick={() => setSelectedConversation(conversation.user.id)}
                  className={`w-full p-4 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.user.id
                      ? "bg-blue-50 border-l-4 border-l-blue-600"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {conversation.user.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conversation.user.displayName}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatRelativeTime(conversation.lastMessage.createdAt)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Chat Panel */}
          <div className="md:col-span-2">
            {selectedConversation && selectedUser ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedUser.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedUser.displayName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        @{selectedUser.username}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => {
                    const isOwn = message.senderId === "1";
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            isOwn
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isOwn ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {formatRelativeTime(message.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 text-lg">
                    Select a conversation to start chatting
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
