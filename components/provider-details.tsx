'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Clock, Users, CheckCircle, ArrowRight, Calendar, ImageIcon } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

interface Realisation {
  id: string
  titleFr: string
  titleEn: string
  year: number
  image: string
  category: string
  location: string
}

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
  realisations?: Realisation[]
}

interface ProviderDetailsProps {
  provider: Provider
}

export default function ProviderDetails({ provider }: ProviderDetailsProps) {
  const { locale } = useI18n()
  
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
            <h2 className="text-xl font-bold text-foreground mb-4">
              {locale === 'fr' ? 'Disponibilite' : 'Availability'}
            </h2>
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

          {/* Realisations Section */}
          {provider.realisations && provider.realisations.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {locale === 'fr' ? 'Nos Realisations' : 'Our Portfolio'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {locale === 'fr' 
                      ? `${provider.realisations.length} evenements realises` 
                      : `${provider.realisations.length} events completed`}
                  </p>
                </div>
                <Link href="/realisations">
                  <Button variant="outline" size="sm" className="gap-2">
                    {locale === 'fr' ? 'Voir tout' : 'View all'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {provider.realisations.slice(0, 4).map((realisation) => (
                  <Link 
                    key={realisation.id}
                    href={`/realisations/${realisation.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                      <img
                        src={realisation.image || "/placeholder.svg"}
                        alt={locale === 'fr' ? realisation.titleFr : realisation.titleEn}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Year Badge */}
                      <Badge 
                        variant="secondary" 
                        className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm"
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        {realisation.year}
                      </Badge>
                      
                      {/* Category Badge */}
                      <Badge 
                        className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm"
                      >
                        {realisation.category}
                      </Badge>
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
                          {locale === 'fr' ? realisation.titleFr : realisation.titleEn}
                        </h3>
                        <p className="text-sm text-white/80 mt-1">
                          {realisation.location}
                        </p>
                        
                        {/* Hover arrow */}
                        <div className="flex items-center gap-1 mt-2 text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>{locale === 'fr' ? 'Voir details' : 'View details'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {provider.realisations.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>{locale === 'fr' ? 'Aucune realisation pour le moment' : 'No portfolio items yet'}</p>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
