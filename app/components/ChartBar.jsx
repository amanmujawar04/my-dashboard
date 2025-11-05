"use client";  

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
];

const ordersData = [
  { name: "Shipped", value: 400 },
  { name: "Delivered", value: 300 },
  { name: "Processing", value: 200 },
  { name: "Cancelled", value: 100 },
];

const COLORS = ["#2563EB", "#22C55E", "#A78BFA", "#EF4444"];

export default function ChartBar() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      {/* Monthly Sales Bar Chart */}
      <section className="min-w-0 p-6 bg-white rounded-lg shadow">
        <h3 className="mb-4 text-xl font-semibold text-gray-700">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={salesData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill={COLORS[0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Orders Status Pie Chart */}
      <section className="min-w-0 p-6 bg-white rounded-lg shadow">
        <h3 className="mb-4 text-xl font-semibold text-gray-700">Orders Status</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={ordersData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name }) => name}
              labelLine={false}
            >
              {ordersData.map((entry, idx) => (
                <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
