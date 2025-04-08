import { ReactNode, useEffect } from "react";

interface PanelProps {
  title?: string;
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  onEmptyClick?: () => void; // ✅ Optional click-away for inner space
}

export default function Panel({
  title,
  visible,
  onClose,
  children,
  onEmptyClick,
}: PanelProps) {
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
    // Overlay (clicking outside main panel closes it)
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-500 ${
        visible ? "bg-black/40 opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Panel container (stop click propagation so clicks inside don't close the panel) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 h-full w-full max-w-[580px] bg-white dark:bg-[#1f1f1f] shadow-lg transform transition-transform duration-500 ease-in-out z-50
          ${visible ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Scrollable inner content */}
        <div
          className="flex flex-col h-full overflow-y-auto p-4 space-y-4"
          onClick={(e) => {
            // If user clicks directly on empty space (not on a nested child element)
            const isInsideInteractive = (e.target as HTMLElement).closest(
              "button, input, select, textarea, label, [data-no-close]"
            );
            
            if (!isInsideInteractive && onEmptyClick) {
              onEmptyClick();
            }            
          }}
        >
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

          {/* Injected content */}
          {children}
        </div>
      </div>
    </div>
  );
}
