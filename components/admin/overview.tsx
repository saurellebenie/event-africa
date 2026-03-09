'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, Store, DollarSign, AlertCircle } from 'lucide-react'
import ChartComponent from '../dashboard/chart-component'

export default function AdminOverview() {
  const stats = [
    {
      title: 'Platform Revenue',
      value: '₦45,230,000',
      change: '+28.5%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Active Providers',
      value: '342',
      change: '+18 this week',
      icon: Store,
      color: 'text-blue-500',
    },
    {
      title: 'Total Users',
      value: '8,540',
      change: '+145 today',
      icon: Users,
      color: 'text-purple-500',
    },
    {
      title: 'Conversion Rate',
      value: '18.5%',
      change: '+2.1% vs last month',
      icon: TrendingUp,
      color: 'text-amber-500',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 border border-border/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className={`text-sm font-medium ${stat.color}`}>{stat.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border border-border/50">
          <h2 className="text-xl font-bold text-foreground mb-6">Platform Growth</h2>
          <ChartComponent />
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-bold text-foreground mb-6">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
              <span className="text-sm font-medium text-foreground">API Status</span>
              <span className="text-xs font-bold text-green-600 bg-green-500/20 px-2 py-1 rounded">Healthy</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
              <span className="text-sm font-medium text-foreground">Database</span>
              <span className="text-xs font-bold text-green-600 bg-green-500/20 px-2 py-1 rounded">Optimal</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
              <span className="text-sm font-medium text-foreground">Queue Processing</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-500/20 px-2 py-1 rounded">Normal</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
              <span className="text-sm font-medium text-foreground">Payment Gateway</span>
              <span className="text-xs font-bold text-yellow-600 bg-yellow-500/20 px-2 py-1 rounded">Monitoring</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 border border-border/50">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Recent Activities</h2>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="space-y-3">
          {[
            { action: 'New provider registration', type: 'DJ Collective Lagos', time: '2 minutes ago', icon: '📝' },
            { action: 'Large booking confirmed', type: '₦2,500,000 transaction', time: '15 minutes ago', icon: '✓' },
            { action: 'Provider suspended', type: 'Fake ratings detected', time: '1 hour ago', icon: '⚠️' },
            { action: 'Payment processed', type: '₦5,430,000 settlement', time: '3 hours ago', icon: '💳' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-lg">{activity.icon}</span>
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.type}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
