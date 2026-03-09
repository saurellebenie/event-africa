'use client'

import { Card } from '@/components/ui/card'

interface BudgetBreakdownProps {
  breakdown: {
    venue: number
    catering: number
    entertainment: number
    decorations: number
  }
  totalBudget: number
}

export default function BudgetBreakdown({ breakdown, totalBudget }: BudgetBreakdownProps) {
  const items = [
    { label: 'Venue', amount: breakdown.venue, color: 'bg-blue-500', percentage: 40 },
    { label: 'Catering', amount: breakdown.catering, color: 'bg-green-500', percentage: 30 },
    { label: 'Entertainment', amount: breakdown.entertainment, color: 'bg-purple-500', percentage: 20 },
    { label: 'Decorations', amount: breakdown.decorations, color: 'bg-pink-500', percentage: 10 },
  ]

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-foreground mb-8">Budget Breakdown</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-2">
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="font-bold text-primary">
                  {item.amount.toLocaleString()} KES ({item.percentage}%)
                </p>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className={`${item.color} h-full`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <Card className="p-6 bg-muted/50">
          <p className="text-sm text-muted-foreground mb-2">Total Budget</p>
          <p className="text-3xl font-bold text-foreground mb-6">
            {totalBudget.toLocaleString()} KES
          </p>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Recommended allocation based on industry best practices for optimal event quality.
            </p>
            <button className="text-primary font-semibold hover:underline">
              View detailed tips
            </button>
          </div>
        </Card>
      </div>
    </Card>
  )
}
