import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { RiFlashlightFill, RiArrowRightLine } from "react-icons/ri";
import { userButtonAppearance } from "../config/clerkTheme";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-base border-b-2 border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">


        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent border-2 border-black flex items-center justify-center group-hover:shadow-hard-sm transition-shadow">
            <RiFlashlightFill className="text-black text-xs sm:text-sm" />
          </div>
          <span className="font-display font-black text-base sm:text-xl text-white uppercase tracking-tight">
            Pulse<span className="text-accent">.</span>
          </span>
        </Link>


        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <SignedOut>
            <button
              onClick={() => navigate("/auth")}
              className="neo-btn neo-btn-accent text-[10px] sm:text-sm px-3 sm:px-6 py-2 uppercase tracking-wide whitespace-nowrap"
            >
              Get Started
              <RiArrowRightLine className="ml-1 sm:ml-1.5 flex-shrink-0" />
            </button>
          </SignedOut>

          <SignedIn>

            <button
              onClick={() => navigate("/chat")}
              className="neo-btn neo-btn-accent text-[10px] sm:text-sm px-3 sm:px-6 py-2 uppercase tracking-wide whitespace-nowrap"
            >
              <span className="hidden sm:inline">Back to&nbsp;</span>Chat
              <RiArrowRightLine className="ml-1 sm:ml-1.5 flex-shrink-0" />
            </button>
            <UserButton appearance={userButtonAppearance} />
          </SignedIn>
        </div>
      </div>
    </motion.nav>
  );
}