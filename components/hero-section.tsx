'use client'

import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'

interface HeroSectionProps {
  onGetStarted: () => void
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
          <p className="text-sm font-medium text-accent">{t('hero.badge')}</p>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
          {t('hero.titleStart')}
          <span className="text-primary">{t('hero.titleHighlight')}</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-base" onClick={onGetStarted}>
            {t('hero.cta')}
          </Button>
          <Button size="lg" variant="outline" className="text-base">
            {t('hero.ctaSecondary')}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {[
            { number: '500+', label: t('hero.stat.providers') },
            { number: '10K+', label: t('hero.stat.events') },
            { number: '50K+', label: t('hero.stat.users') },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-lg border border-border bg-card">
              <div className="text-2xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
