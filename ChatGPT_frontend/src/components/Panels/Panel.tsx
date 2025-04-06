import { ReactNode, useEffect } from "react";

interface PanelProps {
  title?: string;
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Panel({ title, visible, onClose, children }: PanelProps) {
  // Prevent background scroll while panel is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    // Overlay
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-500 ${
        visible ? "bg-black/40 opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Panel container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 h-full w-full max-w-[580px] bg-white dark:bg-[#1f1f1f] shadow-lg transform transition-transform duration-500 ease-in-out z-50
          ${visible ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Scrollable content */}
        <div className="flex flex-col h-full overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white">
  {title}
</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 dark:text-white"
            >
              ❌
            </button>
          </div>

          {/* Content from each panel component goes here */}
          {children}
        </div>
      </div>
    </div>
  );
}
