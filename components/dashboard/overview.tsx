'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Calendar, DollarSign, Star, Users, Eye } from 'lucide-react'
import StatsCard from './stats-card'
import ChartComponent from './chart-component'

export default function DashboardOverview() {
  const stats = [
    {
      title: 'Total Earnings',
      value: '₦2,450,000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Upcoming Bookings',
      value: '8',
      change: '+2 this week',
      icon: Calendar,
      color: 'text-blue-500',
    },
    {
      title: 'Avg. Rating',
      value: '4.8',
      change: 'From 156 reviews',
      icon: Star,
      color: 'text-yellow-500',
    },
    {
      title: 'Profile Views',
      value: '1,240',
      change: '+18% this week',
      icon: Eye,
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border border-border/50">
          <h2 className="text-xl font-bold text-foreground mb-6">Revenue Trend</h2>
          <ChartComponent />
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              Create New Listing
            </Button>
            <Button className="w-full justify-start" variant="outline">
              View All Bookings
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Update Profile
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Withdraw Earnings
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6 border border-border/50">
        <h2 className="text-xl font-bold text-foreground mb-6">Recent Bookings</h2>
        <div className="space-y-3">
          {[
            { name: 'Corporate Event', date: 'Dec 15, 2024', guests: 250, amount: '₦500,000', status: 'Pending Approval', color: 'bg-yellow-500/10 text-yellow-600' },
            { name: 'Wedding Reception', date: 'Dec 22, 2024', guests: 180, amount: '₦750,000', status: 'Confirmed', color: 'bg-green-500/10 text-green-600' },
            { name: 'Birthday Party', date: 'Dec 28, 2024', guests: 75, amount: '₦200,000', status: 'In Progress', color: 'bg-blue-500/10 text-blue-600' },
          ].map((booking, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="flex-1">
                <p className="font-semibold text-foreground">{booking.name}</p>
                <p className="text-sm text-muted-foreground">{booking.date} • {booking.guests} guests</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{booking.amount}</p>
                <p className={`text-sm px-2 py-1 rounded ${booking.color}`}>{booking.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
