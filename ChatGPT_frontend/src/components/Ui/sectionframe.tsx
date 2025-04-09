import { ReactNode } from "react";

export default function SectionFrame({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="p-4 mb-67 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/60 shadow-sm">
      {title && (
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
