"use client";

import { useState } from "react";
import { MessageSquare, Send, X, Clock, CheckCircle } from "lucide-react";

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you with Bakyson's ICT solutions today?",
      sender: "agent",
      time: "Just now",
      status: "read",
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = "Just now";
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: now,
      status: "sent",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse = {
        id: Date.now() + 1,
        text: "Thanks for your message! Our support team will get back to you within 24 hours. For urgent matters, call +254 706 897 778.",
        sender: "agent",
        time: now,
        status: "read",
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-2xl shadow-lg hover:scale-105 transition-transform duration-200"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[500px] bg-background rounded-2xl shadow-2xl border border-border/20 flex flex-col overflow-hidden">
          <div className="bg-foreground text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold">Bakyson Support</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const bubbleClass = isUser
                ? "bg-primary text-white"
                : "bg-muted text-foreground";
              const alignClass = isUser
                ? "ml-auto text-right"
                : "mr-auto text-left";
              return (
                <div key={msg.id}>
                  <div className={alignClass}>
                    <div className={`inline-block p-3 rounded-2xl ${bubbleClass}`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className="text-[10px] mt-1 text-opacity-60">
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="mr-auto p-3 rounded-2xl bg-muted text-foreground">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}
          </div>
          <div className="p-3 bg-background border-t border-border/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl border border-border/30 text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none placeholder:text-foreground/40"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-primary text-white px-4 py-3 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
