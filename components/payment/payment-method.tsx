'use client'

import { Card } from '@/components/ui/card'

interface PaymentMethodProps {
  method: {
    id: string
    name: string
    description: string
    icon: string
    providers: string[]
  }
  selected: boolean
  onSelect: () => void
}

export default function PaymentMethod({ method, selected, onSelect }: PaymentMethodProps) {
  return (
    <Card
      onClick={onSelect}
      className={`p-6 cursor-pointer transition-all ${
        selected
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{method.icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{method.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
          <div className="flex flex-wrap gap-2">
            {method.providers.map((provider) => (
              <span
                key={provider}
                className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground"
              >
                {provider}
              </span>
            ))}
          </div>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          selected
            ? 'border-primary bg-primary'
            : 'border-muted-foreground'
        }`}>
          {selected && <div className="w-2 h-2 bg-primary-foreground rounded-full" />}
        </div>
      </div>
    </Card>
  )
}
