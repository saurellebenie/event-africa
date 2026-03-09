'use client'

import { Card } from '@/components/ui/card'

interface Order {
  provider: string
  service: string
  eventDate: string
  guests: number
  subtotal: number
  platformFee: number
  total: number
  currency: string
}

interface OrderSummaryProps {
  order: Order
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <Card className="p-6 h-fit sticky top-24">
      <h3 className="font-bold text-foreground mb-6">Order Summary</h3>

      <div className="space-y-4 mb-6 pb-6 border-b border-border">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Provider</p>
          <p className="font-semibold text-foreground">{order.provider}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Service</p>
          <p className="font-semibold text-foreground">{order.service}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Event Date</p>
          <p className="font-semibold text-foreground">{order.eventDate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Number of Guests</p>
          <p className="font-semibold text-foreground">{order.guests}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <p className="text-muted-foreground">Subtotal</p>
          <p className="font-semibold text-foreground">
            {order.subtotal.toLocaleString()} {order.currency}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Platform Fee</p>
          <p className="font-semibold text-foreground">
            {order.platformFee.toLocaleString()} {order.currency}
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex justify-between mb-4">
          <p className="font-bold text-foreground">Total</p>
          <p className="text-2xl font-bold text-primary">
            {order.total.toLocaleString()} {order.currency}
          </p>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          All transactions are secure and encrypted
        </p>
      </div>
    </Card>
  )
}
