import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RiArrowRightLine, RiFlashlightFill } from "react-icons/ri";

const steps = [
  {
    num: "01",
    label: "IDENTITY",
    title: "Authenticate",
    desc: "Single-click login via Google or GitHub. Secure, instant entry into the network.",
  },
  {
    num: "02",
    label: "SESSION",
    title: "Connect",
    desc: "Instantly discover your peers. State-of-the-art socket pooling handles the rest.",
  },
  {
    num: "03",
    label: "MESSAGING",
    title: "Converse",
    desc: "Real-time sub-100ms message delivery. End-to-end, no compromise.",
  },
];

export function HowItWorks() {
  const navigate = useNavigate();

  return (
    <>
      <section
        id="how-it-works"
        className="py-12 sm:py-20 lg:py-24 bg-base border-t-2 border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">

            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
                Process
              </p>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase leading-[0.95] tracking-tight text-white mb-4 sm:mb-6">
                Three Steps.<br />
                <span className="text-accent">Zero Friction.</span>
              </h2>
              <p className="text-muted font-body font-light leading-relaxed mb-8 sm:mb-10 max-w-sm text-sm sm:text-base">
                We engineered a frictionless onboarding flow. From cold start to active
                conversation in under three seconds.
              </p>
              <button
                onClick={() => navigate("/auth")}
                className="neo-btn neo-btn-ghost uppercase tracking-widest py-3 px-7 text-xs sm:text-sm
                           w-full sm:w-auto whitespace-nowrap"
              >
                Start Now
                <RiArrowRightLine className="ml-2 text-accent flex-shrink-0" />
              </button>
            </motion.div>

            {/* Right column — steps */}
            <div className="space-y-3 sm:space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  className="group border-2 border-white bg-surface p-4 sm:p-5 lg:p-6 flex gap-4 sm:gap-5
                             hover:border-accent hover:shadow-neo transition-[border-color,box-shadow] duration-100 cursor-default"
                >
                  {/* Big number */}
                  <div className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-accent
                                 leading-none w-12 sm:w-16 flex-shrink-0
                                 group-hover:scale-110 transition-transform duration-100">
                    {step.num}
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-muted mb-1">
                      {step.label}
                    </p>
                    <h3 className="font-display font-black text-base sm:text-lg lg:text-xl uppercase
                                   text-white mb-1.5 sm:mb-2 tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted font-body text-xs sm:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="py-20 sm:py-28 lg:py-32 bg-base border-t-2 border-white/10 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white leading-none tracking-tight mb-8"
          >
            Join The <br/>
            <span className="text-accent" style={{ textShadow: "4px 4px 0px #1E1E1E" }}>Network.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted font-body text-sm sm:text-base md:text-lg font-medium max-w-lg mx-auto mb-10"
          >
            Deploy instantly. No server setup, no configuration headaches. Just pure real-time communication.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/auth")}
            className="neo-btn neo-btn-accent text-sm sm:text-base px-10 py-5 uppercase tracking-[0.1em] whitespace-nowrap"
          >
            Get Started Free
            <RiArrowRightLine className="ml-2 font-bold" />
          </motion.button>
        </div>
      </section>
    </>
  );
}

import { RiGithubFill, RiTwitterXFill, RiDiscordFill } from "react-icons/ri";

export function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Integrations", "Pricing", "Changelog"],
    },
    {
      title: "Resources",
      links: ["Documentation", "API Guidelines", "Community", "Help Center"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Hardware Specs"],
    },
  ];

  return (
    <footer className="bg-base border-t-2 border-white/10 pt-16 pb-8 sm:pt-20 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8 mb-16 sm:mb-20">
          
          {/* Brand Column (takes up 2 cols on lg) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-accent border-2 border-white flex items-center justify-center">
                <RiFlashlightFill className="text-black text-xs" />
              </div>
              <span className="font-display font-black text-white text-lg uppercase tracking-widest">
                Pulse.
              </span>
            </div>
            <p className="text-muted font-body text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              Engineered for absolute real-time delivery. Zero latency, zero compromise. The standard for pure conversation.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center border-2 border-white/20 text-white hover:border-accent hover:text-accent hover:-translate-y-1 transition-all">
                <RiTwitterXFill />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center border-2 border-white/20 text-white hover:border-accent hover:text-accent hover:-translate-y-1 transition-all">
                <RiGithubFill />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center border-2 border-white/20 text-white hover:border-accent hover:text-accent hover:-translate-y-1 transition-all">
                <RiDiscordFill />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-muted hover:text-accent font-body text-xs sm:text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Copyright & Credit */}
        <div className="border-t-2 border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-[10px] sm:text-xs font-mono uppercase tracking-widest text-center sm:text-left">
            © {new Date().getFullYear()} Pulse Engine. All systems operational.
          </p>
          <p className="text-muted text-[10px] sm:text-xs font-mono uppercase tracking-widest text-center sm:text-right">
            Made by PUI's Team
          </p>
        </div>
      </div>
    </footer>
  );
}