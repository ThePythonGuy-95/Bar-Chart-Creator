import { useState } from "react";
import { DataInputRow as DataInputRowComponent } from "../DataInputRow";

export default function DataInputRowExample() {
  const [label, setLabel] = useState("January");
  const [value, setValue] = useState(100);

  return (
    <div className="p-8 max-w-md">
      <DataInputRowComponent
        id="example-1"
        label={label}
        value={value}
        onLabelChange={(_, newLabel) => setLabel(newLabel)}
        onValueChange={(_, newValue) => setValue(newValue)}
        onRemove={() => console.log("Remove clicked")}
        canRemove={true}
      />
    </div>
  );
}
