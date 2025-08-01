 "use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell
} from "recharts";

const sampleMoodData = [
  { date: "Mon", mood: 6 },
  { date: "Tue", mood: 8 },
  { date: "Wed", mood: 5 },
  { date: "Thu", mood: 7 },
  { date: "Fri", mood: 6 },
  { date: "Sat", mood: 9 },
  { date: "Sun", mood: 4 },
];

const sampleFrequencyData = [
  { day: "Mon", entries: 2 },
  { day: "Tue", entries: 1 },
  { day: "Wed", entries: 3 },
  { day: "Thu", entries: 2 },
  { day: "Fri", entries: 4 },
  { day: "Sat", entries: 1 },
  { day: "Sun", entries: 0 },
];

const sampleSentimentData = [
  { name: "Positive", value: 6 },
  { name: "Neutral", value: 2 },
  { name: "Negative", value: 3 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF4444"];

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-950 px-4 pt-24 pb-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">📊 Mood & Journal Stats</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Mood Trend Line Chart */}
        <Card className="bg-white/10 border border-white/20 rounded-2xl shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-white">Mood Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sampleMoodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
                <XAxis dataKey="date" stroke="#aaa" />
                <YAxis domain={[0, 10]} stroke="#aaa" />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Journal Frequency Bar Chart */}
        <Card className="bg-white/10 border border-white/20 rounded-2xl shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-white">Entry Frequency</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sampleFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
                <XAxis dataKey="day" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="entries" fill="#facc15" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Pie Chart */}
        <Card className="bg-white/10 border border-white/20 rounded-2xl shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-white">Sentiment Analysis</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sampleSentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? "Unknown"} (${percent !== undefined ? (percent * 100).toFixed(0) : "0"}%)`
                  }
                >
                  {sampleSentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
