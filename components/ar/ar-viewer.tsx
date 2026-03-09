'use client'

import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'

interface ARViewerProps {
  preset: string
  lighting: number
  opacity: number
}

export default function ARViewer({ preset, lighting, opacity }: ARViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw venue floor
    ctx.fillStyle = '#e8e8e8'
    ctx.fillRect(50, 100, canvas.width - 100, canvas.height - 200)

    // Draw walls
    ctx.strokeStyle = '#999'
    ctx.lineWidth = 3
    ctx.strokeRect(50, 100, canvas.width - 100, canvas.height - 200)

    // Apply lighting effect
    const lightingValue = lighting / 100
    ctx.globalAlpha = 0.3 + lightingValue * 0.4

    // Draw preset decorations
    if (preset === 'elegant') {
      drawElegantDecor(ctx, canvas.width, canvas.height, opacity)
    } else if (preset === 'modern') {
      drawModernDecor(ctx, canvas.width, canvas.height, opacity)
    } else if (preset === 'tropical') {
      drawTropicalDecor(ctx, canvas.width, canvas.height, opacity)
    } else if (preset === 'minimal') {
      drawMinimalDecor(ctx, canvas.width, canvas.height, opacity)
    }

    ctx.globalAlpha = 1
  }, [preset, lighting, opacity])

  const drawElegantDecor = (ctx: CanvasRenderingContext2D, w: number, h: number, opacity: number) => {
    ctx.globalAlpha = opacity / 100
    ctx.fillStyle = '#d4af37'

    // Draw decorative elements
    for (let i = 0; i < 8; i++) {
      const x = 100 + (i * (w - 200)) / 8
      ctx.fillRect(x - 15, 120, 30, 80)
      ctx.beginPath()
      ctx.arc(x, 120, 15, 0, Math.PI * 2)
      ctx.fill()
    }

    // Ceiling decorations
    ctx.fillStyle = '#ff69b4'
    for (let i = 0; i < 12; i++) {
      const x = 80 + (i * (w - 160)) / 12
      ctx.beginPath()
      ctx.arc(x, 110, 8, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawModernDecor = (ctx: CanvasRenderingContext2D, w: number, h: number, opacity: number) => {
    ctx.globalAlpha = opacity / 100
    ctx.fillStyle = '#00bfff'

    // Geometric shapes
    for (let i = 0; i < 6; i++) {
      const x = 150 + i * (w - 300) / 6
      ctx.fillRect(x - 20, 150 + (i % 2) * 100, 40, 40)
    }

    // LED strips
    ctx.strokeStyle = '#00ff00'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(60, 120)
    ctx.lineTo(w - 60, 120)
    ctx.stroke()
  }

  const drawTropicalDecor = (ctx: CanvasRenderingContext2D, w: number, h: number, opacity: number) => {
    ctx.globalAlpha = opacity / 100

    // Palm trees
    ctx.fillStyle = '#228b22'
    for (let i = 0; i < 3; i++) {
      const x = 150 + i * (w - 300) / 2
      ctx.fillRect(x - 8, 200, 16, 150)
      // Leaves
      ctx.beginPath()
      ctx.arc(x, 200, 40, 0, Math.PI * 2)
      ctx.fill()
    }

    // Flowers
    ctx.fillStyle = '#ff1493'
    for (let i = 0; i < 12; i++) {
      const x = 100 + Math.random() * (w - 200)
      const y = 150 + Math.random() * 150
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawMinimalDecor = (ctx: CanvasRenderingContext2D, w: number, h: number, opacity: number) => {
    ctx.globalAlpha = opacity / 100
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2

    // Minimalist lines
    ctx.beginPath()
    ctx.moveTo(100, h / 2)
    ctx.lineTo(w - 100, h / 2)
    ctx.stroke()

    // Simple geometric elements
    ctx.fillStyle = '#cccccc'
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(150 + i * 150, 180, 60, 60)
    }
  }

  return (
    <Card className="overflow-hidden bg-muted">
      <div className="relative aspect-video">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white rounded text-sm">
          AR Preview
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-sm font-medium transition-colors">
            Start AR
          </button>
        </div>
      </div>
    </Card>
  )
}
