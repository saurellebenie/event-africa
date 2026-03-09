'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export interface Realisation {
  id: string
  titleFr: string
  titleEn: string
  year: number
  image: string
  category: string
  location: string
}

const realisations: Realisation[] = [
  {
    id: '1',
    titleFr: 'Mariage Royal Ndiaye-Diallo',
    titleEn: 'Royal Ndiaye-Diallo Wedding',
    year: 2024,
    image: '/elegant-gold-wedding-decoration.jpg',
    category: 'Mariage',
    location: 'Dakar, Senegal',
  },
  {
    id: '2',
    titleFr: 'Gala Annuel Tech Africa',
    titleEn: 'Tech Africa Annual Gala',
    year: 2024,
    image: '/luxury-beachfront-wedding-venue.jpg',
    category: 'Corporate',
    location: 'Lagos, Nigeria',
  },
  {
    id: '3',
    titleFr: 'Celebration 50 ans M. Ouattara',
    titleEn: 'Mr. Ouattara 50th Birthday Celebration',
    year: 2023,
    image: '/african-wedding-food-buffet.jpg',
    category: 'Anniversaire',
    location: 'Abidjan, Ivory Coast',
  },
  {
    id: '4',
    titleFr: 'Festival Culturel Panafricain',
    titleEn: 'Pan-African Cultural Festival',
    year: 2023,
    image: '/dj-wedding-mixing-console.jpg',
    category: 'Festival',
    location: 'Accra, Ghana',
  },
  {
    id: '5',
    titleFr: 'Mariage Traditionnel Camerounais',
    titleEn: 'Traditional Cameroonian Wedding',
    year: 2023,
    image: '/professional-wedding-photography.jpg',
    category: 'Mariage',
    location: 'Douala, Cameroun',
  },
  {
    id: '6',
    titleFr: 'Lancement Produit Fintech',
    titleEn: 'Fintech Product Launch',
    year: 2024,
    image: '/event-planner-coordination-clipboard.jpg',
    category: 'Corporate',
    location: 'Nairobi, Kenya',
  },
]

export default function RealisationsSection() {
  const { t, locale } = useI18n()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {locale === 'fr' ? 'Nos Realisations' : 'Our Portfolio'}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {locale === 'fr' 
              ? 'Des Evenements Inoubliables' 
              : 'Unforgettable Events'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {locale === 'fr'
              ? "Decouvrez quelques-unes de nos plus belles realisations a travers l'Afrique. Chaque evenement raconte une histoire unique."
              : 'Discover some of our finest achievements across Africa. Each event tells a unique story.'}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {realisations.map((realisation) => (
            <Link 
              key={realisation.id} 
              href={`/realisations/${realisation.id}`}
            >
              <Card 
                className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setHoveredId(realisation.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={realisation.image}
                    alt={locale === 'fr' ? realisation.titleFr : realisation.titleEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  
                  {/* Year badge */}
                  <Badge 
                    className="absolute top-4 right-4 bg-primary text-primary-foreground font-semibold"
                  >
                    {realisation.year}
                  </Badge>

                  {/* Content overlay */}
                  <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-card">
                    <Badge 
                      variant="outline" 
                      className="mb-3 border-card/50 text-card bg-card/10 backdrop-blur-sm"
                    >
                      {realisation.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-1 line-clamp-2 group-hover:text-primary-foreground transition-colors">
                      {locale === 'fr' ? realisation.titleFr : realisation.titleEn}
                    </h3>
                    <p className="text-sm text-card/80">
                      {realisation.location}
                    </p>

                    {/* Animated arrow on hover */}
                    <div 
                      className={`flex items-center gap-2 mt-4 text-sm font-medium transition-all duration-300 ${
                        hoveredId === realisation.id 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 -translate-x-2'
                      }`}
                    >
                      <span>{locale === 'fr' ? 'Voir les details' : 'View details'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/realisations">
            <Button size="lg" variant="outline" className="gap-2">
              {locale === 'fr' ? 'Voir toutes nos realisations' : 'View all our work'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
