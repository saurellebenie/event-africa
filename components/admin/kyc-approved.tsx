'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

const approvedProviders = [
  {
    id: '5',
    name: 'Premier Event Planners',
    email: 'hello@premierevents.com',
    category: 'Event Planning',
    location: 'Abuja, Nigeria',
    approvedDate: '2025-01-10',
  },
  {
    id: '6',
    name: 'Memories Captured Studio',
    email: 'bookings@memoriescaptured.com',
    category: 'Photography',
    location: 'Dakar, Senegal',
    approvedDate: '2025-01-12',
  },
]

export default function KYCApprovedTab() {
  return (
    <div className="space-y-4">
      {approvedProviders.map(provider => (
        <Card key={provider.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{provider.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{provider.email}</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">{provider.category}</Badge>
                  <Badge variant="outline">{provider.location}</Badge>
                  <Badge className="bg-green-600">Verified</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Approved {new Date(provider.approvedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
