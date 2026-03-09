'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export default function MobileMoneyForm() {
  const [provider, setProvider] = useState('mpesa')

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Select Mobile Money Provider
        </label>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="mpesa">M-Pesa (Kenya)</option>
          <option value="airtel">Airtel Money</option>
          <option value="mtn">MTN Money</option>
          <option value="vodafone">Vodafone Cash</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Phone Number
        </label>
        <Input
          type="tel"
          placeholder="+254 700 123 456"
          className="w-full"
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm text-blue-600">
          You'll receive a prompt on your phone to enter your PIN. Your transaction is secure and encrypted.
        </p>
      </div>
    </div>
  )
}
