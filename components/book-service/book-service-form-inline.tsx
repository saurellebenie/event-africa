'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Wand2, Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

import StepIndicator from './step-indicator'
import ComplementarySuggestions from './complementary-suggestions'
import Step1General, { type GeneralFormData, type ServiceType } from './step1-general'
// ... (imports)
import AIEventPreview from '@/components/ai-event-preview'
import Step2DJ, { type DJFormData } from './step2-dj'
import Step2Catering, { type CateringFormData } from './step2-catering'
import Step2Venue, { type VenueFormData } from './step2-venue'
import Step2Photography, { type PhotographyFormData } from './step2-photography'
import Step2Planner, { type PlannerFormData } from './step2-planner'
import Step2Decoration, { type DecorationFormData } from './step2-decoration'
import Step3Review from './step3-review'

// Map provider category strings → ServiceType keys
const CATEGORY_MAP: Record<string, ServiceType> = {
    'dj service': 'dj',
    'dj': 'dj',
    'music': 'dj',
    'catering': 'catering',
    'food': 'catering',
    'venue': 'venue',
    'hall': 'venue',
    'photography': 'photography',
    'photo': 'photography',
    'videography': 'photography',
    'event planner': 'planner',
    'planner': 'planner',
    'planning': 'planner',
    'decoration': 'decoration',
    'decor': 'decoration',
}

interface BookServiceFormInlineProps {
    /** Provider category string, e.g. "venue", "DJ Service" */
    providerCategory?: string
}

const defaultGeneral = (serviceType: ServiceType): GeneralFormData => ({
    serviceType,
    eventType: '',
    customEventType: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    guestCount: '',
    city: '',
    address: '',
    budget: '',
    description: '',
})

const defaultDJ: DJFormData = { genres: [], mcRequired: null, soundEquipment: null, specialEntertainment: '', customPlaylist: null, atmosphere: '' }
const defaultCatering: CateringFormData = { cuisineType: '', serviceStyle: '', courses: '', allergies: '', drinksIncluded: null, staffNeeded: null, tableware: null }
const defaultVenue: VenueFormData = { minCapacity: '', setting: '', parkingNeeded: null, airConditioning: null, soundSystem: null, decorationIncluded: null, accessibilityRequired: null }
const defaultPhotography: PhotographyFormData = { coverageDuration: '', coverageType: '', printedAlbum: null, droneCoverage: null, style: '' }
const defaultPlanner: PlannerFormData = { supportLevel: '', eventTheme: '', totalBudget: '', vendorHelp: null, inspirationFile: null }
const defaultDecoration: DecorationFormData = { style: '', theme: '', colorPalette: '', setting: '', items: { stage: false, table: false, floral: false, balloon: false, backdrop: false, lighting: false, entrance: false, photoBooth: false, signage: false }, services: { setupDismantle: false }, venueAccessTime: '', budget: '', inspirationFile: null }

const SERVICE_TITLES: Record<string, string> = {
    dj: 'DJ & Music Details',
    catering: 'Catering Details',
    venue: 'Venue Requirements',
    photography: 'Photography Details',
    planner: 'Event Planner Details',
    decoration: 'Decoration Details',
}

export default function BookServiceFormInline({ providerCategory }: BookServiceFormInlineProps) {
    const { t, locale } = useI18n()
    const preselected = providerCategory
        ? (CATEGORY_MAP[providerCategory.toLowerCase()] ?? '')
        : ''

    console.log('-================================', providerCategory)

    const [step, setStep] = useState(1)
    const [general, setGeneral] = useState<GeneralFormData>(defaultGeneral(preselected as ServiceType))
    const [djData, setDjData] = useState<DJFormData>(defaultDJ)
    const [cateringData, setCateringData] = useState<CateringFormData>(defaultCatering)
    const [venueData, setVenueData] = useState<VenueFormData>(defaultVenue)
    const [photoData, setPhotoData] = useState<PhotographyFormData>(defaultPhotography)
    const [plannerData, setPlannerData] = useState<PlannerFormData>(defaultPlanner)
    const [decorationData, setDecorationData] = useState<DecorationFormData>(defaultDecoration)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [showAIPreview, setShowAIPreview] = useState(false)

    const getServiceData = () => {
        switch (general.serviceType) {
            case 'dj': return djData
            case 'catering': return cateringData
            case 'venue': return venueData
            case 'photography': return photoData
            case 'planner': return plannerData
            case 'decoration': return decorationData
            default: return djData
        }
    }

    const canProceedStep1 = general.serviceType && general.eventType && general.eventDate && general.guestCount && general.city

    const handleSubmit = async () => {
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 1800))
        setIsSubmitting(false)
        setSubmitted(true)
    }

    const stepTitle = step === 1
        ? 'General Event Information'
        : step === 2
            ? (SERVICE_TITLES[general.serviceType] || 'Service Details')
            : 'Review Your Request'

    const stepSubtitle = step === 1
        ? 'Tell us about your event'
        : step === 2
            ? 'Provide specific requirements for your chosen service'
            : 'Confirm everything looks good before submitting'

    return (
        <div className="w-full max-w-2xl">
            <StepIndicator currentStep={step} />

            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-foreground">{stepTitle}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{stepSubtitle}</p>
                </div>

                {/* Bouton Magique IA */}
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAIPreview(!showAIPreview)}
                    className={cn(
                        "gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all",
                        showAIPreview && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                >
                    <Sparkles className={cn("w-4 h-4", showAIPreview ? "fill-current" : "text-primary")} />
                    <span className="hidden sm:inline">AI Vision</span>
                </Button>
            </div>

            {/* Panneau AI Preview Conditionnel */}
            {showAIPreview && (
                <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    <AIEventPreview />
                </div>
            )}

            <div className="min-h-[500px]">
                {step === 1 && (
                    <Step1General
                        data={general}
                        onChange={(patch) => setGeneral((prev) => ({ ...prev, ...patch }))}
                    />
                )}

                {step === 2 && (
                    <>
                        <ComplementarySuggestions serviceType={general.serviceType} />
                        {general.serviceType === 'dj' && (
                            <Step2DJ data={djData} onChange={(p) => setDjData((prev) => ({ ...prev, ...p }))} />
                        )}
                        {general.serviceType === 'catering' && (
                            <Step2Catering data={cateringData} onChange={(p) => setCateringData((prev) => ({ ...prev, ...p }))} />
                        )}
                        {general.serviceType === 'venue' && (
                            <Step2Venue data={venueData} onChange={(p) => setVenueData((prev) => ({ ...prev, ...p }))} />
                        )}
                        {general.serviceType === 'photography' && (
                            <Step2Photography data={photoData} onChange={(p) => setPhotoData((prev) => ({ ...prev, ...p }))} />
                        )}
                        {general.serviceType === 'planner' && (
                            <Step2Planner data={plannerData} onChange={(p) => setPlannerData((prev) => ({ ...prev, ...p }))} />
                        )}
                        {general.serviceType === 'decoration' && (
                            <Step2Decoration data={decorationData} onChange={(p) => setDecorationData((prev) => ({ ...prev, ...p }))} />
                        )}
                    </>
                )}

                {step === 3 && (
                    <Step3Review
                        general={general}
                        serviceData={getServiceData()}
                        onEditGeneral={() => setStep(1)}
                        onEditService={() => setStep(2)}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        submitted={submitted}
                    />
                )}
            </div>

            {step < 3 && !submitted && (
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setStep((s) => s - 1)}
                        className={cn('gap-2', step === 1 && 'invisible')}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setStep((s) => s + 1)}
                        disabled={step === 1 && !canProceedStep1}
                        className={cn(
                            'gap-2 px-8',
                            'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90',
                            'shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all'
                        )}
                    >
                        {step === 2 ? 'Review Request' : 'Next Step'}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    )
}
