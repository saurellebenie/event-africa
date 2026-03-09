'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ArrowDownLeft, DollarSign, TrendingUp } from 'lucide-react'

interface Payment {
  id: string
  type: 'earning' | 'commission' | 'payout' | 'refund'
  description: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed'
}

const payments: Payment[] = [
  {
    id: '1',
    type: 'earning',
    description: 'Wedding Venue Booking - Lagos Event',
    amount: 250000,
    date: '2025-01-18',
    status: 'completed',
  },
  {
    id: '2',
    type: 'commission',
    description: 'Platform Commission (10%)',
    amount: -25000,
    date: '2025-01-18',
    status: 'completed',
  },
  {
    id: '3',
    type: 'earning',
    description: 'Decoration Service - Birthday Party',
    amount: 150000,
    date: '2025-01-17',
    status: 'completed',
  },
  {
    id: '4',
    type: 'payout',
    description: 'Monthly Payout to Bank Account',
    amount: 350000,
    date: '2025-01-16',
    status: 'completed',
  },
  {
    id: '5',
    type: 'refund',
    description: 'Booking Cancellation Refund',
    amount: -75000,
    date: '2025-01-15',
    status: 'completed',
  },
  {
    id: '6',
    type: 'earning',
    description: 'DJ Services - Corporate Event',
    amount: 80000,
    date: '2025-01-14',
    status: 'completed',
  },
]

export default function PaymentsTab() {
  const [filter, setFilter] = useState<'all' | 'earning' | 'payout' | 'commission'>('all')

  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(p => p.type === filter || (filter === 'commission' && p.type === 'commission'))

  const totalEarnings = payments
    .filter(p => p.type === 'earning')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalCommissions = payments
    .filter(p => p.type === 'commission')
    .reduce((sum, p) => sum + Math.abs(p.amount), 0)

  const totalPayouts = payments
    .filter(p => p.type === 'payout')
    .reduce((sum, p) => sum + p.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'earning':
        return <ArrowUpRight className="w-5 h-5 text-green-500" />
      case 'payout':
        return <ArrowDownLeft className="w-5 h-5 text-blue-500" />
      case 'commission':
        return <DollarSign className="w-5 h-5 text-orange-500" />
      case 'refund':
        return <ArrowDownLeft className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">₦{(totalEarnings / 1000).toFixed(0)}K</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Platform Commission</p>
                <p className="text-2xl font-bold text-orange-600">₦{(totalCommissions / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Payouts</p>
                <p className="text-2xl font-bold text-blue-600">₦{(totalPayouts / 1000).toFixed(0)}K</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'earning', 'payout', 'commission'].map(f => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f as any)}
            className="capitalize"
          >
            {f === 'earning' ? 'Earnings' : f === 'payout' ? 'Payouts' : f === 'commission' ? 'Commissions' : 'All Transactions'}
          </Button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredPayments.map(payment => (
          <Card key={payment.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-muted rounded-lg">
                    {getTypeIcon(payment.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{payment.description}</p>
                    <p className="text-sm text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${payment.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {payment.amount > 0 ? '+' : ''}₦{(Math.abs(payment.amount) / 1000).toFixed(0)}K
                  </p>
                  <Badge variant="secondary" className={`mt-1 ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payout Section */}
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>Request Payout</CardTitle>
          <CardDescription>Withdraw your earnings to your bank account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
            <p className="text-3xl font-bold text-primary">₦350,000</p>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90">
            Request Payout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
