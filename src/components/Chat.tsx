"use client";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

interface Messages {
  user: string;
  messages: string;
}

const Chat: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [loader, setLoader] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Old messages
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, { user: "user", messages: prompt }];
      return newMessages;
    });
    setPrompt("");
    setLoader(true);
    const res = await axios.post("/api/message", { prompt });
    const data = await res.data;

    console.log(data.message);
    setLoader(false);
    // New messages
    setMessages((prevMessages) => {
      const newMessages = [
        ...prevMessages,
        { user: "assistant", messages: data.message },
      ];
      return newMessages;
    });
  };

  return (
    <>
      <div className="chat-container md:w-[50%]  justify-center mx-auto flex flex-col h-[85vh] rounded-xl p-6 border border-gray-800 my-2 ">
        {/* Chat history display */}
        <div className="chat-history  justify-center h-96 overflow-y-auto flex-grow ">
          {messages.length === 0 ? (
            <span className="text-gray-800/60 md:text-6xl text-4xl flex justify-center items-center h-full font-serif">
              No messages
            </span>
          ) : (
            messages.map((message, id) => (
              <div
                key={id}
                className={`mb-4 ${
                  message.user === "user" ? "self-end" : "self-start"
                }`}
              >
                <p
                  className={`px-4 py-2 rounded-lg h-auto ${
                    message.user === "user"
                      ? "bg-gray-400/10 w-[50%]  ml-auto text-white"
                      : "bg-gray-200 w-[70%]  text-gray-800"
                  }`}
                >
                {message.messages.replace(/\*/g, '')}
                </p>
              </div>
            ))
          )}
          {loader && <span className="loader"></span>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
      </div>
      <form
        onSubmit={handleSubmit}
        className="chat-input fixed bottom-0 left-0 right-0 mx-auto md:w-[50%] h-auto flex items-center p-2 gap-1   shadow-md"
      >
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          className="chat-input-field flex-grow px-4 py-2 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button className="inline-flex h-11 animate-shimmer items-center justify-center rounded-xl  border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Send
        </button>
      </form>
    </>
  );
};

export default Chat;
