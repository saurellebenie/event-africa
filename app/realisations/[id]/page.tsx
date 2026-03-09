'use client'

import { use } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import Navigation from '@/components/navigation'

interface RealisationDetail {
  id: string
  titleFr: string
  titleEn: string
  year: number
  date: string
  category: string
  location: string
  guests: number
  descriptionFr: string
  descriptionEn: string
  gallery: string[]
  services: {
    nameFr: string
    nameEn: string
    provider: string
    icon: string
  }[]
  testimonial: {
    textFr: string
    textEn: string
    author: string
    role: string
    avatar: string
    rating: number
  }
}

const realisationsData: Record<string, RealisationDetail> = {
  '1': {
    id: '1',
    titleFr: 'Mariage Royal Ndiaye-Diallo',
    titleEn: 'Royal Ndiaye-Diallo Wedding',
    year: 2024,
    date: '2024-03-15',
    category: 'Mariage',
    location: 'Dakar, Senegal',
    guests: 450,
    descriptionFr: "Un mariage somptueux celebrant l'union de deux grandes familles senegalaises. La ceremonie traditionnelle a ete suivie d'une reception grandiose au bord de l'ocean, melant traditions africaines et elegance moderne.",
    descriptionEn: 'A sumptuous wedding celebrating the union of two great Senegalese families. The traditional ceremony was followed by a grand reception by the ocean, blending African traditions with modern elegance.',
    gallery: [
      '/elegant-gold-wedding-decoration.jpg',
      '/luxury-beachfront-wedding-venue.jpg',
      '/african-wedding-food-buffet.jpg',
      '/professional-wedding-photography.jpg',
      '/dj-wedding-mixing-console.jpg',
      '/event-planner-coordination-clipboard.jpg',
    ],
    services: [
      { nameFr: 'Decoration Complete', nameEn: 'Full Decoration', provider: 'Luxury Events Design', icon: 'decoration' },
      { nameFr: 'Traiteur 450 Convives', nameEn: 'Catering for 450 Guests', provider: 'Culinary Creations', icon: 'catering' },
      { nameFr: 'DJ & Animation', nameEn: 'DJ & Entertainment', provider: 'Groove Masters', icon: 'dj' },
      { nameFr: 'Photographie & Video', nameEn: 'Photography & Video', provider: 'Memories Studio', icon: 'photo' },
      { nameFr: 'Coordination Jour-J', nameEn: 'Day-of Coordination', provider: 'Premier Planners', icon: 'planner' },
    ],
    testimonial: {
      textFr: "EvenIA a transforme notre vision en realite. Chaque detail etait parfait, de la decoration florale aux plats traditionnels. Nos invites parlent encore de cette soiree magique. Merci infiniment pour ce moment inoubliable!",
      textEn: "EvenIA transformed our vision into reality. Every detail was perfect, from the floral decoration to the traditional dishes. Our guests are still talking about this magical evening. Thank you infinitely for this unforgettable moment!",
      author: 'Aminata Ndiaye',
      role: 'Mariee / Bride',
      avatar: '/placeholder.svg',
      rating: 5,
    },
  },
  '2': {
    id: '2',
    titleFr: 'Gala Annuel Tech Africa',
    titleEn: 'Tech Africa Annual Gala',
    year: 2024,
    date: '2024-06-22',
    category: 'Corporate',
    location: 'Lagos, Nigeria',
    guests: 800,
    descriptionFr: "Le gala annuel de Tech Africa a reuni les leaders de l'innovation technologique du continent. Une soiree d'exception avec remise de prix, networking et spectacles live.",
    descriptionEn: "Tech Africa's annual gala brought together the continent's technology innovation leaders. An exceptional evening with award ceremonies, networking, and live performances.",
    gallery: [
      '/luxury-beachfront-wedding-venue.jpg',
      '/elegant-gold-wedding-decoration.jpg',
      '/event-planner-coordination-clipboard.jpg',
      '/dj-wedding-mixing-console.jpg',
      '/professional-wedding-photography.jpg',
      '/african-wedding-food-buffet.jpg',
    ],
    services: [
      { nameFr: 'Lieu Premium', nameEn: 'Premium Venue', provider: 'Eko Hotels', icon: 'venue' },
      { nameFr: 'Scenographie', nameEn: 'Stage Design', provider: 'Creative Stages', icon: 'decoration' },
      { nameFr: 'Traiteur VIP', nameEn: 'VIP Catering', provider: 'Elite Catering', icon: 'catering' },
      { nameFr: 'Sonorisation Pro', nameEn: 'Pro Sound System', provider: 'Sound Masters', icon: 'dj' },
    ],
    testimonial: {
      textFr: "Organisation impeccable du debut a la fin. L'equipe a gere 800 invites avec professionnalisme. Un succes retentissant pour notre gala annuel!",
      textEn: "Flawless organization from start to finish. The team managed 800 guests with professionalism. A resounding success for our annual gala!",
      author: 'Chukwuemeka Okonkwo',
      role: 'CEO, Tech Africa',
      avatar: '/placeholder.svg',
      rating: 5,
    },
  },
  '3': {
    id: '3',
    titleFr: 'Celebration 50 ans M. Ouattara',
    titleEn: 'Mr. Ouattara 50th Birthday Celebration',
    year: 2023,
    date: '2023-11-10',
    category: 'Anniversaire',
    location: 'Abidjan, Ivory Coast',
    guests: 200,
    descriptionFr: "Une celebration intime mais grandiose pour les 50 ans de M. Ouattara. Theme africain contemporain avec touches dorees et ambiance chaleureuse.",
    descriptionEn: "An intimate yet grand celebration for Mr. Ouattara's 50th birthday. Contemporary African theme with golden touches and warm atmosphere.",
    gallery: [
      '/african-wedding-food-buffet.jpg',
      '/elegant-gold-wedding-decoration.jpg',
      '/dj-wedding-mixing-console.jpg',
      '/professional-wedding-photography.jpg',
      '/luxury-beachfront-wedding-venue.jpg',
      '/event-planner-coordination-clipboard.jpg',
    ],
    services: [
      { nameFr: 'Decoration Thematique', nameEn: 'Themed Decoration', provider: 'Ivoire Deco', icon: 'decoration' },
      { nameFr: 'Gastronomie Africaine', nameEn: 'African Gastronomy', provider: 'Chef Kouassi', icon: 'catering' },
      { nameFr: 'Orchestre Live', nameEn: 'Live Orchestra', provider: 'Magic System Band', icon: 'dj' },
    ],
    testimonial: {
      textFr: "Ma femme et mes enfants ont organise cette fete surprise avec EvenIA. Je n'ai jamais ete aussi emu. Merci pour ces souvenirs precieux!",
      textEn: "My wife and children organized this surprise party with EvenIA. I have never been so moved. Thank you for these precious memories!",
      author: 'Ibrahim Ouattara',
      role: 'Celebrant',
      avatar: '/placeholder.svg',
      rating: 5,
    },
  },
  '4': {
    id: '4',
    titleFr: 'Festival Culturel Panafricain',
    titleEn: 'Pan-African Cultural Festival',
    year: 2023,
    date: '2023-08-05',
    category: 'Festival',
    location: 'Accra, Ghana',
    guests: 5000,
    descriptionFr: "Un festival de trois jours celebrant la richesse culturelle de l'Afrique. Musique, danse, gastronomie et artisanat de tout le continent.",
    descriptionEn: "A three-day festival celebrating Africa's cultural richness. Music, dance, gastronomy, and craftsmanship from across the continent.",
    gallery: [
      '/dj-wedding-mixing-console.jpg',
      '/african-wedding-food-buffet.jpg',
      '/elegant-gold-wedding-decoration.jpg',
      '/luxury-beachfront-wedding-venue.jpg',
      '/professional-wedding-photography.jpg',
      '/event-planner-coordination-clipboard.jpg',
    ],
    services: [
      { nameFr: 'Production Scenique', nameEn: 'Stage Production', provider: 'Afro Stage Pro', icon: 'decoration' },
      { nameFr: 'Restauration Multi-Zones', nameEn: 'Multi-Zone Catering', provider: 'Festival Foods', icon: 'catering' },
      { nameFr: 'Sonorisation Festival', nameEn: 'Festival Sound', provider: 'Sound Africa', icon: 'dj' },
      { nameFr: 'Securite & Logistique', nameEn: 'Security & Logistics', provider: 'SafeEvent', icon: 'planner' },
    ],
    testimonial: {
      textFr: "Gerer un festival de cette envergure n'est pas une mince affaire. EvenIA a coordonne l'ensemble avec maestria. Le public etait enchante!",
      textEn: "Managing a festival of this scale is no small feat. EvenIA coordinated everything masterfully. The audience was delighted!",
      author: 'Kwame Asante',
      role: 'Directeur du Festival',
      avatar: '/placeholder.svg',
      rating: 5,
    },
  },
  '5': {
    id: '5',
    titleFr: 'Mariage Traditionnel Camerounais',
    titleEn: 'Traditional Cameroonian Wedding',
    year: 2023,
    date: '2023-12-20',
    category: 'Mariage',
    location: 'Douala, Cameroun',
    guests: 350,
    descriptionFr: "Un mariage authentique celebrant les traditions Bamileke. Ceremonies traditionnelles, costumes ancestraux et festin memorable.",
    descriptionEn: 'An authentic wedding celebrating Bamileke traditions. Traditional ceremonies, ancestral costumes, and memorable feast.',
    gallery: [
      '/professional-wedding-photography.jpg',
      '/elegant-gold-wedding-decoration.jpg',
      '/african-wedding-food-buffet.jpg',
      '/dj-wedding-mixing-console.jpg',
      '/luxury-beachfront-wedding-venue.jpg',
      '/event-planner-coordination-clipboard.jpg',
    ],
    services: [
      { nameFr: 'Decoration Traditionnelle', nameEn: 'Traditional Decoration', provider: 'Cameroun Deco', icon: 'decoration' },
      { nameFr: 'Cuisine Camerounaise', nameEn: 'Cameroonian Cuisine', provider: 'Mama Africa Catering', icon: 'catering' },
      { nameFr: 'Groupe Musical Traditionnel', nameEn: 'Traditional Music Group', provider: 'Les Tetes Brulees', icon: 'dj' },
      { nameFr: 'Photo & Video 4K', nameEn: '4K Photo & Video', provider: 'CamVision Studio', icon: 'photo' },
    ],
    testimonial: {
      textFr: "Nos familles des deux cotes ont ete impressionnees par le respect des traditions tout en gardant une touche moderne. Un equilibre parfait!",
      textEn: "Our families on both sides were impressed by the respect for traditions while maintaining a modern touch. A perfect balance!",
      author: 'Sandrine Fotso',
      role: 'Mariee / Bride',
      avatar: '/placeholder.svg',
      rating: 5,
    },
  },
  '6': {
    id: '6',
    titleFr: 'Lancement Produit Fintech',
    titleEn: 'Fintech Product Launch',
    year: 2024,
    date: '2024-02-28',
    category: 'Corporate',
    location: 'Nairobi, Kenya',
    guests: 300,
    descriptionFr: "Lancement spectaculaire d'une nouvelle application de paiement mobile. Presentation high-tech, demos interactives et cocktail networking.",
    descriptionEn: 'Spectacular launch of a new mobile payment application. High-tech presentation, interactive demos, and networking cocktail.',
    gallery: [
      '/event-planner-coordination-clipboard.jpg',
      '/luxury-beachfront-wedding-venue.jpg',
      '/dj-wedding-mixing-console.jpg',
      '/elegant-gold-wedding-decoration.jpg',
      '/professional-wedding-photography.jpg',
      '/african-wedding-food-buffet.jpg',
    ],
    services: [
      { nameFr: 'Scenographie Tech', nameEn: 'Tech Stage Design', provider: 'Digital Events', icon: 'decoration' },
      { nameFr: 'Cocktail Premium', nameEn: 'Premium Cocktail', provider: 'Safari Catering', icon: 'catering' },
      { nameFr: 'Production Audiovisuelle', nameEn: 'AV Production', provider: 'Kenya Media', icon: 'dj' },
    ],
    testimonial: {
      textFr: "Le lancement a depasse toutes nos attentes. L'ambiance etait electrique et notre application a fait sensation. ROI excellent!",
      textEn: "The launch exceeded all our expectations. The atmosphere was electric and our app was a hit. Excellent ROI!",
      author: 'James Mwangi',
      role: 'CEO, PayAfrica',
      avatar: '/placeholder.svg',
      rating: 5,
    },
  },
}

export default function RealisationDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = use(params)
  const { locale } = useI18n()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null)

  const realisation = realisationsData[resolvedParams.id]

  if (!realisation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {locale === 'fr' ? 'Realisation non trouvee' : 'Portfolio item not found'}
          </h1>
          <Link href="/">
            <Button>{locale === 'fr' ? 'Retour a l\'accueil' : 'Back to home'}</Button>
          </Link>
        </div>
      </div>
    )
  }

  const title = locale === 'fr' ? realisation.titleFr : realisation.titleEn
  const description = locale === 'fr' ? realisation.descriptionFr : realisation.descriptionEn
  const testimonialText = locale === 'fr' ? realisation.testimonial.textFr : realisation.testimonial.textEn

  return (
    <div className="min-h-screen bg-background">
      <Navigation onAuthClick={setAuthModal} />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={realisation.gallery[0]}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <Link 
                href="/#realisations"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {locale === 'fr' ? 'Retour aux realisations' : 'Back to portfolio'}
              </Link>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge className="bg-primary text-primary-foreground">
                  {realisation.category}
                </Badge>
                <Badge variant="outline" className="border-foreground/30">
                  {realisation.year}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                {title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{realisation.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(realisation.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{realisation.guests} {locale === 'fr' ? 'invites' : 'guests'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  {locale === 'fr' ? "A propos de l'evenement" : 'About the Event'}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {description}
                </p>
              </section>

              {/* Photo Gallery */}
              <section>
                <h2 className="text-2xl font-bold mb-6">
                  {locale === 'fr' ? 'Galerie Photos' : 'Photo Gallery'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {realisation.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                    >
                      <Image
                        src={image}
                        alt={`${title} - Photo ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
                    </button>
                  ))}
                </div>
              </section>

              {/* Testimonial */}
              <section>
                <h2 className="text-2xl font-bold mb-6">
                  {locale === 'fr' ? 'Temoignage Client' : 'Client Testimonial'}
                </h2>
                <Card className="bg-muted/50 border-0">
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-primary/30 mb-4" />
                    <p className="text-lg italic text-foreground mb-6 leading-relaxed">
                      "{testimonialText}"
                    </p>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={realisation.testimonial.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {realisation.testimonial.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">
                          {realisation.testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {realisation.testimonial.role}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: realisation.testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Sidebar - Services */}
            <aside>
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">
                      {locale === 'fr' ? 'Services Fournis' : 'Services Provided'}
                    </h3>
                    <ul className="space-y-4">
                      {realisation.services.map((service, index) => (
                        <li 
                          key={index}
                          className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary text-lg">
                              {service.icon === 'decoration' && '✨'}
                              {service.icon === 'catering' && '🍽'}
                              {service.icon === 'dj' && '🎵'}
                              {service.icon === 'photo' && '📸'}
                              {service.icon === 'planner' && '📋'}
                              {service.icon === 'venue' && '🏛'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {locale === 'fr' ? service.nameFr : service.nameEn}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {service.provider}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-border">
                      <Link href="/ai-assistant">
                        <Button className="w-full" size="lg">
                          {locale === 'fr' 
                            ? 'Planifier un evenement similaire' 
                            : 'Plan a similar event'}
                        </Button>
                      </Link>
                      <p className="text-xs text-muted-foreground text-center mt-3">
                        {locale === 'fr' 
                          ? 'Notre IA vous aidera a creer votre evenement sur mesure' 
                          : 'Our AI will help you create your custom event'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent 
          className="max-w-5xl w-full p-0 bg-background/95 backdrop-blur-sm border-0"
          showCloseButton={false}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          {selectedImage !== null && (
            <div className="relative">
              <Carousel className="w-full" opts={{ startIndex: selectedImage }}>
                <CarouselContent>
                  {realisation.gallery.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video">
                        <Image
                          src={image}
                          alt={`${title} - Photo ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
              
              <div className="p-4 text-center text-sm text-muted-foreground">
                {locale === 'fr' 
                  ? `Photo ${(selectedImage || 0) + 1} sur ${realisation.gallery.length}` 
                  : `Photo ${(selectedImage || 0) + 1} of ${realisation.gallery.length}`}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
