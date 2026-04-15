import { useState, useEffect, useCallback, useRef } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import { useSocket } from "../hooks/useSocket";
import { useNotification } from "../hooks/useNotification";
import { syncUser, getUsers } from "../utils/api";

export default function Chat() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});

  const searchRef = useRef(null);

  const { socket, onlineUsers, isConnected } = useSocket(token, user?.id);
  const { setTitleBadge, clearTitleBadge } = useNotification();


  useEffect(() => {
    if (!user) return;
    let isMounted = true;

    const init = async () => {
      try {
        const t = await getToken();
        if (!t) throw new Error("No auth token");
        if (isMounted) setToken(t);

        await syncUser(t);

        const res = await getUsers(t);
        const rawUsers = Array.isArray(res?.data) ? res.data : [];
        if (isMounted) {
          setUsers(
            rawUsers.map((u) => ({
              clerkId: u.clerkId,
              username: u.username || "User",
              profileImage: u.profileImage || "",
            }))
          );
        }
      } catch {
        if (isMounted) setError("Failed to load chat. Please refresh.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    const interval = setInterval(async () => {
      try {
        const fresh = await getToken();
        if (fresh && isMounted) setToken(fresh);
      } catch {}
    }, 50000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user, getToken]);


  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);


  const handleMessageReceived = useCallback(
    (senderId) => {
      if (selectedUser?.clerkId === senderId) return;
      setUnreadCounts((prev) => ({
        ...prev,
        [senderId]: (prev[senderId] || 0) + 1,
      }));
    },
    [selectedUser]
  );

  useEffect(() => {
    const total = Object.values(unreadCounts).reduce((s, n) => s + n, 0);
    total > 0 ? setTitleBadge(total) : clearTitleBadge();
  }, [unreadCounts, setTitleBadge, clearTitleBadge]);

  const handleSelectUser = useCallback((u) => {
    setSelectedUser(u);
    setUnreadCounts((prev) => {
      if (!prev[u.clerkId]) return prev;
      const next = { ...prev };
      delete next[u.clerkId];
      return next;
    });
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-base flex flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-2 border-accent border-t-transparent"
        />
        <p className="text-[9px] font-mono uppercase tracking-widest text-muted">
          Connecting to Pulse…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-4">
        <div className="border-2 border-white bg-surface shadow-neo p-8 text-center max-w-sm w-full">
          <div className="border-2 border-danger w-10 h-10 flex items-center justify-center mx-auto mb-4">
            <span className="text-danger font-black text-lg">!</span>
          </div>
          <p className="text-white font-display font-black uppercase text-base mb-2">
            Connection Failed
          </p>
          <p className="text-muted text-sm font-body mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="neo-btn neo-btn-accent text-sm w-full uppercase tracking-widest py-3"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-base flex overflow-hidden">

      <div className="hidden md:block fixed top-3 right-3 z-50">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 border-2 text-[9px] font-mono uppercase tracking-widest ${
            isConnected
              ? "border-mint bg-mint/10 text-mint"
              : "border-danger bg-danger/10 text-danger"
          }`}
        >
          <span className={`w-1.5 h-1.5 block ${isConnected ? "bg-mint" : "bg-danger"}`} />
          {isConnected ? "CONNECTED" : "RECONNECTING…"}
        </div>
      </div>


      <div
        className={`w-full md:w-80 h-full flex-shrink-0 ${
          selectedUser ? "hidden md:block" : "block"
        }`}
      >
        <Sidebar
          users={users}
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
          onlineUsers={onlineUsers}
          currentUser={user}
          unreadCounts={unreadCounts}
          searchRef={searchRef}
          isConnected={isConnected}
        />
      </div>


      <main
        className={`flex-1 flex flex-col overflow-hidden ${
          !selectedUser ? "hidden md:flex" : "flex"
        }`}
      >
        <ChatBox
          selectedUser={selectedUser}
          currentUserId={user?.id}
          token={token}
          socket={socket}
          onlineUsers={onlineUsers}
          onBack={() => setSelectedUser(null)}
          onMessageReceived={handleMessageReceived}
        />
      </main>
    </div>
  );
}