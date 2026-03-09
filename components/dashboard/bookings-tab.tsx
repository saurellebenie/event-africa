'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users, CheckCircle, Clock, X } from 'lucide-react'

export default function BookingsTab() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'completed'>('all')

  const bookings = [
    {
      id: 1,
      client: 'Amara Johnson',
      event: 'Wedding Reception',
      date: 'December 15, 2024',
      guests: 250,
      location: 'Lagos, Nigeria',
      amount: '₦500,000',
      status: 'pending',
    },
    {
      id: 2,
      client: 'Tech Corp Ltd',
      event: 'Corporate Gala',
      date: 'December 8, 2024',
      guests: 150,
      location: 'Nairobi, Kenya',
      amount: '₦350,000',
      status: 'approved',
    },
    {
      id: 3,
      client: 'Blessing Okafor',
      event: 'Birthday Party',
      date: 'November 20, 2024',
      guests: 80,
      location: 'Lagos, Nigeria',
      amount: '₦200,000',
      status: 'completed',
    },
  ]

  const filtered = bookings.filter(
    (b) => filter === 'all' || b.status === filter
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
      case 'approved':
        return 'bg-green-500/10 text-green-600 border border-green-500/20'
      case 'completed':
        return 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
      default:
        return 'bg-muted'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock
      case 'approved':
        return CheckCircle
      case 'completed':
        return CheckCircle
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'approved', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              filter === f
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((booking) => {
          const StatusIcon = getStatusIcon(booking.status)
          return (
            <Card key={booking.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{booking.event}</h3>
                  <p className="text-sm text-muted-foreground">by {booking.client}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                  <StatusIcon size={14} />
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  {booking.date}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users size={16} />
                  {booking.guests} guests
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  {booking.location}
                </div>
                <div className="font-semibold text-primary">{booking.amount}</div>
              </div>

              <div className="flex gap-2">
                {booking.status === 'pending' && (
                  <>
                    <Button size="sm" className="flex-1">Approve</Button>
                    <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                  </>
                )}
                {booking.status === 'approved' && (
                  <>
                    <Button size="sm" className="flex-1">View Details</Button>
                    <Button size="sm" variant="outline">Message Client</Button>
                  </>
                )}
                {booking.status === 'completed' && (
                  <Button size="sm" variant="outline" className="flex-1">View Invoice</Button>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
