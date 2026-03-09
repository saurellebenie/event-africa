'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, ArrowRight, Search, Filter, Star } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import Navigation from '@/components/navigation'
import AuthModal from '@/components/auth-modal'

interface Creator {
  id: string
  name: string
  avatar: string
  rating: number
}

interface Realisation {
  id: string
  titleFr: string
  titleEn: string
  year: number
  image: string
  category: string
  location: string
  creator: Creator
}

const allRealisations: Realisation[] = [
  {
    id: '1',
    titleFr: 'Mariage Royal Ndiaye-Diallo',
    titleEn: 'Royal Ndiaye-Diallo Wedding',
    year: 2024,
    image: '/elegant-gold-wedding-decoration.jpg',
    category: 'Mariage',
    location: 'Dakar, Senegal',
    creator: { id: '1', name: 'Crystal Venue Dakar', avatar: '/placeholder.svg', rating: 4.9 },
  },
  {
    id: '2',
    titleFr: 'Gala Annuel Tech Africa',
    titleEn: 'Tech Africa Annual Gala',
    year: 2024,
    image: '/luxury-beachfront-wedding-venue.jpg',
    category: 'Corporate',
    location: 'Lagos, Nigeria',
    creator: { id: '6', name: 'Eko Hotels & Suites', avatar: '/placeholder.svg', rating: 4.8 },
  },
  {
    id: '3',
    titleFr: 'Celebration 50 ans M. Ouattara',
    titleEn: 'Mr. Ouattara 50th Birthday Celebration',
    year: 2023,
    image: '/african-wedding-food-buffet.jpg',
    category: 'Anniversaire',
    location: 'Abidjan, Ivory Coast',
    creator: { id: '10', name: 'Ivoire Deco Events', avatar: '/placeholder.svg', rating: 4.8 },
  },
  {
    id: '4',
    titleFr: 'Festival Culturel Panafricain',
    titleEn: 'Pan-African Cultural Festival',
    year: 2023,
    image: '/dj-wedding-mixing-console.jpg',
    category: 'Festival',
    location: 'Accra, Ghana',
    creator: { id: '13', name: 'Afro Stage Productions', avatar: '/placeholder.svg', rating: 4.7 },
  },
  {
    id: '5',
    titleFr: 'Mariage Traditionnel Camerounais',
    titleEn: 'Traditional Cameroonian Wedding',
    year: 2023,
    image: '/professional-wedding-photography.jpg',
    category: 'Mariage',
    location: 'Douala, Cameroun',
    creator: { id: '17', name: 'Cameroun Deco Prestige', avatar: '/placeholder.svg', rating: 4.6 },
  },
  {
    id: '6',
    titleFr: 'Lancement Produit Fintech',
    titleEn: 'Fintech Product Launch',
    year: 2024,
    image: '/event-planner-coordination-clipboard.jpg',
    category: 'Corporate',
    location: 'Nairobi, Kenya',
    creator: { id: '21', name: 'Crystal Venue Nairobi', avatar: '/placeholder.svg', rating: 4.9 },
  },
]

const categories = ['Tous', 'Mariage', 'Corporate', 'Anniversaire', 'Festival']
const years = ['Tous', '2024', '2023', '2022']

export default function RealisationsPage() {
  const { locale } = useI18n()
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedYear, setSelectedYear] = useState('Tous')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredRealisations = allRealisations.filter((r) => {
    const title = locale === 'fr' ? r.titleFr : r.titleEn
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Tous' || r.category === selectedCategory
    const matchesYear = selectedYear === 'Tous' || r.year.toString() === selectedYear
    return matchesSearch && matchesCategory && matchesYear
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation onAuthClick={setAuthModal} />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'fr' ? 'Retour a l\'accueil' : 'Back to home'}
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {locale === 'fr' ? 'Nos Realisations' : 'Our Portfolio'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              {locale === 'fr'
                ? "Explorez notre collection d'evenements realises a travers l'Afrique. Chaque projet reflete notre engagement envers l'excellence."
                : 'Explore our collection of events across Africa. Each project reflects our commitment to excellence.'}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'fr' ? 'Rechercher un evenement...' : 'Search events...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'Tous' && locale === 'en' ? 'All' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year === 'Tous' && locale === 'en' ? 'All Years' : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filteredRealisations.length} {locale === 'fr' ? 'resultats trouves' : 'results found'}
          </p>

          {/* Grid */}
          {filteredRealisations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRealisations.map((realisation) => (
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
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                      
                      <Badge 
                        className="absolute top-4 right-4 bg-primary text-primary-foreground font-semibold"
                      >
                        {realisation.year}
                      </Badge>

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

                        {/* Creator info */}
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-card/20">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={realisation.creator.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {realisation.creator.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-card/90 truncate flex-1">{realisation.creator.name}</span>
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            <span className="text-xs text-card/90">{realisation.creator.rating}</span>
                          </div>
                        </div>

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
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                {locale === 'fr' 
                  ? 'Aucun evenement trouve avec ces criteres.' 
                  : 'No events found matching your criteria.'}
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('Tous')
                  setSelectedYear('Tous')
                }}
              >
                {locale === 'fr' ? 'Reinitialiser les filtres' : 'Reset filters'}
              </Button>
            </div>
          )}
        </div>
      </main>

      <AuthModal mode={authModal} onClose={() => setAuthModal(null)} />
    </div>
  )
}
