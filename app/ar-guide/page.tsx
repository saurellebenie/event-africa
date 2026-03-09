'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ARGuidePage() {
  const steps = [
    {
      title: 'Enable AR on Your Device',
      description: 'Use an iPhone (iOS 14+), iPad, or Android device with AR Core support',
      icon: '📱',
    },
    {
      title: 'Choose a Venue',
      description: 'Browse our marketplace and select a venue to preview',
      icon: '🏢',
    },
    {
      title: 'View AR Preview',
      description: 'Click "View in AR" to see how decorations and setup look in the space',
      icon: '🔮',
    },
    {
      title: 'Customize Setup',
      description: 'Adjust lighting, decorations, and color schemes to match your vision',
      icon: '🎨',
    },
    {
      title: 'Share Your Vision',
      description: 'Capture and share screenshots with family and the venue team',
      icon: '📸',
    },
    {
      title: 'Book Your Venue',
      description: 'Proceed to booking once you\'ve finalized your setup',
      icon: '✓',
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">How to Use AR Venue Preview</h1>
          <p className="text-lg text-muted-foreground">
            Visualize your event before booking with our augmented reality tool
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {steps.map((step, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{step.icon}</div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 mb-8 bg-primary/5 border border-primary/10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Benefits of AR Preview</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Make confident decisions before booking</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Visualize different decoration schemes in real-time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Share your vision with family and event team</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Reduce planning time and eliminate surprises</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Get accurate space visualization from any angle</span>
            </li>
          </ul>
        </Card>

        <div className="text-center">
          <Button size="lg" className="gap-2">
            Start Exploring Venues
          </Button>
        </div>
      </div>
    </div>
  )
}
