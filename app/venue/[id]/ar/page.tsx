'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ARViewer from '@/components/ar/ar-viewer'
import ARControls from '@/components/ar/ar-controls'
import DecorationPresets from '@/components/ar/decoration-presets'

export default function VenueARPage({ params }: { params: { id: string } }) {
  const [arSupported, setArSupported] = useState(true)
  const [selectedPreset, setSelectedPreset] = useState('elegant')
  const [lighting, setLighting] = useState(75)
  const [decorationOpacity, setDecorationOpacity] = useState(100)
  const [showDetails, setShowDetails] = useState(true)

  useEffect(() => {
    // Check AR support
    const hasARSupport = 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices
    setArSupported(hasARSupport)
  }, [])

  if (!arSupported) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-12 flex items-center justify-center">
        <div className="max-w-md text-center">
          <Card className="p-8">
            <h1 className="text-2xl font-bold text-foreground mb-4">AR Not Supported</h1>
            <p className="text-muted-foreground mb-6">
              Your device doesn't support augmented reality. Please use a modern smartphone or tablet with AR capabilities.
            </p>
            <Button className="w-full">View Gallery Instead</Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AR Venue Preview</h1>
          <p className="text-muted-foreground">
            Visualize your event setup before booking
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ARViewer preset={selectedPreset} lighting={lighting} opacity={decorationOpacity} />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 sticky top-24">
              <h2 className="font-bold text-foreground mb-4">AR Controls</h2>

              <ARControls
                lighting={lighting}
                setLighting={setLighting}
                decorationOpacity={decorationOpacity}
                setDecorationOpacity={setDecorationOpacity}
              />

              <div className="mt-6 pt-6 border-t border-border">
                <Button className="w-full mb-2">Capture Screenshot</Button>
                <Button variant="outline" className="w-full">Share Setup</Button>
              </div>
            </Card>

            <DecorationPresets
              selectedPreset={selectedPreset}
              onSelectPreset={setSelectedPreset}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
