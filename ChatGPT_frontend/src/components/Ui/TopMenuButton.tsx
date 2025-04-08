import Button from "../Ui/button"

interface TopMenuButtonProps {
    label: string;
    onClick: () => void;
  }
  
  export default function TopMenuButton({ label, onClick }: TopMenuButtonProps) {
    const sizeClass = "px-4 py-3 text-sm";
  
    return (
      <Button
        onClick={onClick}
        className={`${sizeClass} bg-gray-700 hover:bg-gray-600 text-white rounded transition`}
      >
        {label}
      </Button>
    );
  }
  