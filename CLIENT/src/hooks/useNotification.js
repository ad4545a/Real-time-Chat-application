import { useEffect, useCallback, useRef } from "react";

const APP_TITLE = "Pulse — Real-time Chat";

export const useNotification = () => {
  const permRef = useRef(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );

  useEffect(() => {
    if (typeof Notification === "undefined") return;
    if (Notification.permission === "default") {
      Notification.requestPermission().then((perm) => {
        permRef.current = perm;
      });
    }
  }, []);

  const showNotification = useCallback((title, body, iconUrl) => {
    if (!document.hidden) return;
    if (permRef.current !== "granted") return;

    try {
      const n = new Notification(title, {
        body,
        icon: iconUrl || "/favicon.svg",
        badge: "/favicon.svg",
        silent: true,
      });

      n.onclick = () => {
        window.focus();
        n.close();
      };

      setTimeout(() => n.close(), 6000);
    } catch {
    }
  }, []);

  const setTitleBadge = useCallback((count) => {
    if (typeof document === "undefined") return;
    document.title = count > 0 ? `(${count}) ${APP_TITLE}` : APP_TITLE;
  }, []);

  const clearTitleBadge = useCallback(() => {
    if (typeof document === "undefined") return;
    document.title = APP_TITLE;
  }, []);

  return { showNotification, setTitleBadge, clearTitleBadge };
};
