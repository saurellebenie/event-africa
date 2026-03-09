'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export default function CardForm() {
  const [cardType, setCardType] = useState('visa')

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Card Holder Name
        </label>
        <Input
          type="text"
          placeholder="John Doe"
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Card Number
        </label>
        <Input
          type="text"
          placeholder="4532 1234 5678 9010"
          maxLength={19}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Expiry Date
          </label>
          <Input
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            CVV
          </label>
          <Input
            type="text"
            placeholder="123"
            maxLength={3}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <p className="text-sm text-green-600">
          Your card information is encrypted and secured by industry-leading technology.
        </p>
      </div>
    </div>
  )
}
