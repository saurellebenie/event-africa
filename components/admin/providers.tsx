'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreVertical, Search, CheckCircle, AlertCircle, XCircle, Archive, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'

interface Provider {
  id: number
  name: string
  type: string
  rating: number
  revenue: string
  bookings: number
  status: 'active' | 'suspended' | 'archived'
  joinDate: string
  email: string
}

export default function AdminProviders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended' | 'archived'>('all')
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null)

  const providers: Provider[] = [
    { id: 1, name: 'DJ Collective Lagos', type: 'DJ', rating: 4.9, revenue: '₦5,240,000', bookings: 124, status: 'active', joinDate: '2024-01-15', email: 'dj@collective.com' },
    { id: 2, name: 'Luxury Venues Ltd', type: 'Venue', rating: 4.7, revenue: '₦12,500,000', bookings: 287, status: 'active', joinDate: '2024-02-20', email: 'contact@luxuryv.com' },
    { id: 3, name: 'Catering Experts', type: 'Catering', rating: 4.5, revenue: '₦3,800,000', bookings: 92, status: 'active', joinDate: '2024-03-10', email: 'bookings@catering.com' },
    { id: 4, name: 'Floral Designs Co', type: 'Decoration', rating: 3.2, revenue: '₦1,200,000', bookings: 45, status: 'suspended', joinDate: '2024-04-05', email: 'info@floral.com' },
    { id: 5, name: 'Photography Pro', type: 'Photography', rating: 4.8, revenue: '₦2,900,000', bookings: 156, status: 'active', joinDate: '2024-05-12', email: 'photo@pro.com' },
  ]

  const filtered = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || provider.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500/10 text-green-600'
      case 'suspended': return 'bg-red-500/10 text-red-600'
      case 'archived': return 'bg-gray-500/10 text-gray-600'
      default: return 'bg-gray-500/10 text-gray-600'
    }
  }

  const handleSuspend = (provider: Provider) => {
    console.log('[v0] Provider suspended:', provider.id)
    alert(`${provider.name} has been suspended`)
    setActionMenuOpen(null)
  }

  const handleArchive = (provider: Provider) => {
    console.log('[v0] Provider archived:', provider.id)
    alert(`${provider.name} has been archived`)
    setActionMenuOpen(null)
  }

  const handleDelete = (provider: Provider) => {
    if (confirm(`Are you sure you want to delete ${provider.name}? This action cannot be undone.`)) {
      console.log('[v0] Provider deleted:', provider.id)
      alert(`${provider.name} has been permanently deleted`)
      setActionMenuOpen(null)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/50">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-lg">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search providers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'suspended', 'archived'] as const).map(status => (
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-left text-sm font-semibold text-muted-foreground">
                <th className="pb-4 px-4">Provider</th>
                <th className="pb-4 px-4">Type</th>
                <th className="pb-4 px-4">Rating</th>
                <th className="pb-4 px-4">Revenue</th>
                <th className="pb-4 px-4">Bookings</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((provider) => (
                <tr key={provider.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-foreground">{provider.name}</p>
                      <p className="text-xs text-muted-foreground">{provider.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{provider.type}</td>
                  <td className="py-4 px-4 text-sm font-medium text-yellow-600">⭐ {provider.rating}</td>
                  <td className="py-4 px-4 font-medium text-green-600">{provider.revenue}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{provider.bookings}</td>
                  <td className="py-4 px-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(provider.status)}`}>
                      {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="relative">
                      <button
                        onClick={() => setActionMenuOpen(actionMenuOpen === provider.id ? null : provider.id)}
                        className="p-2 hover:bg-muted rounded transition-colors"
                      >
                        <MoreVertical size={16} className="text-muted-foreground" />
                      </button>

                      {actionMenuOpen === provider.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-10">
                          <button
                            onClick={() => {
                              setSelectedProvider(provider)
                              setShowDetailModal(true)
                              setActionMenuOpen(null)
                            }}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors w-full text-left"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          {provider.status === 'active' && (
                            <button
                              onClick={() => handleSuspend(provider)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-orange-600 hover:bg-orange-500/10 transition-colors w-full text-left"
                            >
                              <AlertCircle className="w-4 h-4" />
                              Suspend
                            </button>
                          )}
                          {provider.status !== 'archived' && (
                            <button
                              onClick={() => handleArchive(provider)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-blue-600 hover:bg-blue-500/10 transition-colors w-full text-left"
                            >
                              <Archive className="w-4 h-4" />
                              Archive
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(provider)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 transition-colors w-full text-left border-t border-border"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {showDetailModal && selectedProvider && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">{selectedProvider.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{selectedProvider.email}</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Service Type</p>
                  <p className="text-lg font-semibold text-foreground">{selectedProvider.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(selectedProvider.status)}`}>
                    {selectedProvider.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Join Date</p>
                  <p className="text-lg font-semibold text-foreground">{selectedProvider.joinDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Rating</p>
                  <p className="text-lg font-semibold text-yellow-600">⭐ {selectedProvider.rating}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-lg font-semibold text-green-600">{selectedProvider.revenue}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Bookings</p>
                  <p className="text-lg font-semibold text-foreground">{selectedProvider.bookings}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button className="flex-1">View All Services</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
