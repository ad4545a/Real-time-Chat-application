import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSendPlaneFill,
  RiArrowLeftLine,
  RiChat3Line,
  RiArrowDownLine,
} from "react-icons/ri";
import MessageBubble from "./MessageBubble";
import { getOrCreateConversation, getMessages } from "../utils/api";
import { useSound } from "../hooks/useSound";
import { useNotification } from "../hooks/useNotification";


const getDateLabel = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "TODAY";
  if (date.toDateString() === yesterday.toDateString()) return "YESTERDAY";
  return date
    .toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })
    .toUpperCase();
};

const DateSeparator = ({ date }) => (
  <div className="flex items-center gap-3 py-2 px-1">
    <div className="flex-1 h-px bg-white/10" />
    <span className="text-[9px] font-mono uppercase tracking-widest text-muted border border-white/10 px-2 py-0.5 bg-base">
      {getDateLabel(date)}
    </span>
    <div className="flex-1 h-px bg-white/10" />
  </div>
);

const MAX_CHARS = 2000;

export default function ChatBox({
  selectedUser,
  currentUserId,
  token,
  socket,
  onlineUsers,
  onBack,
  onMessageReceived,
}) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [newMsgCount, setNewMsgCount] = useState(0);

  const bottomRef = useRef(null);
  const msgContainerRef = useRef(null);
  const isAtBottomRef = useRef(true);
  const typingTimeout = useRef(null);
  const inputRef = useRef(null);

  const { playSend, playReceive } = useSound();
  const { showNotification } = useNotification();

  const isOnline = Array.isArray(onlineUsers)
    ? onlineUsers.includes(selectedUser?.clerkId)
    : false;


  const messagesWithSeparators = useMemo(() => {
    const items = [];
    let lastDateStr = null;
    messages.forEach((msg) => {
      const dateStr = new Date(msg.createdAt).toDateString();
      if (dateStr !== lastDateStr) {
        items.push({ _id: `sep-${dateStr}-${msg._id}`, type: "separator", date: msg.createdAt });
        lastDateStr = dateStr;
      }
      items.push({ ...msg, type: "message" });
    });
    return items;
  }, [messages]);


  const handleScroll = () => {
    const el = msgContainerRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distFromBottom < 80;
    isAtBottomRef.current = atBottom;
    setShowScrollBtn(!atBottom);
    if (atBottom) setNewMsgCount(0);
  };

  const scrollToBottom = useCallback((force = false) => {
    if (force || isAtBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToBottomForced = useCallback(() => {
    isAtBottomRef.current = true;
    setShowScrollBtn(false);
    setNewMsgCount(0);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);


  useEffect(() => {
    if (!selectedUser || !token) return;

    let cancelled = false;
    setNewMsgCount(0);
    setShowScrollBtn(false);
    isAtBottomRef.current = true;

    const load = async () => {
      setLoading(true);
      setMessages([]);
      setConversationId(null);
      try {
        const convRes = await getOrCreateConversation(selectedUser.clerkId, token);
        const conv = convRes?.data;
        if (!conv?._id || cancelled) return;
        setConversationId(conv._id);
        const msgRes = await getMessages(conv._id, token);
        if (!cancelled) {
          setMessages(Array.isArray(msgRes?.data) ? msgRes.data : []);
          setTimeout(() => bottomRef.current?.scrollIntoView(), 80);
        }
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    inputRef.current?.focus();
    return () => { cancelled = true; };
  }, [selectedUser, token]);


  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && selectedUser) onBack?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedUser, onBack]);


  useEffect(() => {
    if (!socket) return;

    const handleMessage = (msg) => {
      const isFromSelected = msg.senderId === selectedUser?.clerkId;
      const isFromMe = msg.senderId === currentUserId;
      const isInThis = msg.conversationId === conversationId;

      if ((isFromSelected || isFromMe) && isInThis) {
        setMessages((prev) => {
          const exists = prev.some((m) => m._id === msg._id);
          return exists ? prev : [...prev, msg];
        });

        if (!isFromMe) {
          playReceive();
          showNotification(
            selectedUser?.username || "New message",
            msg.text,
            selectedUser?.profileImage
          );
          if (!isAtBottomRef.current) {
            setNewMsgCount((n) => n + 1);
          }
        }

        setTimeout(() => scrollToBottom(), 50);
      } else if (!isFromMe) {
        onMessageReceived?.(msg.senderId);
        playReceive();
        showNotification(
          selectedUser?.username || "New message",
          msg.text,
          selectedUser?.profileImage
        );
      }
    };

    const handleTyping = ({ senderId, isTyping: t }) => {
      if (senderId === selectedUser?.clerkId) setIsTyping(t);
    };

    socket.on("receive_message", handleMessage);
    socket.on("typing", handleTyping);
    return () => {
      socket.off("receive_message", handleMessage);
      socket.off("typing", handleTyping);
    };
  }, [socket, selectedUser, currentUserId, conversationId, playReceive, showNotification, onMessageReceived, scrollToBottom]);


  const emitTyping = useCallback(
    (val) => {
      if (!socket || !selectedUser) return;
      socket.emit("typing", { receiverId: selectedUser.clerkId, isTyping: val });
    },
    [socket, selectedUser]
  );

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val.length > MAX_CHARS) return;
    setText(val);
    emitTyping(true);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => emitTyping(false), 1500);
  };


  const handleSend = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed || !conversationId || !selectedUser || !socket || sending) return;
    setSending(true);
    setText("");
    emitTyping(false);
    socket.emit("send_message", {
      conversationId,
      receiverId: selectedUser.clerkId,
      text: trimmed,
    });
    playSend();
    setSending(false);
    inputRef.current?.focus();
    setTimeout(scrollToBottomForced, 50);
  }, [text, conversationId, selectedUser, socket, sending, emitTyping, playSend, scrollToBottomForced]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-base text-center px-8 gap-5">
        <div className="w-16 h-16 border-2 border-white bg-surface-2 flex items-center justify-center shadow-neo">
          <RiChat3Line className="text-accent text-3xl" />
        </div>
        <div>
          <h2 className="font-display font-black text-lg uppercase tracking-tight text-white mb-2">
            No Conversation Selected
          </h2>
          <p className="text-muted text-sm font-body max-w-xs leading-relaxed">
            Pick a contact from the sidebar to start a real-time conversation.
          </p>
        </div>
        <div className="border-2 border-white/10 px-4 py-2 bg-surface-2">
          <p className="text-[9px] font-mono uppercase tracking-widest text-muted">
            Press <span className="text-accent">Ctrl+K</span> to search · <span className="text-accent">Esc</span> to go back
          </p>
        </div>
      </div>
    );
  }

  const charsLeft = MAX_CHARS - text.length;
  const charsWarning = charsLeft < 200;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base relative">


      <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-white/10 bg-surface flex-shrink-0">
        <button
          onClick={onBack}
          title="Back to contacts (Esc)"
          className="md:hidden w-8 h-8 border-2 border-white bg-surface-2 flex items-center justify-center text-white hover:border-accent hover:text-accent transition-colors"
          aria-label="Back"
        >
          <RiArrowLeftLine className="text-sm" />
        </button>

        <div className="relative flex-shrink-0">
          {selectedUser.profileImage ? (
            <img
              src={selectedUser.profileImage}
              alt={selectedUser.username}
              className="w-9 h-9 object-cover border-2 border-white"
            />
          ) : (
            <div className="w-9 h-9 border-2 border-accent bg-accent flex items-center justify-center font-display font-black text-black text-sm">
              {(selectedUser.username || "U")[0].toUpperCase()}
            </div>
          )}
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border-2 border-base ${
              isOnline ? "bg-mint" : "bg-dim"
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-display font-black text-sm uppercase tracking-tight text-white truncate">
            {selectedUser.username}
          </p>
          <p className={`text-[9px] font-mono uppercase tracking-wider ${isOnline ? "text-mint" : "text-muted"}`}>
            {isTyping ? (
              <motion.span
                className="text-accent"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                TYPING…
              </motion.span>
            ) : isOnline ? (
              "● ONLINE"
            ) : (
              "○ OFFLINE"
            )}
          </p>
        </div>


        {messages.length > 0 && (
          <div className="hidden sm:flex items-center border border-white/15 bg-surface-2 px-2 py-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
              <span className="text-white font-bold">{messages.length}</span> MSG
            </span>
          </div>
        )}
      </div>


      <div
        ref={msgContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1 [&::-webkit-scrollbar]:hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-accent border-t-transparent"
            />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="border-2 border-white/15 bg-surface-2 px-4 py-3 text-center">
              <p className="text-muted text-xs font-mono uppercase tracking-widest mb-1">
                No messages yet
              </p>
              <p className="text-dim text-[9px] font-mono uppercase tracking-widest">
                Say hello to {selectedUser.username} 👋
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messagesWithSeparators.map((item) =>
              item.type === "separator" ? (
                <DateSeparator key={item._id} date={item.date} />
              ) : (
                <MessageBubble
                  key={item._id}
                  message={item}
                  isOwn={item.senderId === currentUserId}
                />
              )
            )}
          </AnimatePresence>
        )}
        <div ref={bottomRef} />
      </div>


      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={scrollToBottomForced}
            className="absolute bottom-[76px] right-4 z-20 neo-btn neo-btn-accent px-3 py-1.5 text-xs shadow-hard flex items-center gap-1.5"
          >
            {newMsgCount > 0 && (
              <span className="font-mono font-black text-[10px]">{newMsgCount} new</span>
            )}
            <RiArrowDownLine className="text-sm" />
          </motion.button>
        )}
      </AnimatePresence>


      <div className="flex-shrink-0 px-3 sm:px-4 py-3 border-t-2 border-white/10 bg-surface">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            rows={1}
            className="neo-input flex-1 resize-none py-2.5 text-sm max-h-32 overflow-y-auto leading-relaxed"
            style={{ fieldSizing: "content" }}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || sending}
            className="neo-btn neo-btn-accent flex-shrink-0 w-10 h-10 p-0 text-base"
            aria-label="Send"
          >
            <RiSendPlaneFill />
          </button>
        </div>


        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-[9px] font-mono text-dim uppercase tracking-widest">
            <span className="text-muted">Enter</span> send ·{" "}
            <span className="text-muted">Shift+Enter</span> newline ·{" "}
            <span className="text-muted">Esc</span> back
          </p>
          {charsWarning && (
            <p
              className={`text-[9px] font-mono uppercase tracking-widest ${
                charsLeft < 50 ? "text-danger" : "text-muted"
              }`}
            >
              {charsLeft} LEFT
            </p>
          )}
        </div>
      </div>
    </div>
  );
}