'use client'

import { Card } from '@/components/ui/card'

export default function CashForm() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold text-foreground mb-3">Payment at Event</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Pay directly at the event venue on the date of your event</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>A 20% deposit is required to secure your booking</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>You'll receive payment instructions via email</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>The remaining balance is due 7 days before your event</span>
          </li>
        </ul>
      </Card>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <p className="text-sm text-yellow-600">
          This payment option requires a confirmed booking first. You can cancel within 24 hours for a full refund.
        </p>
      </div>
    </div>
  )
}
