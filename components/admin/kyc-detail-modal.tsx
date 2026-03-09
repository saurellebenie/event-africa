'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, CheckCircle, XCircle } from 'lucide-react'

interface Provider {
  id: string
  name: string
  email: string
  category: string
  location: string
  joinDate: string
  status: string
  documents: {
    businessLicense: boolean
    taxCertificate: boolean
    identification: boolean
    bankDetails: boolean
  }
  submittedDate: string
}

interface KYCDetailModalProps {
  isOpen: boolean
  onClose: () => void
  provider: Provider
}

export default function KYCDetailModal({ isOpen, onClose, provider }: KYCDetailModalProps) {
  const [approvalNotes, setApprovalNotes] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')
  const [actionTaken, setActionTaken] = useState<'approve' | 'reject' | null>(null)

  if (!isOpen) return null

  const handleApprove = () => {
    console.log('Provider approved:', provider.id, approvalNotes)
    setActionTaken('approve')
    setTimeout(() => onClose(), 2000)
  }

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection')
      return
    }
    console.log('Provider rejected:', provider.id, rejectionReason)
    setActionTaken('reject')
    setTimeout(() => onClose(), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background border-b">
          <div>
            <CardTitle>KYC Verification Details</CardTitle>
            <CardDescription>{provider.name}</CardDescription>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Success Message */}
          {actionTaken === 'approve' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">Provider Approved</p>
                <p className="text-sm text-green-800">The provider has been approved successfully.</p>
              </div>
            </div>
          )}

          {actionTaken === 'reject' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">Provider Rejected</p>
                <p className="text-sm text-red-800">The provider has been notified of the rejection.</p>
              </div>
            </div>
          )}

          {!actionTaken && (
            <>
              {/* Provider Information */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Provider Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Business Name</p>
                    <p className="font-semibold text-foreground">{provider.name}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-semibold text-foreground">{provider.email}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <p className="font-semibold text-foreground">{provider.category}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="font-semibold text-foreground">{provider.location}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Joined On</p>
                    <p className="font-semibold text-foreground">{new Date(provider.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Submission Date</p>
                    <p className="font-semibold text-foreground">{new Date(provider.submittedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Document Verification */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Document Verification</h3>
                <div className="space-y-3">
                  {Object.entries({
                    businessLicense: 'Business License',
                    taxCertificate: 'Tax Certificate',
                    identification: 'Identification',
                    bankDetails: 'Bank Details',
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-foreground">{label}</span>
                      <div className="flex items-center gap-2">
                        {provider.documents[key as keyof typeof provider.documents] ? (
                          <>
                            <Badge className="bg-green-600">Submitted</Badge>
                            <Button size="sm" variant="outline">View</Button>
                          </>
                        ) : (
                          <Badge variant="destructive">Missing</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approval Section */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Approval Notes (Optional)</h3>
                <textarea
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  placeholder="Add any notes about the approval..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Rejection Section */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Rejection Reason (if applicable)</h3>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Provide reasons for rejection if needed..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  className="gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Provider
                </Button>
                <Button
                  onClick={handleApprove}
                  className="gap-2 bg-green-600 hover:bg-green-700 ml-auto"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Provider
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
