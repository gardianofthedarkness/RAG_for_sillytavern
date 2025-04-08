import { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  color?: "slate" | "pastel-pink"; // ✅ controlled color input
}

export default function Button({
  children,
  className,
  color = "pastel-pink", // default if none provided
  ...props
}: ButtonProps) {
  const colorMap: Record<string, string> = {
    slate: "bg-slate-500 hover:bg-slate-600",
    emerald: "bg-emerald-500 hover:bg-emerald-600",
    rose: "bg-rose-500 hover:bg-rose-600",
    sky: "bg-sky-500 hover:bg-sky-600",
    indigo: "bg-indigo-500 hover:bg-indigo-600",
    "pastel-pink": "bg-pastel-pink hover:brightness-95 text-gray-900",
  };

  const baseStyle = classNames(
    "relative inline-flex items-center justify-center font-medium rounded-md px-6 py-2 overflow-hidden",
    "transition-transform duration-300 ease-in-out group hover:scale-[1.02]",
    "hover:shadow-md border border-gray-400",
    colorMap[color], // 💡 resolved Tailwind classes
    className
  );

  return (
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
  );
}
