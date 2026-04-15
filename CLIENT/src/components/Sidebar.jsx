import { motion, AnimatePresence } from "framer-motion";
import {
  RiSearchLine,
  RiFlashlightFill,
  RiHome3Line,
  RiLogoutBoxRLine,
  RiUserLine,
} from "react-icons/ri";
import { UserButton, useClerk } from "@clerk/clerk-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userButtonAppearance } from "../config/clerkTheme";


export default function Sidebar({
  users,
  selectedUser,
  onSelectUser,
  onlineUsers,
  currentUser,
  unreadCounts = {},
  searchRef,
  isConnected = true,
}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const localSearchRef = useRef(null);
  const inputRef = searchRef || localSearchRef;

  const filteredUsers = (users || [])
    .filter((u) => {
      if (!currentUser?.id) return true;
      if ((users || []).length === 1) return true;
      return u.clerkId !== currentUser.id;
    })
    .filter((u) =>
      (u.username || "").toLowerCase().includes(search.toLowerCase())
    );

  const totalUnread = Object.values(unreadCounts).reduce((s, n) => s + n, 0);
  const onlineCount = onlineUsers?.length || 0;

  const handleSignOut = () => {
    signOut(() => navigate("/"));
  };

  return (
    <aside className="w-full h-full flex flex-col bg-base border-r-2 border-white/10">


      <div className="p-4 border-b-2 border-white/10 bg-surface">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent border-2 border-black flex items-center justify-center flex-shrink-0">
              <RiFlashlightFill className="text-black text-xs" />
            </div>
            <span className="font-display font-black text-white uppercase tracking-widest text-sm">
              Pulse
            </span>
            <AnimatePresence>
              {totalUnread > 0 && (
                <motion.span
                  key="total-badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className="bg-accent text-black text-[9px] font-mono font-black px-1.5 py-0.5 border-2 border-black leading-none"
                >
                  {totalUnread > 99 ? "99+" : totalUnread}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              title="Go to home page"
              className="w-8 h-8 border-2 border-white/30 bg-surface-2 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-colors"
            >
              <RiHome3Line className="text-sm" />
            </button>
            <UserButton appearance={userButtonAppearance} />
          </div>
        </div>


        <div className="relative">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search users…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setSearch("")}
            className="neo-input pl-9 py-2.5 text-sm"
          />
        </div>
      </div>


      <div className="flex items-center border-b border-white/5 bg-surface-2">

        <div className="flex-1 flex items-center gap-1.5 px-3 py-2.5 border-r border-white/5">
          <span className="w-1.5 h-1.5 bg-mint block flex-shrink-0" />
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted truncate">
            <span className="text-mint font-bold">{onlineCount}</span> ONLINE
          </p>
        </div>

        <div className="flex-1 flex items-center gap-1.5 px-3 py-2.5 border-r border-white/5">
          <RiUserLine className="text-muted text-[10px] flex-shrink-0" />
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted truncate">
            <span className="text-white font-bold">{users.length}</span> TOTAL
          </p>
        </div>

        <div className="md:hidden flex items-center gap-1.5 px-3 py-2.5">
          <span
            className={`w-1.5 h-1.5 block flex-shrink-0 ${
              isConnected ? "bg-mint" : "bg-danger"
            }`}
          />
          <p
            className={`font-mono text-[9px] uppercase tracking-[0.12em] ${
              isConnected ? "text-mint" : "text-danger"
            }`}
          >
            {isConnected ? "LIVE" : "OFF"}
          </p>
        </div>
      </div>


      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <RiUserLine className="text-dim text-2xl" />
            <p className="text-muted text-[9px] font-mono uppercase tracking-widest">
              {search ? "No users found" : "No other users yet"}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredUsers.map((user, i) => {
              const isOnline = Array.isArray(onlineUsers)
                ? onlineUsers.includes(user.clerkId)
                : false;
              const isSelected = selectedUser?.clerkId === user.clerkId;
              const unread = unreadCounts[user.clerkId] || 0;

              return (
                <motion.button
                  key={user.clerkId}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => onSelectUser(user)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-white/5 transition-colors border-l-4 ${
                    isSelected
                      ? "border-l-accent bg-accent/5"
                      : "border-l-transparent hover:bg-surface"
                  }`}
                >

                  <div className="relative flex-shrink-0">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-9 h-9 object-cover border-2 border-white"
                      />
                    ) : (
                      <div
                        className={`w-9 h-9 border-2 flex items-center justify-center font-display font-black text-sm ${
                          isSelected
                            ? "border-accent bg-accent text-black"
                            : "border-white bg-surface-2 text-white"
                        }`}
                      >
                        {(user.username || "U")[0].toUpperCase()}
                      </div>
                    )}
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border-2 border-base ${
                        isOnline ? "bg-mint" : "bg-dim"
                      }`}
                    />
                  </div>


                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-display font-bold uppercase tracking-tight truncate ${
                        isSelected ? "text-accent" : "text-white"
                      }`}
                    >
                      {user.username}
                    </p>
                    <p
                      className={`text-[9px] font-mono uppercase tracking-wider ${
                        isOnline ? "text-mint" : "text-muted"
                      }`}
                    >
                      {isOnline ? "● ONLINE" : "○ OFFLINE"}
                    </p>
                  </div>


                  <AnimatePresence>
                    {unread > 0 && !isSelected && (
                      <motion.span
                        key={`u-${user.clerkId}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 28 }}
                        className="flex-shrink-0 bg-accent text-black text-[9px] font-mono font-black px-1.5 py-0.5 border-2 border-black leading-none"
                      >
                        {unread > 9 ? "9+" : unread}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </AnimatePresence>
        )}
      </div>


      {currentUser && (
        <div className="border-t-2 border-white/10 bg-surface">
          <div className="px-4 pt-3 pb-2">
            <p className="text-[9px] font-mono uppercase tracking-widest text-muted truncate">
              SIGNED IN AS{" "}
              <span className="text-accent">
                {currentUser.username || currentUser.firstName}
              </span>
            </p>
          </div>
          <div className="flex border-t border-white/5">
            <button
              onClick={() => navigate("/")}
              title="Go to home page"
              className="flex-1 flex items-center justify-center gap-1.5 py-3 text-muted hover:text-accent hover:bg-surface-2 transition-colors border-r border-white/5"
            >
              <RiHome3Line className="text-sm" />
              <span className="text-[9px] font-mono uppercase tracking-widest">Home</span>
            </button>
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="flex-1 flex items-center justify-center gap-1.5 py-3 text-muted hover:text-danger hover:bg-surface-2 transition-colors"
            >
              <RiLogoutBoxRLine className="text-sm" />
              <span className="text-[9px] font-mono uppercase tracking-widest">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}