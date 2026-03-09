'use client'

import { CheckCircle2, Edit2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { GeneralFormData } from './step1-general'
import type { DJFormData } from './step2-dj'
import type { CateringFormData } from './step2-catering'
import type { VenueFormData } from './step2-venue'
import type { PhotographyFormData } from './step2-photography'
import type { PlannerFormData } from './step2-planner'
import type { DecorationFormData } from './step2-decoration'

type ServiceSpecificData = DJFormData | CateringFormData | VenueFormData | PhotographyFormData | PlannerFormData | DecorationFormData

interface Step3ReviewProps {
    general: GeneralFormData
    serviceData: ServiceSpecificData
    onEditGeneral: () => void
    onEditService: () => void
    onSubmit: () => void
    isSubmitting: boolean
    submitted: boolean
}

const SERVICE_LABELS: Record<string, string> = {
    dj: '🎵 DJ & Music',
    catering: '🍽️ Catering',
    venue: '🏟️ Venue',
    photography: '📸 Photography',
    planner: '📋 Event Planner',
    decoration: '🎨 Decoration',
}

const EVENT_TYPE_LABELS: Record<string, string> = {
    wedding: 'Wedding',
    'birthday-party': 'Birthday Party',
    conference: 'Conference',
    'private-party': 'Private Party',
    'corporate-event': 'Corporate Event',
    anniversary: 'Anniversary',
    graduation: 'Graduation',
    'cultural-celebration': 'Cultural Celebration',
    other: 'Other',
}

function ReviewSection({
    title,
    onEdit,
    children,
}: {
    title: string
    onEdit: () => void
    children: React.ReactNode
}) {
    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                <button
                    type="button"
                    onClick={onEdit}
                    className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                >
                    <Edit2 className="w-3 h-3" />
                    Edit
                </button>
            </div>
            <div className="p-5 space-y-3">{children}</div>
        </div>
    )
}

function ReviewRow({ label, value }: { label: string; value: string | React.ReactNode }) {
    if (!value || value === '' || value === null || value === undefined) return null
    return (
        <div className="flex items-start justify-between gap-4">
            <span className="text-xs text-muted-foreground flex-shrink-0 w-36">{label}</span>
            <span className="text-sm text-foreground text-right font-medium">{value}</span>
        </div>
    )
}

function boolLabel(v: boolean | null | undefined) {
    if (v === null || v === undefined) return '—'
    return v ? 'Yes' : 'No'
}

function renderServiceData(serviceType: string, data: ServiceSpecificData) {
    if (serviceType === 'dj') {
        const d = data as DJFormData
        return (
            <>
                <ReviewRow label="Music Genres" value={d.genres?.join(', ') || '—'} />
                <ReviewRow label="MC Required" value={boolLabel(d.mcRequired)} />
                <ReviewRow label="Sound Equipment" value={boolLabel(d.soundEquipment)} />
                <ReviewRow label="Custom Playlist" value={boolLabel(d.customPlaylist)} />
                <ReviewRow label="Atmosphere" value={d.atmosphere || '—'} />
                {d.specialEntertainment && <ReviewRow label="Special Entertainment" value={d.specialEntertainment} />}
            </>
        )
    }
    if (serviceType === 'catering') {
        const d = data as CateringFormData
        return (
            <>
                <ReviewRow label="Cuisine Type" value={d.cuisineType || '—'} />
                <ReviewRow label="Service Style" value={d.serviceStyle || '—'} />
                <ReviewRow label="Courses" value={d.courses ? `${d.courses} courses` : '—'} />
                <ReviewRow label="Drinks Included" value={boolLabel(d.drinksIncluded)} />
                <ReviewRow label="Service Staff" value={boolLabel(d.staffNeeded)} />
                <ReviewRow label="Tableware" value={boolLabel(d.tableware)} />
                {d.allergies && <ReviewRow label="Dietary Notes" value={d.allergies} />}
            </>
        )
    }
    if (serviceType === 'venue') {
        const d = data as VenueFormData
        return (
            <>
                <ReviewRow label="Min. Capacity" value={d.minCapacity ? `${d.minCapacity} guests` : '—'} />
                <ReviewRow label="Setting" value={d.setting ? d.setting.charAt(0).toUpperCase() + d.setting.slice(1) : '—'} />
                <ReviewRow label="Parking" value={boolLabel(d.parkingNeeded)} />
                <ReviewRow label="Air Conditioning" value={boolLabel(d.airConditioning)} />
                <ReviewRow label="Sound System" value={boolLabel(d.soundSystem)} />
                <ReviewRow label="Decoration" value={boolLabel(d.decorationIncluded)} />
                <ReviewRow label="Accessibility" value={boolLabel(d.accessibilityRequired)} />
            </>
        )
    }
    if (serviceType === 'photography') {
        const d = data as PhotographyFormData
        return (
            <>
                <ReviewRow label="Coverage Duration" value={d.coverageDuration ? `${d.coverageDuration} hours` : '—'} />
                <ReviewRow label="Coverage Type" value={d.coverageType || '—'} />
                <ReviewRow label="Printed Album" value={boolLabel(d.printedAlbum)} />
                <ReviewRow label="Drone Coverage" value={boolLabel(d.droneCoverage)} />
                <ReviewRow label="Style" value={d.style || '—'} />
            </>
        )
    }
    if (serviceType === 'planner') {
        const d = data as PlannerFormData
        return (
            <>
                <ReviewRow label="Support Level" value={d.supportLevel || '—'} />
                <ReviewRow label="Event Theme" value={d.eventTheme || '—'} />
                <ReviewRow label="Total Budget" value={d.totalBudget || '—'} />
                <ReviewRow label="Vendor Help" value={boolLabel(d.vendorHelp)} />
                <ReviewRow label="Inspiration" value={d.inspirationFile ? d.inspirationFile.name : '—'} />
            </>
        )
    }
    if (serviceType === 'decoration') {
        const d = data as DecorationFormData
        const selectedItems = Object.entries(d.items)
            .filter(([_, checked]) => checked)
            .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()))
            .join(', ')

        return (
            <>
                <ReviewRow label="Style" value={d.style ? d.style.charAt(0).toUpperCase() + d.style.slice(1) : '—'} />
                <ReviewRow label="Theme" value={d.theme || '—'} />
                <ReviewRow label="Color Palette" value={d.colorPalette || '—'} />
                <ReviewRow label="Setting" value={d.setting ? d.setting.charAt(0).toUpperCase() + d.setting.slice(1) : '—'} />
                <ReviewRow label="Items Need" value={selectedItems || 'None'} />
                <ReviewRow label="Setup/Dismantle" value={boolLabel(d.services?.setupDismantle)} />
                <ReviewRow label="Venue Access" value={d.venueAccessTime || '—'} />
                <ReviewRow label="Budget" value={d.budget || '—'} />
                <ReviewRow label="Inspiration" value={d.inspirationFile ? d.inspirationFile.name : '—'} />
            </>
        )
    }
    return null
}

export default function Step3Review({
    general,
    serviceData,
    onEditGeneral,
    onEditService,
    onSubmit,
    isSubmitting,
    submitted,
}: Step3ReviewProps) {
    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Request Submitted! 🎉</h3>
                <p className="text-muted-foreground max-w-sm mb-2">
                    Your booking request has been sent successfully. Service providers will contact you within 24 hours.
                </p>
                <Badge variant="secondary" className="mt-4">
                    Reference: #EVT-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                </Badge>
            </div>
        )
    }

    return (
        <div className="space-y-5">
            {/* General Info */}
            <ReviewSection title="📋 General Event Information" onEdit={onEditGeneral}>
                <ReviewRow label="Service" value={SERVICE_LABELS[general.serviceType] || general.serviceType} />
                <ReviewRow label="Event Type" value={EVENT_TYPE_LABELS[general.eventType] || general.eventType} />
                <ReviewRow label="Date" value={general.eventDate} />
                <ReviewRow
                    label="Time"
                    value={general.startTime && general.endTime ? `${general.startTime} – ${general.endTime}` : general.startTime || '—'}
                />
                <ReviewRow label="Guests" value={general.guestCount ? `${general.guestCount} guests` : '—'} />
                <ReviewRow label="Location" value={[general.city, general.address].filter(Boolean).join(', ') || '—'} />
                <ReviewRow label="Budget" value={general.budget || '—'} />
                {general.description && <ReviewRow label="Description" value={general.description} />}
            </ReviewSection>

            {/* Service-Specific */}
            <ReviewSection
                title={`${SERVICE_LABELS[general.serviceType] || 'Service'} Details`}
                onEdit={onEditService}
            >
                {renderServiceData(general.serviceType, serviceData)}
            </ReviewSection>

            {/* Submit */}
            <div className="pt-2">
                <Button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    size="lg"
                    className={cn(
                        'w-full text-base font-semibold gap-2 transition-all duration-300',
                        'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90',
                        'shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30',
                        isSubmitting && 'opacity-70 cursor-not-allowed'
                    )}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Submit Request
                        </>
                    )}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                    By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    )
}
