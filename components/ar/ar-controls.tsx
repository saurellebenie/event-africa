'use client'

import { Card } from '@/components/ui/card'
import { Sun, Palette } from 'lucide-react'

interface ARControlsProps {
  lighting: number
  setLighting: (value: number) => void
  decorationOpacity: number
  setDecorationOpacity: (value: number) => void
}

export default function ARControls({
  lighting,
  setLighting,
  decorationOpacity,
  setDecorationOpacity,
}: ARControlsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sun size={16} className="text-primary" />
          <label className="text-sm font-medium text-foreground">
            Lighting ({lighting}%)
          </label>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={lighting}
          onChange={(e) => setLighting(parseInt(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Palette size={16} className="text-primary" />
          <label className="text-sm font-medium text-foreground">
            Decoration Intensity ({decorationOpacity}%)
          </label>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={decorationOpacity}
          onChange={(e) => setDecorationOpacity(parseInt(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  )
}
