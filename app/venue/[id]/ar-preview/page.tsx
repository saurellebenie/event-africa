'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Eye, Download, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function ARPreviewPage({ params }: { params: { id: string } }) {
  const [viewMode, setViewMode] = useState<'2d' | '3d' | 'ar'>('2d')

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/marketplace/provider/${params.id}`} className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={18} />
          Back to Venue
        </Link>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-b from-blue-500/20 to-muted aspect-video flex items-center justify-center relative">
                <div className="text-center">
                  {viewMode === '2d' && (
                    <div className="space-y-4">
                      <div className="text-4xl">📷</div>
                      <p className="text-muted-foreground">2D Gallery View</p>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        View high-resolution photos of the venue from multiple angles
                      </p>
                    </div>
                  )}
                  {viewMode === '3d' && (
                    <div className="space-y-4">
                      <div className="text-4xl">🎮</div>
                      <p className="text-muted-foreground">3D Virtual Tour</p>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Explore the entire venue in interactive 3D
                      </p>
                    </div>
                  )}
                  {viewMode === 'ar' && (
                    <div className="space-y-4">
                      <div className="text-4xl">🔮</div>
                      <p className="text-muted-foreground">Augmented Reality Preview</p>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        See your decorations and setup in real-time using AR
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-border p-4 flex gap-2 justify-center">
                {[
                  { mode: '2d', label: '2D Photos', icon: '📷' },
                  { mode: '3d', label: '3D Tour', icon: '🎮' },
                  { mode: 'ar', label: 'AR Preview', icon: '🔮' },
                ].map((option) => (
                  <button
                    key={option.mode}
                    onClick={() => setViewMode(option.mode as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === option.mode
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{option.icon}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-4">Actions</h3>
              <div className="space-y-3">
                <Button className="w-full gap-2 justify-center">
                  <Eye size={18} />
                  View Full Preview
                </Button>
                <Button variant="outline" className="w-full gap-2 justify-center">
                  <Download size={18} />
                  Download Photos
                </Button>
                <Button variant="outline" className="w-full gap-2 justify-center">
                  <Share2 size={18} />
                  Share Setup
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-semibold text-foreground">Up to 500 guests</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Area</p>
                  <p className="font-semibold text-foreground">5,000 sq meters</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amenities</p>
                  <p className="font-semibold text-foreground">Full catering kitchen</p>
                </div>
              </div>
            </Card>

            <Button className="w-full">Request Booking</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
