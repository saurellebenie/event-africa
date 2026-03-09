'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import MobileMoneyForm from './forms/mobile-money-form'
import CardForm from './forms/card-form'
import CashForm from './forms/cash-form'

interface PaymentFormProps {
  paymentMethod: 'mobile-money' | 'card' | 'cash'
  onBack: () => void
  onSubmit: () => void
  total: number
}

export default function PaymentForm({
  paymentMethod,
  onBack,
  onSubmit,
  total,
}: PaymentFormProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      onSubmit()
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Payment Details</h2>

        {paymentMethod === 'mobile-money' && <MobileMoneyForm />}
        {paymentMethod === 'card' && <CardForm />}
        {paymentMethod === 'cash' && <CashForm />}
      </Card>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={loading}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1"
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ${total.toLocaleString()} KES`}
        </Button>
      </div>
    </div>
  )
}
