import { ReactNode, useEffect, useState } from "react";

interface MiniPanelProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function MiniPanel({ visible, onClose, children }: MiniPanelProps) {
    const [shouldRender, setShouldRender] = useState(false);
    const [animate, setAnimate] = useState(false);
  
    useEffect(() => {
      if (visible) {
        setShouldRender(true);
        setTimeout(() => {
          setAnimate(true);
        }, 100);
      } else {
        setAnimate(false);
        const timeout = setTimeout(() => setShouldRender(false), 300);
        return () => clearTimeout(timeout);
      }
    }, [visible]);
  
    if (!shouldRender) return null;
  
    return (
      <div className="fixed top-0 right-[580px] mt-12 z-[999] pointer-events-none">
        {/* Background Gradient */}
        <div
          className={`
            absolute top-0 left-0 h-full w-full
            bg-gradient-to-r from-transparent to-white dark:to-gray-900
            backdrop-blur-sm
            transition-opacity duration-300 ease-in-out
            pointer-events-none
            ${animate ? "opacity-100" : "opacity-0"}
          `}
        />
  
        {/* Sliding Panel */}
        <div
          className={`
            relative pointer-events-auto
            h-[600px] w-[1000px] p-6 pt-12 border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-900 shadow-lg rounded-l-lg
            transform transition-all duration-300 ease-in-out
            ${animate ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}
          `}
        >
          {/* Close Button - pushed down & layered above background */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 dark:text-white z-50"
          >
            ✕
          </button>
  
          {/* Content */}
          <div className="overflow-y-auto h-full pr-3">
            {children}
          </div>
        </div>
      </div>
    );
}
