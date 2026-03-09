'use client'

import { Card } from '@/components/ui/card'

interface DecorationPresetsProps {
  selectedPreset: string
  onSelectPreset: (preset: string) => void
}

export default function DecorationPresets({
  selectedPreset,
  onSelectPreset,
}: DecorationPresetsProps) {
  const presets = [
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Gold & pink luxury',
      icon: '👑',
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Blue & geometric',
      icon: '⚡',
    },
    {
      id: 'tropical',
      name: 'Tropical',
      description: 'Green & flowers',
      icon: '🌺',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean & simple',
      icon: '◾',
    },
  ]

  return (
    <Card className="p-6">
      <h3 className="font-bold text-foreground mb-4">Decoration Presets</h3>
      <div className="space-y-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset.id)}
            className={`w-full p-3 rounded-lg text-left transition-all ${
              selectedPreset === preset.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{preset.icon}</span>
              <div>
                <p className="font-medium">{preset.name}</p>
                <p className="text-xs opacity-70">{preset.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  )
}
