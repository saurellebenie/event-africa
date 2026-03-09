'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, RotateCcw } from 'lucide-react'

const rejectedProviders = [
  {
    id: '7',
    name: 'Quick Event Services',
    email: 'info@quickevents.com',
    category: 'DJ & Music',
    location: 'Kigali, Rwanda',
    rejectedDate: '2025-01-08',
    reason: 'Incomplete documentation - Missing tax certificate',
  },
]

export default function KYCRejectedTab() {
  return (
    <div className="space-y-4">
      {rejectedProviders.map(provider => (
        <Card key={provider.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{provider.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{provider.email}</p>
                <div className="flex gap-2 flex-wrap mb-2">
                  <Badge variant="secondary">{provider.category}</Badge>
                  <Badge variant="outline">{provider.location}</Badge>
                  <Badge variant="destructive">Rejected</Badge>
                </div>
                <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-800">{provider.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-3">Rejected {new Date(provider.rejectedDate).toLocaleDateString()}</p>
                <Button size="sm" variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Allow Resubmission
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
