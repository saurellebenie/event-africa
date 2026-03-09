'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import HeroSection from '@/components/hero-section'
import ServicePortfolio from '@/components/service-portfolio'
import FeaturesSection from '@/components/features-section'
import AuthModal from '@/components/auth-modal'
import { useI18n } from '@/lib/i18n'

export default function Home() {
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null)
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation onAuthClick={setAuthModal} />
      <div className="pt-16">
        <HeroSection onGetStarted={() => setAuthModal('signup')} />
        <ServicePortfolio />
        <FeaturesSection />
      </div>

      <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">EvenIA</h3>
              <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t('footer.platform')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/marketplace" className="hover:text-foreground">{t('footer.browseEvents')}</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">{t('footer.pricing')}</Link></li>
                <li><Link href="#" className="hover:text-foreground">{t('footer.blog')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t('footer.providers')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/become-provider" className="hover:text-foreground">{t('footer.becomeProvider')}</Link></li>
                <li><Link href="#" className="hover:text-foreground">{t('footer.resources')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">{t('footer.helpCenter')}</Link></li>
                <li><Link href="#" className="hover:text-foreground">{t('footer.contact')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 EvenIA. {t('footer.rights')}
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">{t('footer.privacy')}</Link>
              <Link href="#" className="hover:text-foreground">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal mode={authModal} onClose={() => setAuthModal(null)} />
    </div>
  )
}
