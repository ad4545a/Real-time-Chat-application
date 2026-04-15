import { motion } from "framer-motion";
import {
  RiFlashlightFill,
  RiShieldCheckLine,
  RiGroupLine,
  RiEyeOffLine,
  RiNotification3Line,
  RiDeviceLine,
} from "react-icons/ri";

const features = [
  {
    icon: RiFlashlightFill,
    label: "SPEED",
    title: "Instant Delivery",
    desc: "WebSocket-powered real-time architecture optimised for zero-latency text streaming.",
  },
  {
    icon: RiShieldCheckLine,
    label: "SECURITY",
    title: "Secure Auth",
    desc: "Enterprise-grade Clerk authentication — your conversations stay locked down.",
  },
  {
    icon: RiGroupLine,
    label: "MESSAGING",
    title: "Private Chats",
    desc: "Persistent direct messages. Pick up exactly where you left off, every time.",
  },
  {
    icon: RiEyeOffLine,
    label: "PRESENCE",
    title: "Live Status",
    desc: "Millisecond-accurate online indicators and typing events.",
  },
  {
    icon: RiNotification3Line,
    label: "ALERTS",
    title: "Smart Alerts",
    desc: "Notification sounds and OS-level alerts — interrupts only when it matters.",
  },
  {
    icon: RiDeviceLine,
    label: "LAYOUT",
    title: "Adaptive UI",
    desc: "Mobile-first, pixel-perfect across every device from wrist to ultrawide.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-12 sm:py-20 lg:py-24 bg-base border-t-2 border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 border-l-4 border-accent pl-4 sm:pl-5"
        >
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-accent mb-2 sm:mb-3">
            Features
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase text-white leading-tight">
            Built Different.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="group bg-base border-2 border-white p-5 sm:p-6 cursor-default
                         hover:border-accent hover:shadow-neo hover:-translate-x-1 hover:-translate-y-1
                         transition-[border-color,box-shadow,transform] duration-100"
            >
              <div className="flex items-start justify-between mb-4 sm:mb-5">
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-muted pt-0.5">
                  {f.label}
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-white bg-surface-2 flex items-center justify-center flex-shrink-0
                                group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                  <f.icon className="text-white text-base sm:text-lg group-hover:text-accent transition-colors" />
                </div>
              </div>

              <h3 className="font-display font-black text-base sm:text-lg lg:text-xl uppercase
                             text-white mb-2 sm:mb-3 tracking-tight leading-tight">
                {f.title}
              </h3>
              <p className="text-muted text-xs sm:text-sm font-body leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}