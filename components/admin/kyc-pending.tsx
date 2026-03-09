'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Mail } from 'lucide-react'

const pendingProviders = [
  {
    id: '3',
    name: 'Culinary Creations',
    email: 'contact@culinaryct.com',
    category: 'Catering',
    location: 'Nairobi, Kenya',
    registeredDate: '2025-01-18',
  },
  {
    id: '4',
    name: 'Coastal Dreams Events',
    email: 'info@coastaldreams.com',
    category: 'Venue',
    location: 'Dar es Salaam, Tanzania',
    registeredDate: '2025-01-19',
  },
]

export default function KYCPendingTab() {
  return (
    <div className="space-y-4">
      {pendingProviders.map(provider => (
        <Card key={provider.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{provider.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{provider.email}</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">{provider.category}</Badge>
                  <Badge variant="outline">{provider.location}</Badge>
                  <Badge className="bg-yellow-600">Awaiting Submission</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  Registered {new Date(provider.registeredDate).toLocaleDateString()}
                </div>
                <Button size="sm" variant="outline" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Send Reminder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
