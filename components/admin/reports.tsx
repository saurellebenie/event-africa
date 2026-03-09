'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react'

export default function AdminReports() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border border-border/50">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monthly GMV</p>
              <p className="text-2xl font-bold text-foreground mt-2">₦87,500,000</p>
            </div>
            <BarChart3 size={20} className="text-primary" />
          </div>
          <p className="text-sm text-green-600 font-medium">+34% from last month</p>
          <Button variant="outline" size="sm" className="mt-4 w-full">View Details</Button>
        </Card>

        <Card className="p-6 border border-border/50">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Commission Revenue</p>
              <p className="text-2xl font-bold text-foreground mt-2">₦13,125,000</p>
            </div>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <p className="text-sm text-green-600 font-medium">+28% from last month</p>
          <Button variant="outline" size="sm" className="mt-4 w-full">View Details</Button>
        </Card>
      </div>

      <Card className="p-6 border border-border/50">
        <h2 className="text-xl font-bold text-foreground mb-6">Performance Metrics</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <span className="font-medium text-foreground">Customer Satisfaction</span>
            <span className="text-lg font-bold text-yellow-600">4.6/5.0</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <span className="font-medium text-foreground">Provider Growth</span>
            <span className="text-lg font-bold text-green-600">+18%</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <span className="font-medium text-foreground">Repeat Booking Rate</span>
            <span className="text-lg font-bold text-blue-600">34%</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <span className="font-medium text-foreground">Platform Availability</span>
            <span className="text-lg font-bold text-green-600">99.8%</span>
          </div>
        </div>
        <Button className="w-full mt-6">Generate Full Report</Button>
      </Card>
    </div>
  )
}
