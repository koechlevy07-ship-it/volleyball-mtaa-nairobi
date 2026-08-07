"use client";

import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/lib/socket";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MessageSquare, Send, Wifi, WifiOff } from "lucide-react";

interface ChatMessage {
  id: string | number;
  user: string;
  message: string;
  timestamp?: string;
}

interface TournamentChatProps {
  tournamentId: string;
  tournamentTitle?: string;
}

export const TournamentChat = ({ tournamentId, tournamentTitle = "Tournament Chat" }: TournamentChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("Guest");
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef(getSocket());

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("vmn_username");
      if (saved) setUserName(saved);
    }
  }, []);

  useEffect(() => {
    const socket = socketRef.current;

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handlePrevious = (previous: ChatMessage[]) => {
      if (Array.isArray(previous)) setMessages(previous);
    };
    const handleReceive = (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("previous_messages", handlePrevious);
    socket.on("receive_message", handleReceive);

    socket.emit("join_room", tournamentId);

    return () => {
      socket.emit("leave_room", tournamentId);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("previous_messages", handlePrevious);
      socket.off("receive_message", handleReceive);
    };
  }, [tournamentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setIsSending(true);
    socketRef.current.emit("send_message", {
      tournamentId,
      user: userName || "Guest",
      message: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    setInput("");
    setTimeout(() => setIsSending(false), 300);
  };

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-3 bg-vball-navy text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-vball-yellow" />
          <div>
            <h3 className="font-bold text-sm leading-tight">{tournamentTitle}</h3>
            <p className="text-[10px] text-gray-300">Live room</p>
          </div>
        </div>
        <span className={`flex items-center gap-1 text-[10px] font-semibold ${isConnected ? "text-green-400" : "text-red-400"}`}>
          {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
          {isConnected ? "Online" : "Offline"}
        </span>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <label htmlFor="chat-username" className="text-xs text-gray-500 whitespace-nowrap">
            As:
          </label>
          <input
            id="chat-username"
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              window.localStorage.setItem("vmn_username", e.target.value);
            }}
            className="flex-1 bg-vball-bg rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-vball-blue"
            placeholder="Your name"
          />
        </div>

        <div className="h-72 overflow-y-auto space-y-2 mb-3 pr-1">
          {messages.length === 0 && (
            <p className="text-xs text-gray-400 text-center mt-8">
              No messages yet. Be the first to say something!
            </p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                msg.user === userName
                  ? "bg-vball-blue text-white ml-auto"
                  : "bg-vball-bg text-vball-text"
              }`}
            >
              <div className={`text-[10px] font-semibold ${msg.user === userName ? "text-white/80" : "text-vball-blue"}`}>
                {msg.user}
              </div>
              <p className="break-words">{msg.message}</p>
              {msg.timestamp && (
                <div className={`text-[9px] mt-1 ${msg.user === userName ? "text-white/60" : "text-gray-400"}`}>
                  {msg.timestamp}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="flex-1 bg-vball-bg rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vball-blue"
            placeholder="Type a message..."
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || isSending} aria-label="Send message">
            <Send size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};
