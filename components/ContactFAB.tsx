 "use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Mail, Phone } from "lucide-react";
import { resumeData } from "@/data/resume";
import { AnimatePresence, motion } from "framer-motion";

export function ContactFAB(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Listen for external open requests (e.g. from CTA "预约沟通" button)
  useEffect(() => {
    function handleOpen() {
      setIsOpen(true);
    }
    window.addEventListener("open-contact-fab", handleOpen);
    return () => window.removeEventListener("open-contact-fab", handleOpen);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Contact Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            className="w-[calc(100vw-3rem)] sm:w-72 glass-surface rounded-2xl shadow-2xl p-5 space-y-4"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-card-foreground">联系方式</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
              aria-label="关闭"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Email */}
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">邮箱</p>
                <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                  {resumeData.personalInfo.email}
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${resumeData.personalInfo.phone}`}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">电话</p>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {resumeData.personalInfo.phone}
                </p>
              </div>
            </a>

            {/* WeChat QR code */}
            <div className="space-y-2 pt-1">
              <p className="text-xs text-muted-foreground px-2.5">微信扫码联系</p>
              <div className="flex justify-center">
                {/* v=2 cache-bust so updated QR image loads after deploy */}
                <img
                  src="/assets/images/IMG_2190.jpg?v=2"
                  alt="微信二维码"
                  width={200}
                  height={200}
                  className="rounded-xl border border-border w-[200px] h-[200px] object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full text-primary-foreground shadow-lg flex items-center justify-center bg-gradient-to-br from-primary to-accent"
        aria-label="联系方式"
        whileHover={{ scale: 1.06, boxShadow: "0 18px 45px hsla(230,75%,55%,0.45)" }}
        whileTap={{ scale: 0.96 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}
