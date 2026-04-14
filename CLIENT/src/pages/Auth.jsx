import { useState } from "react";
import { SignIn, SignUp, SignedIn } from "@clerk/clerk-react";
import { Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiFlashlightFill } from "react-icons/ri";
import { clerkAppearance } from "../config/clerkTheme";

export default function Auth() {
  const [mode, setMode] = useState("sign-in");

  return (
    <>
      <SignedIn>
        <Navigate to="/chat" replace />
      </SignedIn>

      <div className="min-h-screen bg-base flex flex-col items-center justify-center px-4 relative overflow-hidden neo-grid-bg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center relative z-10 max-w-md mx-auto"
        >

          <div className="w-full flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-accent border-2 border-black flex items-center justify-center group-hover:shadow-hard-sm transition-shadow">
                <RiFlashlightFill className="text-black text-sm" />
              </div>
              <span className="font-display font-black text-xl text-white uppercase tracking-tight">
                Pulse<span className="text-accent">.</span>
              </span>
            </Link>
            <span className="text-muted text-sm font-body">
              {mode === "sign-in" ? "New here?" : "Have an account?"}
              <button
                onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
                className="text-accent hover:text-white transition-colors ml-1.5 font-bold"
              >
                {mode === "sign-in" ? "Sign up" : "Sign in"}
              </button>
            </span>
          </div>


          <div className="w-full flex border-2 border-white mb-6 shadow-neo">
            {["sign-in", "sign-up"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 font-display font-black text-xs uppercase tracking-widest transition-colors ${
                  mode === m
                    ? "bg-accent text-black"
                    : "bg-surface-2 text-muted hover:text-white"
                }`}
              >
                {m === "sign-in" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>


          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="w-full"
            >
              {mode === "sign-in" ? (
                <SignIn
                  routing="hash"
                  afterSignInUrl="/chat"
                  appearance={clerkAppearance}
                />
              ) : (
                <SignUp
                  routing="hash"
                  afterSignUpUrl="/chat"
                  appearance={clerkAppearance}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}