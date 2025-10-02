import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataInputRowProps {
  id: string;
  label: string;
  value: number;
  onLabelChange: (id: string, label: string) => void;
  onValueChange: (id: string, value: number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export function DataInputRow({
  id,
  label,
  value,
  onLabelChange,
  onValueChange,
  onRemove,
  canRemove,
}: DataInputRowProps) {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Label (e.g., Jan)"
          value={label}
          onChange={(e) => onLabelChange(id, e.target.value)}
          data-testid={`input-label-${id}`}
        />
      </div>
      <div className="flex-1">
        <Input
          type="number"
          placeholder="Value"
          value={value || ""}
          onChange={(e) => onValueChange(id, parseFloat(e.target.value) || 0)}
          className="font-mono text-right"
          data-testid={`input-value-${id}`}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(id)}
        disabled={!canRemove}
        data-testid={`button-remove-${id}`}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
