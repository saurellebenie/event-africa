'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import ChatInterface from '@/components/ai/chat-interface'
import EventPlanner from '@/components/ai/event-planner'
import Navigation from '@/components/navigation'
import AuthModal from '@/components/auth-modal'
import { useI18n } from '@/lib/i18n'

export default function AIAssistantPage() {
  const [view, setView] = useState<'chat' | 'planner'>('chat')
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null)
  const { t, locale } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Navigation onAuthClick={setAuthModal} />
      <AuthModal 
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        defaultTab={authModal || 'login'}
      />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === 'fr' ? 'Retour a l\'accueil' : 'Back to home'}
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">EvenIA - {locale === 'fr' ? 'Votre Assistant IA' : 'Your Event AI Assistant'}</h1>
            <p className="text-muted-foreground">
              {locale === 'fr' 
                ? 'Obtenez des recommandations personnalisees, une planification budgetaire et des conseils d\'experts pour votre evenement parfait'
                : 'Get personalized recommendations, budget planning, and expert advice for your perfect event'}
            </p>
          </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setView('chat')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              view === 'chat'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {locale === 'fr' ? 'Discuter avec EvenIA' : 'Chat with EvenIA'}
          </button>
          <button
            onClick={() => setView('planner')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              view === 'planner'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {locale === 'fr' ? 'Planificateur d\'evenement' : 'Event Planner'}
          </button>
        </div>

        {view === 'chat' ? <ChatInterface /> : <EventPlanner />}
        </div>
      </div>
    </div>
  )
}
