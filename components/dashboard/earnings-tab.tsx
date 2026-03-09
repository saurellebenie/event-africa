'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function EarningsTab() {
  const earnings = [
    {
      date: 'December 10, 2024',
      event: 'Wedding Reception',
      amount: '₦500,000',
      status: 'completed',
      fee: '₦50,000',
      net: '₦450,000',
    },
    {
      date: 'November 28, 2024',
      event: 'Corporate Gala',
      amount: '₦350,000',
      status: 'completed',
      fee: '₦35,000',
      net: '₦315,000',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Earnings</p>
          <p className="text-3xl font-bold text-foreground mb-4">₦2,450,000</p>
          <Button variant="outline" className="w-full">Withdraw</Button>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-500 mb-4">₦500,000</p>
          <p className="text-xs text-muted-foreground">From 2 pending bookings</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">This Month</p>
          <p className="text-3xl font-bold text-primary mb-4">₦850,000</p>
          <p className="text-xs text-muted-foreground">From 3 completed events</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Transaction History</h2>
        <div className="space-y-4">
          {earnings.map((earning, i) => (
            <div key={i} className="flex justify-between items-center p-4 rounded-lg border border-border">
              <div>
                <p className="font-semibold text-foreground">{earning.event}</p>
                <p className="text-sm text-muted-foreground">{earning.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{earning.amount}</p>
                <p className="text-xs text-muted-foreground">
                  Fee: {earning.fee} • Net: {earning.net}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
