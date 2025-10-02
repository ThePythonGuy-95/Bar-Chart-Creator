import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface ChartDataPoint {
  label: string;
  value: number;
}

interface BarChartDisplayProps {
  data: ChartDataPoint[];
  title: string;
}

export function BarChartDisplay({ data, title }: BarChartDisplayProps) {
  const hasData = data.length > 0 && data.some((d) => d.label && d.value > 0);

  if (!hasData) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <svg
                className="h-16 w-16 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect x="4" y="14" width="4" height="6" strokeWidth="2" rx="1" />
                <rect x="10" y="8" width="4" height="12" strokeWidth="2" rx="1" />
                <rect x="16" y="11" width="4" height="9" strokeWidth="2" rx="1" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              Add data to generate your chart
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.filter((d) => d.label && d.value > 0);

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        {title && (
          <h3 className="text-xl font-semibold mb-6 text-center" data-testid="text-chart-title">
            {title}
          </h3>
        )}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="label"
              className="text-sm"
              tick={{ fill: "hsl(var(--foreground))" }}
            />
            <YAxis
              className="text-sm"
              tick={{ fill: "hsl(var(--foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--popover-border))",
                borderRadius: "var(--radius)",
                color: "hsl(var(--popover-foreground))",
              }}
            />
            <Bar
              dataKey="value"
              fill="hsl(var(--primary))"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
