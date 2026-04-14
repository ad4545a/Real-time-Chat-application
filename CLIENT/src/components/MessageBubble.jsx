import { memo } from "react";
import { motion } from "framer-motion";

const MessageBubble = memo(function MessageBubble({ message, isOwn }) {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`flex ${isOwn ? "justify-end" : "justify-start"} group`}
    >
      <div
        className={`flex flex-col gap-1 max-w-xs sm:max-w-sm md:max-w-md ${
          isOwn ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-2.5 text-sm font-body leading-relaxed border-2 ${
            isOwn
              ? "bg-accent text-black border-black shadow-hard-sm"
              : "bg-surface-2 text-white border-white"
          }`}
        >
          {message.text}
        </div>
        <span className="text-[9px] font-mono text-dim opacity-0 group-hover:opacity-100 transition-opacity px-1 uppercase tracking-widest">
          {time}
        </span>
      </div>
    </motion.div>
  );
});

export default MessageBubble;