'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BudgetBreakdown from './budget-breakdown'
import RecommendedProviders from './recommended-providers'

export default function EventPlanner() {
  const [formData, setFormData] = useState({
    eventType: 'wedding',
    guestCount: '',
    budget: '',
    location: '',
    date: '',
  })

  const [results, setResults] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerate = () => {
    if (!formData.guestCount || !formData.budget) {
      alert('Please fill in guest count and budget')
      return
    }

    const budget = parseInt(formData.budget)
    const breakdown = {
      venue: Math.round(budget * 0.4),
      catering: Math.round(budget * 0.3),
      entertainment: Math.round(budget * 0.2),
      decorations: Math.round(budget * 0.1),
    }

    const recommendations = [
      {
        category: 'Venues',
        providers: [
          { name: 'Crystal Venue Nairobi', match: 95, price: breakdown.venue },
          { name: 'Elegance Hall', match: 92, price: breakdown.venue },
        ],
      },
      {
        category: 'Catering',
        providers: [
          { name: 'Gourmet Catering Co', match: 94, price: breakdown.catering },
          { name: 'African Cuisine Experts', match: 90, price: breakdown.catering },
        ],
      },
      {
        category: 'Entertainment',
        providers: [
          { name: 'DJ Sound Masters', match: 96, price: breakdown.entertainment },
          { name: 'Live Band Collective', match: 91, price: breakdown.entertainment },
        ],
      },
      {
        category: 'Decorations',
        providers: [
          { name: 'Floral Dream Design', match: 93, price: breakdown.decorations },
          { name: 'Creative Decor Studio', match: 89, price: breakdown.decorations },
        ],
      },
    ]

    setResults({
      eventType: formData.eventType,
      guestCount: formData.guestCount,
      totalBudget: budget,
      breakdown,
      recommendations,
    })
  }

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Event Planning Wizard</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Event Type
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate Event</option>
              <option value="birthday">Birthday Party</option>
              <option value="conference">Conference</option>
              <option value="graduation">Graduation</option>
              <option value="anniversary">Anniversary</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Number of Guests
            </label>
            <Input
              name="guestCount"
              type="number"
              value={formData.guestCount}
              onChange={handleChange}
              placeholder="e.g., 150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Total Budget
            </label>
            <Input
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., 500000"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Event Date
            </label>
            <Input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button onClick={handleGenerate} size="lg" className="w-full">
          Generate Plan & Recommendations
        </Button>
      </Card>

      {results && (
        <>
          <BudgetBreakdown breakdown={results.breakdown} totalBudget={results.totalBudget} />
          <RecommendedProviders recommendations={results.recommendations} />
        </>
      )}
    </div>
  )
}
