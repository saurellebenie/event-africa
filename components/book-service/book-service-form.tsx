'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Sparkles, Wand2, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

// Composants du formulaire original
import StepIndicator from './step-indicator'
import ComplementarySuggestions from './complementary-suggestions'
import Step1General, { type GeneralFormData, type ServiceType } from './step1-general'
import Step2DJ, { type DJFormData } from './step2-dj'
import Step2Catering, { type CateringFormData } from './step2-catering'
import Step2Venue, { type VenueFormData } from './step2-venue'
import Step2Photography, { type PhotographyFormData } from './step2-photography'
import Step2Planner, { type PlannerFormData } from './step2-planner'
import Step2Decoration, { type DecorationFormData } from './step2-decoration'
import Step3Review from './step3-review'

// Nouveau composant IA (à importer depuis votre dossier components)
import AIEventPreview from '@/components/ai-event-preview'

const defaultGeneral: GeneralFormData = {
    serviceType: '',
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
}

const defaultDJ: DJFormData = {
    genres: [],
    mcRequired: null,
    soundEquipment: null,
    specialEntertainment: '',
    customPlaylist: null,
    atmosphere: '',
}

const defaultCatering: CateringFormData = {
    cuisineType: '',
    serviceStyle: '',
    courses: '',
    allergies: '',
    drinksIncluded: null,
    staffNeeded: null,
    tableware: null,
}

const defaultVenue: VenueFormData = {
    minCapacity: '',
    setting: '',
    parkingNeeded: null,
    airConditioning: null,
    soundSystem: null,
    decorationIncluded: null,
    accessibilityRequired: null,
}

const defaultPhotography: PhotographyFormData = {
    coverageDuration: '',
    coverageType: '',
    printedAlbum: null,
    droneCoverage: null,
    style: '',
}

const defaultPlanner: PlannerFormData = {
    supportLevel: '',
    eventTheme: '',
    totalBudget: '',
    vendorHelp: null,
    inspirationFile: null,
}

const defaultDecoration: DecorationFormData = {
    style: '',
    theme: '',
    colorPalette: '',
    setting: '',
    items: {
        stage: false,
        table: false,
        floral: false,
        balloon: false,
        backdrop: false,
        lighting: false,
        entrance: false,
        photoBooth: false,
        signage: false,
    },
    services: {
        setupDismantle: false,
    },
    venueAccessTime: '',
    budget: '',
    inspirationFile: null,
}

const SERVICE_TITLES: Record<string, string> = {
    dj: 'DJ & Music Details',
    catering: 'Catering Details',
    venue: 'Venue Requirements',
    photography: 'Photography Details',
    planner: 'Event Planner Details',
    decoration: 'Decoration Details',
}

export default function BookServiceForm() {
    const { t, locale } = useI18n()
    const searchParams = useSearchParams()
    const [step, setStep] = useState(1)
    const [general, setGeneral] = useState<GeneralFormData>(defaultGeneral)


    console.log('========================>', 'helllo')

    // États pour les données spécifiques
    const [djData, setDjData] = useState<DJFormData>(defaultDJ)
    const [cateringData, setCateringData] = useState<CateringFormData>(defaultCatering)
    const [venueData, setVenueData] = useState<VenueFormData>(defaultVenue)
    const [photoData, setPhotoData] = useState<PhotographyFormData>(defaultPhotography)
    const [plannerData, setPlannerData] = useState<PlannerFormData>(defaultPlanner)
    const [decorationData, setDecorationData] = useState<DecorationFormData>(defaultDecoration)

    // États pour la soumission et l'IA
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [showAIPreview, setShowAIPreview] = useState(false)

    // Pre-select service type from URL
    useEffect(() => {
        const service = searchParams.get('service')
        if (service) {
            const map: Record<string, ServiceType> = {
                'dj service': 'dj', 'dj': 'dj', 'catering': 'catering',
                'venue': 'venue', 'photography': 'photography',
                'event planner': 'planner', 'planner': 'planner',
                'decoration': 'decoration', 'decor': 'decoration',
            }
            const mapped = map[service.toLowerCase()]
            if (mapped) setGeneral((prev) => ({ ...prev, serviceType: mapped }))
        }
    }, [searchParams])

    const getServiceData = () => {
        switch (general.serviceType) {
            case 'dj': return djData
            case 'catering': return cateringData
            case 'venue': return venueData
            case 'photography': return photoData
            case 'planner': return plannerData
            case 'decoration': return decorationData
            default: return {}
        }
    }

    const canProceedStep1 = general.serviceType && general.eventType && general.eventDate && general.guestCount && general.city

    const handleNext = () => { if (step < 3) setStep((s) => s + 1) }
    const handleBack = () => { if (step > 1) setStep((s) => s - 1) }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 1800))
        setIsSubmitting(false)
        setSubmitted(true)
    }

    return (
        <div className="w-full max-w-2xl mx-auto relative">
            <StepIndicator currentStep={step} />

            {/* Header avec bouton IA flottant */}
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-foreground">
                        {step === 1 ? 'General Event Information' : step === 2 ? 'Service Details' : 'Review Your Request'}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {step === 1 ? 'Tell us about your event' : 'Provide specific requirements'}
                    </p>
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

            {/* Step content */}
            <div className="min-h-[400px]">
                {step === 1 && (
                    <Step1General
                        data={general}
                        onChange={(patch) => setGeneral((prev) => ({ ...prev, ...patch }))}
                    />
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <ComplementarySuggestions serviceType={general.serviceType} />

                        {/* Render dynamique des formulaires spécifiques */}
                        {general.serviceType === 'dj' && <Step2DJ data={djData} onChange={(p) => setDjData(v => ({ ...v, ...p }))} />}
                        {general.serviceType === 'catering' && <Step2Catering data={cateringData} onChange={(p) => setCateringData(v => ({ ...v, ...p }))} />}
                        {general.serviceType === 'venue' && <Step2Venue data={venueData} onChange={(p) => setVenueData(v => ({ ...v, ...p }))} />}
                        {general.serviceType === 'photography' && <Step2Photography data={photoData} onChange={(p) => setPhotoData(v => ({ ...v, ...p }))} />}
                        {general.serviceType === 'planner' && <Step2Planner data={plannerData} onChange={(p) => setPlannerData(v => ({ ...v, ...p }))} />}
                        {general.serviceType === 'decoration' && <Step2Decoration data={decorationData} onChange={(p) => setDecorationData(v => ({ ...v, ...p }))} />}
                    </div>
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

            {/* Navigation */}
            {step < 3 && !submitted && (
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleBack}
                        disabled={step === 1}
                        className={cn('gap-2', step === 1 && 'invisible')}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>

                    <Button
                        type="button"
                        onClick={handleNext}
                        disabled={step === 1 && !canProceedStep1}
                        className="gap-2 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-md transition-all"
                    >
                        {step === 2 ? 'Review Request' : 'Next Step'}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    )
}