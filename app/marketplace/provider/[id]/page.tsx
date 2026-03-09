'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navigation from '@/components/navigation'
import ProviderDetails from '@/components/provider-details'
import { useI18n } from '@/lib/i18n'
import BookServiceForm from "@/components/book-service/book-service-form";

const mockProvider = {
  id: '1',
  name: 'Crystal Venue Nairobi',
  category: 'venue',
  rating: 4.9,
  reviews: 128,
  price: 250000,
  priceUnit: 'KES per event',
  image: '/luxury-event-venue.png',
  location: 'Nairobi, Kenya',
  description: 'Stunning luxury venue perfect for weddings, conferences, and corporate events. Seats up to 500 guests with state-of-the-art facilities.',
  amenities: ['Free WiFi', 'Air Conditioning', 'Parking Available', 'Catering Kitchen', 'Sound System', 'Lighting Equipment'],
  gallery: ['/elegant-event-hall.png', '/wedding-reception-venue.jpg', '/conference-room.png'],
  availability: ['Mon-Fri', 'Weekends', 'Holidays'],
  responseTime: '< 2 hours',
  yearsExperience: 8,
  realisations: [
    {
      id: '6',
      titleFr: 'Lancement Produit Fintech',
      titleEn: 'Fintech Product Launch',
      year: 2024,
      image: '/event-planner-coordination-clipboard.jpg',
      category: 'Corporate',
      location: 'Nairobi, Kenya',
    },
    {
      id: '1',
      titleFr: 'Mariage Royal Ndiaye-Diallo',
      titleEn: 'Royal Ndiaye-Diallo Wedding',
      year: 2024,
      image: '/elegant-gold-wedding-decoration.jpg',
      category: 'Mariage',
      location: 'Nairobi, Kenya',
    },
    {
      id: '2',
      titleFr: 'Gala Annuel Tech Africa',
      titleEn: 'Tech Africa Annual Gala',
      year: 2024,
      image: '/luxury-beachfront-wedding-venue.jpg',
      category: 'Corporate',
      location: 'Nairobi, Kenya',
    },
  ],
}

export default function ProviderPage({ params }: { params: { id: string } }) {
  const [selectedTab, setSelectedTab] = useState<'details' | 'booking'>('details')
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} />

      {/* Sub-header: back button + tabs */}
      <div className="fixed top-16 left-0 right-0 z-40 border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-6">
          <Link
            href="/marketplace"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('provider.backToMarketplace')}
          </Link>

          <span className="h-5 w-px bg-border" aria-hidden="true" />

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('details')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTab === 'details'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {t('provider.details')}
            </button>
            <button
              onClick={() => setSelectedTab('booking')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTab === 'booking'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {t('provider.book')}
            </button>
          </div>
        </div>
      </div>

      <div className="pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedTab === 'details' ? (
            <ProviderDetails provider={mockProvider} />
          ) : (
            <BookServiceForm />
          )}
        </div>
      </div>
    </div>
  )
}
