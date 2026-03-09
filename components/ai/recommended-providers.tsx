'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

interface Provider {
  name: string
  match: number
  price: number
}

interface RecommendedProvidersProps {
  recommendations: Array<{
    category: string
    providers: Provider[]
  }>
}

export default function RecommendedProviders({ recommendations }: RecommendedProvidersProps) {
  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-foreground mb-8">AI-Recommended Providers</h2>

      <div className="space-y-8">
        {recommendations.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold text-foreground mb-4">{category.category}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {category.providers.map((provider) => (
                <Card key={provider.name} className="p-4 border-2 border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{provider.name}</p>
                      <div className="flex items-center gap-1 text-sm mt-1">
                        <Star size={14} className="fill-yellow-500 text-yellow-500" />
                        <span className="text-muted-foreground">{provider.match}% AI Match</span>
                      </div>
                    </div>
                    <p className="font-bold text-primary text-right">
                      {provider.price.toLocaleString()} KES
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-sm text-blue-600">
          These recommendations are based on your budget, location, and event type. Prices may vary based on specific requirements. All providers are verified and rated by users.
        </p>
      </div>
    </Card>
  )
}
