"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Info, AlertCircle } from "lucide-react";
import clsx from "clsx";
import { Button } from "./button";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  transitionFrom?: "left" | "right" | "top" | "bottom";
  onClose?: () => void;
  duration?: number;
  show: boolean;
};

export default function Toast({
  message,
  type = "success",
  position = "top-right",
  transitionFrom = "right",
  onClose,
  duration = 3000,
  show,
}: ToastProps) {
  useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(() => onClose?.(), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const positionClasses = clsx(
    "fixed z-50 p-4",
    position === "top-right" && "top-6 right-6",
    position === "top-left" && "top-6 left-6",
    position === "bottom-right" && "bottom-6 right-6",
    position === "bottom-left" && "bottom-6 left-6"
  );

  const variants = {
    hidden: {
      opacity: 0,
      x: transitionFrom === "left" ? -50 : transitionFrom === "right" ? 50 : 0,
      y: transitionFrom === "top" ? -50 : transitionFrom === "bottom" ? 50 : 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 250, damping: 20 },
    },
    exit: {
      opacity: 0,
      x: transitionFrom === "left" ? -40 : transitionFrom === "right" ? 40 : 0,
      y: transitionFrom === "top" ? -40 : transitionFrom === "bottom" ? 40 : 0,
      scale: 0.9,
      transition: { duration: 0.25 },
    },
  };

  const iconColor =
    type === "success" ? "text-teal-500" : type === "error" ? "text-red-500" : "text-blue-500";

  const gradientColor =
    type === "success"
      ? "from-teal-400/70"
      : type === "error"
        ? "from-red-400/70"
        : "from-blue-400/70";

  const Icon = type === "success" ? CheckCircle : type === "error" ? AlertCircle : Info;

  return (
    <div className={positionClasses}>
      <AnimatePresence>
        {show && (
          <motion.div
            key="toast"
            variants={variants as any}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={clsx(
              "relative flex items-center gap-3 rounded-xl px-4 py-3 bg-white text-sm font-medium shadow-lg overflow-hidden"
            )}
          >
            {/* Accent gradient kiri */}
            <div
              className={clsx(
                "absolute left-0 top-0 h-full w-1 bg-linear-to-b",
                gradientColor,
                "to-transparent"
              )}
            />

            <Icon className={clsx("w-5 h-5", iconColor)} />
            <p className="text-gray-800">{message}</p>
            <Button
              onClick={onClose}
              className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              aria-label="Close"
              variant="normal"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
