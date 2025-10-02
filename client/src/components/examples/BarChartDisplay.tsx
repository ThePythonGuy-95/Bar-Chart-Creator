import { BarChartDisplay as BarChartDisplayComponent } from "../BarChartDisplay";

export default function BarChartDisplayExample() {
  const sampleData = [
    { label: "Jan", value: 65 },
    { label: "Feb", value: 78 },
    { label: "Mar", value: 90 },
    { label: "Apr", value: 81 },
    { label: "May", value: 95 },
  ];

  return (
    <div className="p-8">
      <BarChartDisplayComponent
        data={sampleData}
        title="Monthly Sales Data"
      />
    </div>
  );
}
