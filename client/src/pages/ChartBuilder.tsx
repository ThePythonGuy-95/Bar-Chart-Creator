import { useState, useRef } from "react";
import { Plus, Download, BarChart3 } from "lucide-react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
  const chartRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const downloadChart = async (format: "png" | "jpeg") => {
    if (!chartRef.current) return;

    const hasData = dataPoints.some((d) => d.label && d.value > 0);
    if (!hasData) {
      toast({
        title: "No data to export",
        description: "Please add some data points before downloading the chart.",
        variant: "destructive",
      });
      return;
    }

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: getComputedStyle(document.documentElement)
          .getPropertyValue("--background")
          .trim()
          ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue("--background")})`
          : "#ffffff",
        scale: 2,
      });

      const image = canvas.toDataURL(`image/${format}`, 1.0);
      const link = document.createElement("a");
      link.download = `chart-${Date.now()}.${format}`;
      link.href = image;
      link.click();

      toast({
        title: "Chart downloaded",
        description: `Your chart has been saved as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your chart.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Bar Chart Creator</h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
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

          <div className="lg:col-span-3 space-y-4">
            <BarChartDisplay ref={chartRef} data={dataPoints} title={title} />
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => downloadChart("png")}
                    className="flex-1 min-w-[140px]"
                    data-testid="button-download-png"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button
                    onClick={() => downloadChart("jpeg")}
                    variant="outline"
                    className="flex-1 min-w-[140px]"
                    data-testid="button-download-jpg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download JPG
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </main>

      <footer className="border-t bg-card mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Created with ❤️ by ThatTechGuy
          </p>
        </div>
      </footer>
    </div>
  );
}
