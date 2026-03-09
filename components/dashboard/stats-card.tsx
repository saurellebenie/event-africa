'use client'

import { Card } from '@/components/ui/card'
import { type LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: string
}

export default function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <Icon size={24} className={color} />
      </div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </Card>
  )
}
