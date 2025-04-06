interface MiniPanelProps {
    children: React.ReactNode;
    onClose: () => void;
  }
  
  export default function MiniPanel({ children, onClose }: MiniPanelProps) {
    return (
      <div
        className="absolute top-0 left-0 mt-2 w-64 h-auto bg-white dark:bg-gray-800 shadow-lg rounded border border-gray-300 dark:border-gray-700 z-50 animate-slide-down"
      >
        <div className="p-4 space-y-2 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-sm text-gray-500 hover:text-black dark:text-white"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  }
  