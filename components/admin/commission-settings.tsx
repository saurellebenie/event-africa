'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface CommissionTier {
  id: string
  name: string
  monthlyFee: number
  commission: number
  minBookings?: number
}

const commissionTiers: CommissionTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyFee: 0,
    commission: 15,
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyFee: 4999,
    commission: 10,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyFee: 14999,
    commission: 5,
  },
]

export default function CommissionSettings() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [commissions, setCommissions] = useState(commissionTiers)

  const handleUpdateCommission = (id: string, newCommission: number) => {
    setCommissions(commissions.map(c => 
      c.id === id ? { ...c, commission: newCommission } : c
    ))
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Commission Structure</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Configure commission rates for each plan tier. Lower rates incentivize higher-tier subscriptions.
        </p>
      </div>

      <div className="grid gap-4">
        {commissions.map(tier => (
          <Card key={tier.id}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Plan</p>
                  <p className="font-semibold text-foreground">{tier.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Fee</p>
                  <p className="font-semibold text-foreground">
                    {tier.monthlyFee === 0 ? 'Free' : `₦${(tier.monthlyFee / 1000).toFixed(0)}K`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Commission Rate</p>
                  <p className="text-2xl font-bold text-primary">{tier.commission}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(tier.id)}
                  >
                    Edit
                  </Button>
                </div>
              </div>

              {editingId === tier.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      New Commission Rate (%)
                    </label>
                    <input
                      type="number"
                      defaultValue={tier.commission}
                      min="0"
                      max="50"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      onChange={(e) => {
                        const newVal = parseInt(e.target.value) || tier.commission
                        handleUpdateCommission(tier.id, newVal)
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setEditingId(null)}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>Commission Policy</CardTitle>
          <CardDescription>How commissions are calculated and paid</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Calculation:</span> Commission is calculated as a percentage of the total booking amount, excluding taxes where applicable.
          </p>
          <p>
            <span className="font-semibold text-foreground">Payment:</span> Commissions are collected when the service is completed and marked as paid by the provider.
          </p>
          <p>
            <span className="font-semibold text-foreground">Disputes:</span> If a booking is disputed or refunded, the commission is reversed automatically.
          </p>
          <p>
            <span className="font-semibold text-foreground">Payouts:</span> Providers receive their net earnings (after commission) through their preferred payment method.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
