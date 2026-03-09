'use client'

import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

export default function ReviewsTab() {
  const reviews = [
    {
      id: 1,
      author: 'Amara Johnson',
      rating: 5,
      date: 'December 16, 2024',
      content: 'Absolutely outstanding! The venue was perfect and the team made everything so smooth. Highly recommended!',
      event: 'Wedding Reception',
    },
    {
      id: 2,
      author: 'Tech Corp Ltd',
      rating: 4,
      date: 'December 9, 2024',
      content: 'Great service and professional team. Would have appreciated a bit more flexibility on pricing.',
      event: 'Corporate Gala',
    },
    {
      id: 3,
      author: 'Blessing Okafor',
      rating: 5,
      date: 'November 21, 2024',
      content: 'The setup was amazing and everyone had such a great time. Thank you!',
      event: 'Birthday Party',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Average Rating</p>
          <p className="text-3xl font-bold text-foreground mb-2">4.8 ⭐</p>
          <p className="text-sm text-muted-foreground">From 156 reviews</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">5-Star Reviews</p>
          <p className="text-3xl font-bold text-yellow-500 mb-2">132</p>
          <p className="text-sm text-muted-foreground">84.6% of all reviews</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Response Rate</p>
          <p className="text-3xl font-bold text-green-500 mb-2">98%</p>
          <p className="text-sm text-muted-foreground">Within 24 hours</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Recent Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-foreground">{review.author}</p>
                  <p className="text-sm text-muted-foreground">{review.event}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-2">{review.content}</p>
              <p className="text-xs text-muted-foreground">{review.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
