import { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  color?: "slate" | "pastel-pink" | "rose" | "emerald" | "sky" | "indigo";
  description?: string;
}

export default function Button({
  children,
  className,
  color = "slate",
  description,
  ...props
}: ButtonProps) {
  const colorMap: Record<string, string> = {
    slate: "px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600",
    emerald: "bg-emerald-500 hover:bg-emerald-600 text-white",
    rose: "bg-rose-500 hover:bg-rose-600 text-white",
    sky: "bg-sky-500 hover:bg-sky-600 text-white",
    indigo: "bg-indigo-500 hover:bg-indigo-600 text-white",
    "pastel-pink": "bg-pastel-pink hover:brightness-95 text-gray-900",
  };

  const baseStyle = classNames(
    "relative inline-flex items-center justify-center font-medium rounded-md px-6 py-2 overflow-hidden",
    "transition-transform duration-300 ease-in-out group hover:scale-[1.02]",
    "hover:shadow-md border border-gray-400",
    colorMap[color],
    className
  );

  return (
    <div className="relative group inline-flex items-center">
      {/* Actual Button */}
      <button {...props} className={baseStyle}>
        {/* Optional shimmer effect */}
        <span
          className={classNames(
            "absolute inset-0 w-full h-full",
            "bg-gradient-to-r from-white/10 via-white/20 to-white/10",
            "opacity-0 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:opacity-100",
            "transition-all duration-700 ease-in-out pointer-events-none"
          )}
        />
        <span className="relative z-10">{children}</span>
      </button>

      {/* Description floated beside the button */}
      {description && (
        <div
          className="absolute left-full ml-3 opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-350 ease-in-out pointer-events-none"
        >
          <div className="bg-gray-800 text-sm text-white px-3 py-1 rounded shadow-md whitespace-nowrap">
            {description}
          </div>
        </div>
      )}
    </div>
  );
}
