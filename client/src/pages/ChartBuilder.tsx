import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataInputRow } from "@/components/DataInputRow";
import { BarChartDisplay } from "@/components/BarChartDisplay";

interface DataPoint {
  id: string;
  label: string;
  value: number;
}

export default function ChartBuilder() {
  const [title, setTitle] = useState("");
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { id: "1", label: "", value: 0 },
    { id: "2", label: "", value: 0 },
  ]);

  const addDataPoint = () => {
    const newId = Date.now().toString();
    setDataPoints([...dataPoints, { id: newId, label: "", value: 0 }]);
  };

  const removeDataPoint = (id: string) => {
    if (dataPoints.length > 1) {
      setDataPoints(dataPoints.filter((point) => point.id !== id));
    }
  };

  const updateLabel = (id: string, label: string) => {
    setDataPoints(
      dataPoints.map((point) => (point.id === id ? { ...point, label } : point))
    );
  };

  const updateValue = (id: string, value: number) => {
    setDataPoints(
      dataPoints.map((point) => (point.id === id ? { ...point, value } : point))
    );
  };

  const clearData = () => {
    setTitle("");
    setDataPoints([
      { id: "1", label: "", value: 0 },
      { id: "2", label: "", value: 0 },
    ]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Chart Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="chart-title" className="text-sm font-medium">
                    Chart Title
                  </Label>
                  <Input
                    id="chart-title"
                    type="text"
                    placeholder="Enter chart title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    data-testid="input-chart-title"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Data Points</Label>
                  <div className="space-y-3">
                    {dataPoints.map((point) => (
                      <DataInputRow
                        key={point.id}
                        id={point.id}
                        label={point.label}
                        value={point.value}
                        onLabelChange={updateLabel}
                        onValueChange={updateValue}
                        onRemove={removeDataPoint}
                        canRemove={dataPoints.length > 1}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={addDataPoint}
                    variant="outline"
                    className="flex-1"
                    disabled={dataPoints.length >= 20}
                    data-testid="button-add-data-point"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Data Point
                  </Button>
                  <Button
                    onClick={clearData}
                    variant="ghost"
                    className="flex-1"
                    data-testid="button-clear-data"
                  >
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <BarChartDisplay data={dataPoints} title={title} />
          </div>
        </div>
      </div>
    </div>
  );
}
