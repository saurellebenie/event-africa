'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Eye, MessageSquare } from 'lucide-react'
import KYCDetailModal from './kyc-detail-modal'

interface Provider {
  id: string
  name: string
  email: string
  category: string
  location: string
  joinDate: string
  status: 'under-review' | 'pending' | 'approved' | 'rejected'
  documents: {
    businessLicense: boolean
    taxCertificate: boolean
    identification: boolean
    bankDetails: boolean
  }
  submittedDate: string
  reviewedBy?: string
  notes?: string
}

const providers: Provider[] = [
  {
    id: '1',
    name: 'Luxury Events Design',
    email: 'info@luxuryevents.com',
    category: 'Decoration',
    location: 'Lagos, Nigeria',
    joinDate: '2025-01-10',
    status: 'under-review',
    documents: {
      businessLicense: true,
      taxCertificate: true,
      identification: true,
      bankDetails: false,
    },
    submittedDate: '2025-01-15',
  },
  {
    id: '2',
    name: 'Groove Masters Entertainment',
    email: 'booking@groovemasters.com',
    category: 'DJ & Music',
    location: 'Accra, Ghana',
    joinDate: '2025-01-12',
    status: 'under-review',
    documents: {
      businessLicense: true,
      taxCertificate: true,
      identification: true,
      bankDetails: true,
    },
    submittedDate: '2025-01-16',
  },
]

export default function KYCVerificationTab() {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const handleViewDetails = (provider: Provider) => {
    setSelectedProvider(provider)
    setIsDetailModalOpen(true)
  }

  const documentCount = (provider: Provider) => {
    return Object.values(provider.documents).filter(Boolean).length
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {providers.map(provider => (
          <Card key={provider.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Provider Name</p>
                  <p className="font-semibold text-foreground">{provider.name}</p>
                  <p className="text-xs text-muted-foreground">{provider.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <Badge variant="secondary" className="mb-2">{provider.category}</Badge>
                  <p className="text-xs text-muted-foreground">{provider.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Documents</p>
                  <p className="font-semibold text-foreground">{documentCount(provider)}/4</p>
                  <p className="text-xs text-muted-foreground">Submitted</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Submitted On</p>
                  <p className="font-semibold text-foreground">{new Date(provider.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  {provider.documents.businessLicense ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-muted-foreground">Business License</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {provider.documents.taxCertificate ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-muted-foreground">Tax Certificate</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {provider.documents.identification ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-muted-foreground">Identification</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {provider.documents.bankDetails ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-muted-foreground">Bank Details</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleViewDetails(provider)}
                >
                  <Eye className="w-4 h-4" />
                  Review Details
                </Button>
                <Button
                  size="sm"
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 ml-auto"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProvider && (
        <KYCDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          provider={selectedProvider}
        />
      )}
    </div>
  )
}
