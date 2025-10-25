"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "../atoms/button";

type ModalProps = {
  open: boolean;
  title?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  children: ReactNode;
  onClose?: () => void;
  footer?: ReactNode;
  width?: string;
};

const Modal = ({
  open,
  title,
  showHeader = true,
  showFooter = true,
  children,
  onClose,
  footer,
  width = "max-w-4xl",
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-3 sm:px-6">
      {/* Modal Container */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${width} max-h-[90vh] flex flex-col overflow-hidden`}
      >
        {/* Header */}
        {showHeader && (
          <div className="flex justify-between items-center border-b border-[#E0E0E0] px-4 sm:px-6 py-3 sm:py-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 break-words">
              {title}
            </h2>
            {onClose && (
              <button
                type="button"
                title="close-button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <X size={22} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 text-gray-700 text-sm sm:text-base">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 border-t border-[#E0E0E0] px-4 sm:px-6 py-3 sm:py-4 ">
            {footer ? (
              footer
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 rounded-md border hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button className="w-full sm:w-auto px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                  Save
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
