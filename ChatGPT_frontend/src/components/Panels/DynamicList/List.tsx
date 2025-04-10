import Button from "../../Ui/button"

interface ChainItem {
    id: string;
    name: string;
    enabled: boolean;
  }
  
  interface Props {
    items: ChainItem[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
  }
  
  export default function ChainOfThoughtList({ items, onEdit, onDelete, onToggle }: Props) {
    return (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-800 dark:text-white">{item.name}</span>
            <div className="flex gap-2">
              <Button onClick={() => onEdit(item.id)} color="indigo" className="text-xs px-3 py-1">Edit</Button>
              <Button onClick={() => onDelete(item.id)} color="rose" className="text-xs px-3 py-1">Delete</Button>
              <button
                onClick={() => onToggle(item.id)}
                className={`text-xs px-3 py-1 rounded ${
                  item.enabled ? "bg-emerald-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
              >
                {item.enabled ? "On" : "Off"}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  