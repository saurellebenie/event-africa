'use client'

import { Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Suggestion {
    label: string
    icon: string
    reason: string
}

const SUGGESTIONS: Record<string, Suggestion[]> = {
    dj: [
        { label: 'Photography', icon: '📸', reason: 'Capture the energy of your event' },
        { label: 'Event Planner', icon: '📋', reason: 'Coordinate all your vendors seamlessly' },
    ],
    catering: [
        { label: 'Event Planner', icon: '📋', reason: 'Help you find all vendors in one place' },
        { label: 'Venue', icon: '🏟️', reason: 'Find the perfect space for your meal' },
    ],
    venue: [
        { label: 'DJ & Music', icon: '🎵', reason: 'Fill your venue with great music' },
        { label: 'Catering', icon: '🍽️', reason: 'Complete your event with great food' },
        { label: 'Photography', icon: '📸', reason: 'Document your beautiful venue setup' },
    ],
    photography: [
        { label: 'DJ & Music', icon: '🎵', reason: 'Create the perfect atmosphere to photograph' },
        { label: 'Event Planner', icon: '📋', reason: 'Coordinate the perfect shot schedule' },
    ],
    planner: [
        { label: 'Photography', icon: '📸', reason: 'Document every moment of your planned event' },
        { label: 'Catering', icon: '🍽️', reason: 'We can help you find the best caterers' },
    ],
}

interface ComplementarySuggestionsProps {
    serviceType: string
}

export default function ComplementarySuggestions({ serviceType }: ComplementarySuggestionsProps) {
    const [dismissed, setDismissed] = useState(false)
    const suggestions = SUGGESTIONS[serviceType] || []

    if (dismissed || suggestions.length === 0) return null

    return (
        <div className="relative mb-6 p-4 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <button
                onClick={() => setDismissed(true)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss suggestions"
            >
                <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground mb-1">
                        Complete your event experience
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                        Clients who book this service also add:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((s) => (
                            <div
                                key={s.label}
                                className={cn(
                                    'group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
                                    'bg-background border border-border hover:border-primary hover:bg-primary/5',
                                    'transition-all duration-200 cursor-pointer'
                                )}
                                title={s.reason}
                            >
                                <span>{s.icon}</span>
                                <span className="text-foreground">{s.label}</span>
                                <Badge
                                    variant="secondary"
                                    className="ml-1 text-[10px] px-1.5 py-0 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    Add
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
