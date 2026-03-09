'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, MapPin, Users, Calendar, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data for individual services
const serviceDetails = {
  1: {
    id: 1,
    category: 'Decoration',
    title: 'Elegant Golden Wedding Decoration',
    provider: 'Luxury Events Design',
    providerUrl: '/marketplace/provider/1',
    location: 'Lagos, Nigeria',
    rating: 4.9,
    reviews: 128,
    price: 'From ₦2,500,000',
    description: 'Transform your wedding with our signature golden elegance theme. We specialize in creating unforgettable moments with premium floral arrangements, sophisticated lighting, and bespoke decoration concepts.',
    colors: ['Gold', 'White', 'Cream'],
    gallery: [
      '/golden-wedding-decoration-1.jpg',
      '/golden-wedding-decoration-2.jpg',
      '/elegant-white-flowers-arrangement.jpg',
      '/wedding-venue-decorated-gold.jpg',
    ],
    details: {
      colorPalette: 'Gold, White, and Cream with accent touches of champagne',
      floral: 'Premium imported flowers with exotic African blooms',
      lighting: 'Professional uplighting and ambient lighting design',
      themes: ['Romantic', 'Luxurious', 'Modern', 'Cultural Fusion'],
      setup: 'Full venue transformation including entrance, reception area, and backdrop design',
      capacity: 'Perfect for 100-500 guests',
      setupTime: '6-8 hours',
      teamSize: '8-12 experienced decorators',
    },
    testimonials: [
      {
        author: 'Mrs. Adeyemi',
        text: 'They transformed our venue into a palace! Every detail was perfect.',
        rating: 5,
      },
      {
        author: 'Chief Okonkwo',
        text: 'Professional, creative, and efficient. Highly recommended!',
        rating: 5,
      },
    ],
    contact: {
      phone: '+234 803 456 7890',
      email: 'info@luxuryeventsdesign.com',
      whatsapp: '+234 803 456 7890',
    },
  },
  2: {
    id: 2,
    category: 'DJ Service',
    title: 'Wedding Reception DJ - Live Mix',
    provider: 'Groove Masters Entertainment',
    providerUrl: '/marketplace/provider/2',
    location: 'Accra, Ghana',
    rating: 4.8,
    reviews: 256,
    price: 'From ₦800,000',
    description: 'Experience non-stop entertainment with our professional DJ services. State-of-the-art sound systems, curated playlists, and live mixing to keep your guests dancing all night.',
    colors: ['Black', 'Silver', 'RGB'],
    gallery: [
      '/dj-mixing-console-wedding.jpg',
      '/wedding-reception-dj-setup.jpg',
      '/dance-floor-lighting-effects.jpg',
      '/crowd-dancing-at-wedding.jpg',
    ],
    details: {
      equipment: 'Premium Pioneer CDJ equipment with twin turntables',
      soundSystem: '15kW professional PA system with subwoofers',
      lighting: 'Dynamic RGB lighting effects synchronized to music',
      musicLibrary: '50,000+ songs covering all genres and eras',
      services: ['MC services', 'Live MC', 'Sound design', 'Custom intro videos'],
      experience: '15+ years in event entertainment',
      coverage: 'Full event from reception to departure',
      customization: 'Music selection based on guest preferences',
    },
    testimonials: [
      {
        author: 'Kwame Asante',
        text: 'Best DJ we could have hired! The energy was amazing.',
        rating: 5,
      },
      {
        author: 'Ama Mensah',
        text: 'Professional, punctual, and incredible selection of music!',
        rating: 5,
      },
    ],
    contact: {
      phone: '+233 24 567 8901',
      email: 'booking@groovemasters.com',
      whatsapp: '+233 24 567 8901',
    },
  },
}

export default function ServiceDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const service = serviceDetails[params.id as keyof typeof serviceDetails] || serviceDetails[2]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="mb-8">
              <div className="mb-4 bg-muted rounded-lg overflow-hidden aspect-video">
                <img
                  src={service.gallery[selectedImage] || "/placeholder.svg"}
                  alt={`${service.title} - ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {service.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden aspect-square border-2 transition-all ${selectedImage === index
                        ? 'border-primary'
                        : 'border-border hover:border-muted-foreground'
                      }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Color Palette</h4>
                      <p className="text-muted-foreground mb-4">{service.details.colorPalette}</p>
                      <div className="flex gap-2 flex-wrap">
                        {service.colors.map((color) => (
                          <Badge key={color} variant="secondary">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Specifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(service.details).map(([key, value]) => (
                      <div key={key} className="border-b border-border pb-4 last:border-0">
                        <h4 className="font-semibold text-foreground capitalize mb-2">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        {Array.isArray(value) ? (
                          <div className="flex flex-wrap gap-2">
                            {value.map((item) => (
                              <Badge key={item} variant="outline">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">{value}</p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {service.testimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{testimonial.author}</CardTitle>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-accent text-accent"
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Card */}
            <Card className="sticky top-8">
              <CardHeader>
                <Badge className="w-fit bg-primary text-primary-foreground mb-2">
                  {service.category}
                </Badge>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.provider}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Rating */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(service.rating)
                              ? 'fill-accent text-accent'
                              : 'text-border'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{service.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({service.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2 pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground">Starting Price</p>
                  <p className="text-2xl font-bold text-primary">{service.price}</p>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{service.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Contact</p>
                      <p className="text-sm text-muted-foreground">{service.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">{service.contact.email}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Book Now
                  </Button>
                  <Link href={service.providerUrl} className="block">
                    <Button variant="outline" className="w-full">
                      View Provider Profile
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full">
                    Message Provider
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
