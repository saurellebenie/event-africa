'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Star, MapPin } from 'lucide-react'

interface ProviderGridProps {
  searchQuery: string
  category: string
}

const mockProviders = [
  {
    id: '1',
    name: 'Crystal Venue Nairobi',
    category: 'venue',
    rating: 4.9,
    reviews: 128,
    image: '/luxury-event-venue.png',
    location: 'Nairobi, Kenya',
    price: '250K KES',
  },
  {
    id: '2',
    name: 'DJ Sound Masters',
    category: 'dj',
    rating: 4.8,
    reviews: 95,
    image: '/professional-dj-equipment.jpg',
    location: 'Lagos, Nigeria',
    price: '50K NGN',
  },
  {
    id: '3',
    name: 'Elegant Catering Co',
    category: 'catering',
    rating: 4.7,
    reviews: 156,
    image: '/gourmet-catering-spread.jpg',
    location: 'Cape Town, South Africa',
    price: '100K ZAR',
  },
  {
    id: '4',
    name: 'Floral Dream Design',
    category: 'decoration',
    rating: 4.9,
    reviews: 203,
    image: '/wedding-flower-decorations.jpg',
    location: 'Accra, Ghana',
    price: '75K GHS',
  },
  {
    id: '5',
    name: 'Professional Lens Studio',
    category: 'photography',
    rating: 4.8,
    reviews: 112,
    image: '/professional-photo-session.png',
    location: 'Johannesburg, South Africa',
    price: '120K ZAR',
  },
  {
    id: '6',
    name: 'Event Maestro Planning',
    category: 'planning',
    rating: 4.9,
    reviews: 89,
    image: '/event-planning-coordination.jpg',
    location: 'Kampala, Uganda',
    price: '200K UGX',
  },
]

export default function ProviderGrid({ searchQuery, category }: ProviderGridProps) {
  const filtered = mockProviders.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === 'all' || provider.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Found {filtered.length} {filtered.length === 1 ? 'provider' : 'providers'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((provider) => (
          <Link key={provider.id} href={`/marketplace/provider/${provider.id}`}>
            <Card className="overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={provider.image || "/placeholder.svg"}
                  alt={provider.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                  {provider.name}
                </h3>
                <div className="flex items-center gap-1 mb-3 text-sm">
                  <Star size={16} className="fill-accent text-accent" />
                  <span className="font-medium text-foreground">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin size={14} />
                  {provider.location}
                </div>
                <div className="mt-auto">
                  <p className="font-semibold text-primary mb-3">{provider.price}</p>
                  <div className="w-full h-8 rounded bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center text-sm font-medium transition-colors">
                    View Details
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No providers found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  )
}
