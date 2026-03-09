'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const services = [
  { id: 1, category: 'Decoration', titleFr: 'Decoration Doree Mariage Elegant', titleEn: 'Elegant Golden Wedding Decoration', provider: 'Luxury Events Design', location: 'Lagos, Nigeria', rating: 4.9, reviews: 128, image: '/elegant-gold-wedding-decoration.jpg', descFr: 'Theme dore et blanc somptueux avec arrangements floraux premium', descEn: 'Stunning golden and white theme with premium floral arrangements', colors: ['Gold', 'White', 'Cream'], featured: true },
  { id: 2, category: 'DJ Service', titleFr: 'DJ Reception Mariage - Mix Live', titleEn: 'Wedding Reception DJ - Live Mix', provider: 'Groove Masters Entertainment', location: 'Accra, Ghana', rating: 4.8, reviews: 256, image: '/dj-wedding-mixing-console.jpg', descFr: 'Services DJ professionnels avec sonorisation et eclairage dernier cri', descEn: 'Professional DJ services with state-of-the-art sound system and lighting', colors: ['Black', 'Silver', 'RGB'], featured: true },
  { id: 3, category: 'Catering', titleFr: 'Menu Mariage Traditionnel Africain', titleEn: 'Traditional African Wedding Menu', provider: 'Culinary Creations', location: 'Nairobi, Kenya', rating: 4.7, reviews: 189, image: '/african-wedding-food-buffet.jpg', descFr: 'Cuisine africaine authentique avec presentation moderne pour 200-500 convives', descEn: 'Authentic African cuisine with modern presentation for 200-500 guests', colors: ['Gold', 'Brown', 'Green'], featured: false },
  { id: 4, category: 'Venue', titleFr: 'Salle de Mariage Luxe Bord de Mer', titleEn: 'Luxury Beachfront Wedding Venue', provider: 'Coastal Dreams Events', location: 'Dar es Salaam, Tanzania', rating: 4.9, reviews: 342, image: '/luxury-beachfront-wedding-venue.jpg', descFr: 'Emplacement face a l\'ocean avec capacite de 300 invites et toutes commodites', descEn: 'Stunning oceanfront location with capacity for 300 guests and all amenities', colors: ['Blue', 'White', 'Sand'], featured: true },
  { id: 5, category: 'Photography', titleFr: 'Photographie de Mariage Professionnelle', titleEn: 'Professional Wedding Photography', provider: 'Memories Captured Studio', location: 'Dakar, Senegal', rating: 4.8, reviews: 201, image: '/professional-wedding-photography.jpg', descFr: 'Couverture 12h avec 1500+ photos retouchees et resume du jour', descEn: '12-hour coverage with 1500+ edited photos and same-day highlight reel', colors: ['Black', 'White', 'Gold'], featured: false },
  { id: 6, category: 'Coordination', titleFr: 'Planification et Coordination Completes', titleEn: 'Full Event Planning & Coordination', provider: 'Premier Event Planners', location: 'Abuja, Nigeria', rating: 4.9, reviews: 167, image: '/event-planner-coordination-clipboard.jpg', descFr: 'Gestion complete de l\'evenement de la planification a l\'execution', descEn: 'Complete event management from planning to execution with vendor coordination', colors: ['Purple', 'Gold', 'Ivory'], featured: true },
]

export default function ServicePortfolio() {
  const { t, locale } = useI18n()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const featuredServices = services.filter((s) => s.featured)
  const otherServices = services.filter((s) => !s.featured)

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedServices = otherServices.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(otherServices.length / itemsPerPage)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {t('portfolio.featured')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            {t('portfolio.featuredSubtitle')}
          </p>
        </div>

        {/* Featured */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredServices.map((service) => (
            <Link key={service.id} href={`/service/${service.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
                <div className="relative overflow-hidden h-48 bg-muted">
                  <img src={service.image || '/placeholder.svg'} alt={locale === 'fr' ? service.titleFr : service.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">{service.category}</Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {locale === 'fr' ? service.titleFr : service.titleEn}
                  </CardTitle>
                  <CardDescription className="text-sm">{service.provider}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {locale === 'fr' ? service.descFr : service.descEn}
                  </p>
                  <div className="flex items-center gap-1 text-sm mb-3">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews} {t('portfolio.reviews')})</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {service.colors.map((color) => (
                      <Badge key={color} variant="secondary" className="text-xs">{color}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {t('portfolio.viewDetails')}
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* More Services */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">{t('portfolio.moreServices')}</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {paginatedServices.map((service) => (
              <Link key={service.id} href={`/service/${service.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col md:flex-row">
                  <div className="relative overflow-hidden w-full md:w-48 h-32 md:h-auto bg-muted flex-shrink-0">
                    <img src={service.image || '/placeholder.svg'} alt={locale === 'fr' ? service.titleFr : service.titleEn} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-base">{locale === 'fr' ? service.titleFr : service.titleEn}</CardTitle>
                          <CardDescription className="text-sm">{service.provider}</CardDescription>
                        </div>
                        <Badge className="bg-primary text-primary-foreground flex-shrink-0">{service.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground mb-2">
                        {locale === 'fr' ? service.descFr : service.descEn}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-accent text-accent" />
                          <span>{service.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span>{service.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="ml-auto">
                        {t('portfolio.viewDetails')}
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="gap-1">
                <ChevronLeft className="w-4 h-4" />
                {t('portfolio.previous')}
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button key={page} variant={currentPage === page ? 'default' : 'outline'} size="sm" onClick={() => setCurrentPage(page)} className="w-10 h-10 p-0">
                    {page}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="gap-1">
                {t('portfolio.next')}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">{t('portfolio.browseAll')}</h3>
          <p className="text-muted-foreground mb-6">{t('portfolio.browseAllSubtitle')}</p>
          <Link href="/marketplace">
            <Button size="lg" className="bg-primary hover:bg-primary/90">{t('portfolio.exploreMarketplace')}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
