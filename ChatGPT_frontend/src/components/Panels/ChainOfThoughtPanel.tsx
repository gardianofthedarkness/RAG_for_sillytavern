import { useEffect, useState } from "react";
import ChainOfThoughtList from "./DynamicList/List";

interface ChainItem {
  id: string;
  name: string;
  enabled: boolean;
}

export default function ChainOfThoughtPanel() {
  const [items, setItems] = useState<ChainItem[]>([]);

  // ⏬ Fetch from backend
  useEffect(() => {
    fetch("/api/chain-of-thought") // 🔧 Replace with real endpoint
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Failed to load chain-of-thoughts", err));
  }, []);

  // 🛠 Action handlers (currently stubbed)
  const handleEdit = (id: string) => {
    console.log("Edit", id);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        These are your custom LLM chain-of-thought behaviors. Click to edit, toggle, or delete.
      </p>

      <ChainOfThoughtList
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}
