'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ChatInterface from '@/components/ai/chat-interface'
import EventPlanner from '@/components/ai/event-planner'

export default function AIAssistantPage() {
  const [view, setView] = useState<'chat' | 'planner'>('chat')

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">EvenIA - Your Event AI Assistant</h1>
          <p className="text-muted-foreground">
            Get personalized recommendations, budget planning, and expert advice for your perfect event
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
            Chat with EvenIA
          </button>
          <button
            onClick={() => setView('planner')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              view === 'planner'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Event Planner
          </button>
        </div>

        {view === 'chat' ? <ChatInterface /> : <EventPlanner />}
      </div>
    </div>
  )
}
