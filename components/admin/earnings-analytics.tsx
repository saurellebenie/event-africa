'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const monthlyData = [
  { month: 'Jan', earnings: 2500000, commissions: 250000, payouts: 2000000 },
  { month: 'Feb', earnings: 3200000, commissions: 320000, payouts: 2500000 },
  { month: 'Mar', earnings: 3800000, commissions: 380000, payouts: 3000000 },
  { month: 'Apr', earnings: 4500000, commissions: 450000, payouts: 3600000 },
  { month: 'May', earnings: 5200000, commissions: 520000, payouts: 4100000 },
  { month: 'Jun', earnings: 6100000, commissions: 610000, payouts: 4800000 },
]

export default function EarningsAnalytics() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Earnings (6 months)</p>
            <p className="text-2xl font-bold text-green-600">₦25.3M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Platform Revenue</p>
            <p className="text-2xl font-bold text-orange-600">₦2.53M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Provider Payouts</p>
            <p className="text-2xl font-bold text-blue-600">₦20.4M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Avg Commission Rate</p>
            <p className="text-2xl font-bold text-purple-600">10%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Trend</CardTitle>
          <CardDescription>Provider earnings and platform commissions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="hsl(var(--primary))"
                name="Provider Earnings"
              />
              <Line
                type="monotone"
                dataKey="commissions"
                stroke="hsl(var(--accent))"
                name="Platform Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Breakdown</CardTitle>
          <CardDescription>Earnings vs Payouts vs Commissions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
              <Legend />
              <Bar dataKey="earnings" fill="hsl(var(--primary))" name="Earnings" />
              <Bar dataKey="payouts" fill="hsl(var(--chart-2))" name="Payouts" />
              <Bar dataKey="commissions" fill="hsl(var(--chart-3))" name="Commissions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
