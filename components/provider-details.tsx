'use client'

import { Card } from '@/components/ui/card'
import { Star, MapPin, Clock, Users, CheckCircle } from 'lucide-react'

interface Provider {
  id: string
  name: string
  rating: number
  reviews: number
  location: string
  description: string
  amenities: string[]
  gallery: string[]
  availability: string[]
  responseTime: string
  yearsExperience: number
}

interface ProviderDetailsProps {
  provider: Provider
}

export default function ProviderDetails({ provider }: ProviderDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden mb-4">
            <img
              src={provider.gallery[0] || "/placeholder.svg"}
              alt={provider.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {provider.gallery.slice(1).map((image, idx) => (
              <div key={idx} className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{provider.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Star size={18} className="fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{provider.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({provider.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin size={16} />
              {provider.location}
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-primary" />
                <span>Response time: {provider.responseTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-primary" />
                <span>{provider.yearsExperience} years experience</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">{provider.description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-3">
              {provider.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{amenity}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Availability</h2>
            <div className="flex flex-wrap gap-2">
              {provider.availability.map((slot) => (
                <div
                  key={slot}
                  className="px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-sm font-medium text-primary"
                >
                  {slot}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
