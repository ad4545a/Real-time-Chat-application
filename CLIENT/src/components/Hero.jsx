import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RiArrowRightLine, RiFlashlightFill, RiFireFill } from "react-icons/ri";

const mockMessages = [
  { text: <>New brutalist UI just shipped <RiFireFill className="inline text-accent mb-0.5" /></>, me: false, delay: 0.5 },
  { text: "Those hard borders are everything.", me: true, delay: 0.78 },
  { text: "Sub-50ms confirmed. Deploying now.", me: false, delay: 1.05 },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-16 bg-base">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-24 z-10 
                      flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-center">

        {/* ── Left Column: Copy & CTA ───────────────────────── */}
        <div className="w-full lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center lg:justify-start mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 border-2 border-accent px-3 py-1.5">
              <span className="w-1.5 h-1.5 bg-accent block flex-shrink-0" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-accent whitespace-nowrap">
                Pulse Engine v2.0 — Live
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="font-display font-black uppercase tracking-tight leading-none mb-6 sm:mb-8 text-center lg:text-left break-words w-full"
          >
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-6xl xl:text-[6rem] text-white leading-[0.9] break-all sm:break-normal">
              PURE
            </span>
            <span
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-[4.5rem] text-accent leading-[0.92] mt-1 sm:mt-2 lg:mt-3 break-all sm:break-normal"
              style={{ textShadow: "3px 3px 0px #000000" }}
            >
              CONVERSATION.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-muted text-sm sm:text-base font-body font-light leading-relaxed mb-8 sm:mb-10
                       text-center sm:text-left mx-auto sm:mx-0 max-w-md lg:max-w-xl"
          >
            WebSocket-powered real-time messaging. No latency. No clutter. Just the pure signal.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center sm:justify-start"
          >
            <button
              onClick={() => navigate("/auth")}
              className="neo-btn neo-btn-accent text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4
                         uppercase tracking-[0.1em] w-full sm:w-auto max-w-xs sm:max-w-none whitespace-nowrap"
            >
              Start Chatting
              <RiArrowRightLine className="ml-2 flex-shrink-0" />
            </button>
          </motion.div>
        </div>

        {/* ── Right Column: Chat Mockup ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full lg:col-span-5 max-w-sm sm:max-w-lg lg:max-w-full mx-auto lg:mx-0 mt-4 lg:mt-0"
        >
          <div className="border-2 border-white bg-surface shadow-neo text-left">
            {/* Terminal bar */}
            <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 border-b-2 border-white/15 bg-surface-3">
              <span className="w-2.5 h-2.5 bg-danger block border border-black/30 flex-shrink-0" />
              <span className="w-2.5 h-2.5 bg-accent block border border-black/30 flex-shrink-0" />
              <span className="w-2.5 h-2.5 bg-white/20 block border border-black/30 flex-shrink-0" />
              <span className="ml-2 font-mono text-[9px] sm:text-[10px] text-muted uppercase tracking-widest truncate">
                pulse — product-team · 3 online
              </span>
            </div>

            {/* Messages */}
            <div className="p-4 sm:p-5 lg:p-6 space-y-3 lg:space-y-4">
              {mockMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: msg.delay }}
                  className={`flex ${msg.me ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-[14px] font-body
                                max-w-[88%] sm:max-w-[82%] lg:max-w-[75%] border-2 leading-relaxed
                                ${msg.me
                                  ? "bg-accent text-black border-black shadow-hard-sm"
                                  : "bg-surface-2 text-white border-white"}`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}