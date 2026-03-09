'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Music, UtensilsCrossed, Building2, Camera, ClipboardList, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ServiceType = 'dj' | 'catering' | 'venue' | 'photography' | 'planner' | 'decoration' | ''

export interface GeneralFormData {
    serviceType: ServiceType
    eventType: string
    customEventType: string
    eventDate: string
    startTime: string
    endTime: string
    guestCount: string
    city: string
    address: string
    budget: string
    description: string
}

interface Step1GeneralProps {
    data: GeneralFormData
    onChange: (data: Partial<GeneralFormData>) => void
}

const SERVICE_OPTIONS = [
    { value: 'dj', label: 'DJ & Music', icon: Music, color: 'from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800', iconColor: 'text-purple-500' },
    { value: 'catering', label: 'Catering', icon: UtensilsCrossed, color: 'from-orange-500/10 to-amber-500/10 border-orange-200 dark:border-orange-800', iconColor: 'text-orange-500' },
    { value: 'venue', label: 'Venue', icon: Building2, color: 'from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800', iconColor: 'text-blue-500' },
    { value: 'photography', label: 'Photography', icon: Camera, color: 'from-green-500/10 to-emerald-500/10 border-green-200 dark:border-green-800', iconColor: 'text-green-500' },
    { value: 'planner', label: 'Event Planner', icon: ClipboardList, color: 'from-primary/10 to-accent/10 border-primary/20', iconColor: 'text-primary' },
    { value: 'decoration', label: 'Decoration', icon: Palette, color: 'from-pink-500/10 to-rose-500/10 border-pink-200 dark:border-pink-800', iconColor: 'text-pink-500' },
]

const EVENT_TYPES = [
    'Wedding', 'Birthday Party', 'Conference', 'Private Party',
    'Corporate Event', 'Anniversary', 'Graduation', 'Cultural Celebration', 'Other'
]

const inputClass = 'w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all'

export default function Step1General({ data, onChange }: Step1GeneralProps) {
    return (
        <div className="space-y-8">
            {/* Service Type Selector */}
            <div>
                <Label className="text-base font-semibold text-foreground mb-4 block">
                    Which service are you looking for? <span className="text-destructive">*</span>
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {SERVICE_OPTIONS.map((opt) => {
                        const Icon = opt.icon
                        const isSelected = data.serviceType === opt.value
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => onChange({ serviceType: opt.value as ServiceType })}
                                className={cn(
                                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-center',
                                    'hover:scale-105 hover:shadow-md',
                                    isSelected
                                        ? `bg-gradient-to-br ${opt.color} border-primary shadow-md scale-105`
                                        : 'border-border bg-card hover:border-muted-foreground/30'
                                )}
                            >
                                <Icon className={cn('w-6 h-6', isSelected ? opt.iconColor : 'text-muted-foreground')} />
                                <span className={cn('text-xs font-medium leading-tight', isSelected ? 'text-foreground' : 'text-muted-foreground')}>
                                    {opt.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Event Type */}
            <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground mb-2 block">
                    Event Type <span className="text-destructive">*</span>
                </Label>
                <Select value={data.eventType} onValueChange={(v) => onChange({ eventType: v, customEventType: '' })}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                        {EVENT_TYPES.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {data.eventType === 'other' && (
                    <Input
                        placeholder="Please describe your event type..."
                        value={data.customEventType}
                        onChange={(e) => onChange({ customEventType: e.target.value })}
                        autoFocus
                        className="transition-all duration-200"
                    />
                )}
            </div>

            {/* Date & Time */}
            <div className="grid sm:grid-cols-3 gap-4">
                <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                        Event Date <span className="text-destructive">*</span>
                    </Label>
                    <input
                        type="date"
                        value={data.eventDate}
                        onChange={(e) => onChange({ eventDate: e.target.value })}
                        className={inputClass}
                        required
                    />
                </div>
                <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Start Time</Label>
                    <input
                        type="time"
                        value={data.startTime}
                        onChange={(e) => onChange({ startTime: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">End Time</Label>
                    <input
                        type="time"
                        value={data.endTime}
                        onChange={(e) => onChange({ endTime: e.target.value })}
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Guests & Budget */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                        Number of Guests <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        type="number"
                        placeholder="e.g., 150"
                        value={data.guestCount}
                        onChange={(e) => onChange({ guestCount: e.target.value })}
                        min="1"
                        required
                    />
                </div>
                <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                        Estimated Budget (Optional)
                    </Label>
                    <Input
                        type="text"
                        placeholder="e.g., ₦500,000"
                        value={data.budget}
                        onChange={(e) => onChange({ budget: e.target.value })}
                    />
                </div>
            </div>

            {/* Location */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                        City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        placeholder="e.g., Lagos, Accra, Nairobi"
                        value={data.city}
                        onChange={(e) => onChange({ city: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                        Venue Address (Optional)
                    </Label>
                    <Input
                        placeholder="Street address or area"
                        value={data.address}
                        onChange={(e) => onChange({ address: e.target.value })}
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">
                    Event Description
                </Label>
                <Textarea
                    placeholder="Tell us about your vision for the event, any special requirements, or anything else we should know..."
                    value={data.description}
                    onChange={(e) => onChange({ description: e.target.value })}
                    rows={4}
                    className="resize-none"
                />
            </div>
        </div>
    )
}
