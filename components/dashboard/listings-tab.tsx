'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Edit2, Trash2, Eye } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import CreateServiceModal from './create-service-modal'

export default function ListingsTab() {
  const { t } = useI18n()
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const [listings, setListings] = useState([
    { id: 1, name: 'Crystal Venue Nairobi', category: 'Venue', rating: 4.9, reviews: 128, price: '250,000', image: '/luxury-event-venue.png' },
    { id: 2, name: 'Premium DJ Services', category: 'DJ & Music', rating: 4.8, reviews: 95, price: '50,000', image: '/dj-wedding-mixing-console.jpg' },
  ])

  const handleDeleteListing = (id: number) => {
    if (confirm('Are you sure?')) setListings(listings.filter(l => l.id !== id))
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
        + {t('listings.createNew')}
      </Button>

      <div className="grid md:grid-cols-2 gap-6">
        {listings.map(listing => (
          <Card key={listing.id} className="overflow-hidden">
            <div className="aspect-video bg-muted">
              <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">{listing.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{listing.category}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('listings.rating')}</p>
                  <p className="font-semibold text-foreground">{listing.rating} ({listing.reviews})</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t('listings.startingAt')}</p>
                  <p className="font-bold text-primary text-lg">{'$'}{listing.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-2"><Eye size={16} />{t('listings.view')}</Button>
                <Button size="sm" variant="outline" className="gap-2"><Edit2 size={16} /></Button>
                <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive" onClick={() => handleDeleteListing(listing.id)}><Trash2 size={16} /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{t('listings.noServices')}</p>
          <Button onClick={() => setCreateModalOpen(true)}>{t('listings.createFirst')}</Button>
        </div>
      )}

      <CreateServiceModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />
    </div>
  )
}
