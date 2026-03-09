'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import PaymentMethod from '@/components/payment/payment-method'
import OrderSummary from '@/components/payment/order-summary'
import PaymentForm from '@/components/payment/payment-form'

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState<'mobile-money' | 'card' | 'cash'>('mobile-money')
  const [step, setStep] = useState<'method' | 'details' | 'confirmation'>('method')

  const orderData = {
    provider: 'Crystal Venue Nairobi',
    service: 'Venue Rental',
    eventDate: 'December 15, 2024',
    guests: 250,
    subtotal: 250000,
    platformFee: 25000,
    total: 275000,
    currency: 'KES',
  }

  const paymentMethods = [
    {
      id: 'mobile-money',
      name: 'Mobile Money',
      description: 'Pay via M-Pesa, Airtel Money, MTN Money',
      icon: '📱',
      providers: ['M-Pesa', 'Airtel Money', 'MTN Money'],
    },
    {
      id: 'card',
      name: 'Debit/Credit Card',
      description: 'Pay with Visa, Mastercard, or local cards',
      icon: '💳',
      providers: ['Visa', 'Mastercard', 'Local Cards'],
    },
    {
      id: 'cash',
      name: 'Pay at Venue',
      description: 'Pay cash on the day of event',
      icon: '💵',
      providers: ['Direct Payment'],
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your booking with a secure payment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 'method' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground">Select Payment Method</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <PaymentMethod
                      key={method.id}
                      method={method}
                      selected={selectedPayment === method.id}
                      onSelect={() => {
                        setSelectedPayment(method.id as any)
                        setStep('details')
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 'details' && (
              <PaymentForm
                paymentMethod={selectedPayment}
                onBack={() => setStep('method')}
                onSubmit={() => setStep('confirmation')}
                total={orderData.total}
              />
            )}

            {step === 'confirmation' && (
              <div className="text-center py-12">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Payment Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">Your booking has been secured.</p>
                </div>

                <Card className="p-6 mb-6 text-left">
                  <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
                  <p className="text-xl font-mono font-bold text-foreground">#BKG-2024-98765</p>
                </Card>

                <div className="flex gap-4 justify-center">
                  <Button className="gap-2">View Booking</Button>
                  <Button variant="outline">Return to Marketplace</Button>
                </div>
              </div>
            )}
          </div>

          <OrderSummary order={orderData} />
        </div>
      </div>
    </div>
  )
}
