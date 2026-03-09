'use client'

import { useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2, RefreshCw, Download, Check } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

interface SelectionState {
  eventType: string
  decorStyle: string
  colorPalette: string
}

const eventTypes = [
  { id: 'wedding', labelEn: 'Wedding', labelFr: 'Mariage' },
  { id: 'birthday', labelEn: 'Birthday', labelFr: 'Anniversaire' },
  { id: 'corporate', labelEn: 'Corporate Gala', labelFr: 'Gala Corporate' },
  { id: 'conference', labelEn: 'Conference', labelFr: 'Conference' },
]

const decorStyles = [
  { id: 'bohemian', labelEn: 'Bohemian', labelFr: 'Boheme' },
  { id: 'minimalist', labelEn: 'Minimalist Chic', labelFr: 'Minimaliste Chic' },
  { id: 'tropical', labelEn: 'Tropical Paradise', labelFr: 'Paradis Tropical' },
  { id: 'royal', labelEn: 'Royal Luxury', labelFr: 'Luxe Royal' },
]

const colorPalettes = [
  { id: 'gold', labelEn: 'Warm Gold', labelFr: 'Or Chaleureux', color: '#D4AF37' },
  { id: 'pastel', labelEn: 'Pastel Dream', labelFr: 'Reve Pastel', color: '#FFB6C1' },
  { id: 'emerald', labelEn: 'Deep Emerald', labelFr: 'Emeraude Profond', color: '#046307' },
  { id: 'white', labelEn: 'Classic White', labelFr: 'Blanc Classique', color: '#F5F5F5' },
]

export default function AIEventPreview() {
  const { locale } = useI18n()
  const [selection, setSelection] = useState<SelectionState>({
    eventType: '',
    decorStyle: '',
    colorPalette: '',
  })
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isComplete = selection.eventType && selection.decorStyle && selection.colorPalette

  const generatePreview = useCallback(() => {
    if (!isComplete) return

    setIsLoading(true)
    setError(null)

    const eventLabel = eventTypes.find(e => e.id === selection.eventType)?.[locale === 'fr' ? 'labelFr' : 'labelEn'] || selection.eventType
    const decorLabel = decorStyles.find(d => d.id === selection.decorStyle)?.[locale === 'fr' ? 'labelFr' : 'labelEn'] || selection.decorStyle
    const colorLabel = colorPalettes.find(c => c.id === selection.colorPalette)?.[locale === 'fr' ? 'labelFr' : 'labelEn'] || selection.colorPalette

    const prompt = encodeURIComponent(
      `Professional event photography, a ${decorLabel} ${eventLabel} venue, ${colorLabel} color scheme, elegant table settings, beautiful flower arrangements, ambient lighting, 8k, architectural lighting, ultra realistic`
    )

    const seed = Math.floor(Math.random() * 1000000)
    const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&nologo=true&seed=${seed}`

    // Create a new image to handle loading
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      setImageUrl(url)
      setIsLoading(false)
    }
    img.onerror = () => {
      setError(locale === 'fr' ? 'Erreur de generation. Reessayez.' : 'Generation error. Please try again.')
      setIsLoading(false)
    }
    img.src = url
  }, [selection, isComplete, locale])

  const downloadImage = useCallback(async () => {
    if (!imageUrl) return

    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `evenia-preview-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch {
      console.error('Download failed')
    }
  }, [imageUrl])

  const t = {
    title: locale === 'fr' ? 'Visualisez Votre Evenement' : 'Visualize Your Event',
    subtitle: locale === 'fr' 
      ? "Selectionnez vos preferences et laissez l'IA generer un apercu de votre evenement" 
      : 'Select your preferences and let AI generate a preview of your event',
    eventType: locale === 'fr' ? "Type d'Evenement" : 'Event Type',
    decorStyle: locale === 'fr' ? 'Style de Decoration' : 'Decor Style',
    colorPalette: locale === 'fr' ? 'Palette de Couleurs' : 'Color Palette',
    generate: locale === 'fr' ? 'Generer Apercu' : 'Generate Preview',
    regenerate: locale === 'fr' ? 'Regenerer' : 'Regenerate',
    download: locale === 'fr' ? 'Telecharger' : 'Download',
    generating: locale === 'fr' ? 'Generation en cours...' : 'Generating...',
    placeholder: locale === 'fr' 
      ? 'Selectionnez vos preferences et cliquez sur "Generer Apercu" pour voir votre evenement' 
      : 'Select your preferences and click "Generate Preview" to see your event',
    poweredBy: locale === 'fr' ? 'Propulse par IA' : 'Powered by AI',
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">{t.poweredBy}</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">{t.title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{t.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Configuration */}
        <div className="space-y-6">
          {/* Event Type */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">{t.eventType}</h3>
            <div className="grid grid-cols-2 gap-3">
              {eventTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelection(s => ({ ...s, eventType: type.id }))}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selection.eventType === type.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  {selection.eventType === type.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <span className="font-medium text-foreground">
                    {locale === 'fr' ? type.labelFr : type.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Decor Style */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">{t.decorStyle}</h3>
            <div className="grid grid-cols-2 gap-3">
              {decorStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => setSelection(s => ({ ...s, decorStyle: style.id }))}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selection.decorStyle === style.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  {selection.decorStyle === style.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <span className="font-medium text-foreground">
                    {locale === 'fr' ? style.labelFr : style.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">{t.colorPalette}</h3>
            <div className="grid grid-cols-2 gap-3">
              {colorPalettes.map(palette => (
                <button
                  key={palette.id}
                  onClick={() => setSelection(s => ({ ...s, colorPalette: palette.id }))}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                    selection.colorPalette === palette.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  {selection.colorPalette === palette.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className="w-8 h-8 rounded-lg border border-border shadow-inner"
                    style={{ backgroundColor: palette.color }}
                  />
                  <span className="font-medium text-foreground">
                    {locale === 'fr' ? palette.labelFr : palette.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generatePreview}
            disabled={!isComplete || isLoading}
            className="w-full h-12 text-base font-semibold gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t.generating}
              </>
            ) : imageUrl ? (
              <>
                <RefreshCw className="w-5 h-5" />
                {t.regenerate}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {t.generate}
              </>
            )}
          </Button>
        </div>

        {/* Right Column: AI Preview */}
        <div className="lg:sticky lg:top-24">
          <Card className="relative overflow-hidden rounded-2xl border-0 shadow-2xl bg-gradient-to-br from-card via-card to-muted/30 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="aspect-square relative">
              {isLoading ? (
                /* Skeleton Loader */
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50 animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div className="h-4 w-48 bg-primary/20 rounded mb-2" />
                  <div className="h-3 w-32 bg-muted-foreground/20 rounded" />
                </div>
              ) : imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="AI Generated Event Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={downloadImage}
                      className="gap-2 shadow-lg backdrop-blur-sm bg-background/80"
                    >
                      <Download className="w-4 h-4" />
                      {t.download}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-muted/30 to-muted/50">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-primary/60" />
                  </div>
                  <p className="text-muted-foreground max-w-xs">{t.placeholder}</p>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-destructive/10">
                  <p className="text-destructive font-medium">{error}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
