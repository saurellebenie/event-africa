'use client'

import { useI18n } from '@/lib/i18n'

export default function FeaturesSection() {
  const { t } = useI18n()

  const features = [
    { titleKey: 'features.smartMatching.title' as const, descKey: 'features.smartMatching.desc' as const, icon: '\u{1F3AF}' },
    { titleKey: 'features.verified.title' as const, descKey: 'features.verified.desc' as const, icon: '\u2713' },
    { titleKey: 'features.budget.title' as const, descKey: 'features.budget.desc' as const, icon: '\u{1F4B0}' },
    { titleKey: 'features.payments.title' as const, descKey: 'features.payments.desc' as const, icon: '\u{1F512}' },
    { titleKey: 'features.contracts.title' as const, descKey: 'features.contracts.desc' as const, icon: '\u{1F4CB}' },
    { titleKey: 'features.ar.title' as const, descKey: 'features.ar.desc' as const, icon: '\u{1F52E}' },
  ]

  return (
    <section className="py-20 px-4 bg-muted/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {t('features.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{t(feature.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
