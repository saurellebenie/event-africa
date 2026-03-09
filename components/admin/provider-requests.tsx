'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Search, FileText, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react'

interface ProviderRequest {
  id: string
  businessName: string
  businessType: string
  email: string
  phone: string
  location: string
  status: 'pending' | 'reviewing' | 'approved' | 'rejected'
  submittedDate: string
  documents: {
    id: string
    name: string
    status: 'verified' | 'pending' | 'rejected'
  }[]
}

export default function ProviderRequests() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'reviewing' | 'approved' | 'rejected'>('all')
  const [selectedRequest, setSelectedRequest] = useState<ProviderRequest | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showReviewModal, setShowReviewModal] = useState(false)

  const requests: ProviderRequest[] = [
    {
      id: '1',
      businessName: 'Elite Event Decorators',
      businessType: 'Decoration',
      email: 'info@elitedec.com',
      phone: '+234 8012345678',
      location: 'Lagos, Nigeria',
      status: 'pending',
      submittedDate: '2025-01-15',
      documents: [
        { id: 'bus-1', name: 'Business Registration', status: 'pending' },
        { id: 'tax-1', name: 'Tax ID Certificate', status: 'pending' },
        { id: 'bank-1', name: 'Bank Proof', status: 'pending' },
        { id: 'id-1', name: 'Government ID', status: 'pending' },
      ]
    },
    {
      id: '2',
      businessName: 'DJ Sound Masters',
      businessType: 'DJ',
      email: 'contact@djsoundmasters.com',
      phone: '+234 9023456789',
      location: 'Abuja, Nigeria',
      status: 'reviewing',
      submittedDate: '2025-01-10',
      documents: [
        { id: 'bus-2', name: 'Business Registration', status: 'verified' },
        { id: 'tax-2', name: 'Tax ID Certificate', status: 'verified' },
        { id: 'bank-2', name: 'Bank Proof', status: 'pending' },
        { id: 'id-2', name: 'Government ID', status: 'verified' },
      ]
    },
    {
      id: '3',
      businessName: 'Golden Catering Services',
      businessType: 'Catering',
      email: 'bookings@goldencatering.com',
      phone: '+234 7012345678',
      location: 'Enugu, Nigeria',
      status: 'approved',
      submittedDate: '2025-01-01',
      documents: [
        { id: 'bus-3', name: 'Business Registration', status: 'verified' },
        { id: 'tax-3', name: 'Tax ID Certificate', status: 'verified' },
        { id: 'bank-3', name: 'Bank Proof', status: 'verified' },
        { id: 'id-3', name: 'Government ID', status: 'verified' },
      ]
    },
  ]

  const filtered = requests.filter(req => {
    const matchesSearch = req.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-700'
      case 'reviewing': return 'bg-blue-500/10 text-blue-700'
      case 'approved': return 'bg-green-500/10 text-green-700'
      case 'rejected': return 'bg-red-500/10 text-red-700'
      default: return 'bg-gray-500/10 text-gray-700'
    }
  }

  const getDocumentStatusIcon = (status: string) => {
    switch(status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />
      default: return <AlertCircle className="w-4 h-4 text-yellow-600" />
    }
  }

  const handleApprove = (request: ProviderRequest) => {
    console.log('[v0] Provider approved:', request.id)
    alert(`${request.businessName} has been approved as a provider!`)
    setShowReviewModal(false)
    setSelectedRequest(null)
  }

  const handleReject = (request: ProviderRequest) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason')
      return
    }
    console.log('[v0] Provider rejected:', request.id, rejectionReason)
    alert(`${request.businessName} has been rejected. Reason: ${rejectionReason}`)
    setShowReviewModal(false)
    setSelectedRequest(null)
    setRejectionReason('')
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 border border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-lg">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by business name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'pending', 'reviewing', 'approved', 'rejected'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filterStatus === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Requests Table */}
      <Card className="p-6 border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-left text-sm font-semibold text-muted-foreground">
                <th className="pb-4 px-4">Business Name</th>
                <th className="pb-4 px-4">Type</th>
                <th className="pb-4 px-4">Location</th>
                <th className="pb-4 px-4">Submitted</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((request) => (
                <tr key={request.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4 font-medium text-foreground">{request.businessName}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{request.businessType}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{request.location}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{request.submittedDate}</td>
                  <td className="py-4 px-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {request.status === 'approved' ? (
                      <span className="text-xs text-green-600 font-medium">Approved</span>
                    ) : request.status === 'rejected' ? (
                      <span className="text-xs text-red-600 font-medium">Rejected</span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedRequest(request)
                          setShowReviewModal(true)
                        }}
                      >
                        Review
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Review Modal */}
      {showReviewModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Review Provider Request: {selectedRequest.businessName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Provider Info */}
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{selectedRequest.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground">{selectedRequest.businessType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">{selectedRequest.location}</p>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Document Verification</h3>
                <div className="space-y-2">
                  {selectedRequest.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.status}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDocumentStatusIcon(doc.status)}
                        <button className="p-2 hover:bg-muted rounded transition-colors">
                          <Download className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rejection Reason (if applicable) */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Rejection Reason (if rejecting)</label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Provide reason if you're rejecting this request..."
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReviewModal(false)
                    setSelectedRequest(null)
                    setRejectionReason('')
                  }}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-500/30 text-red-600 hover:bg-red-500/10"
                  onClick={() => handleReject(selectedRequest)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedRequest)}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
